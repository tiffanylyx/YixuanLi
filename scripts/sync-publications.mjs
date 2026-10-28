import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workbookPath = path.resolve(
  projectRoot,
  process.env.PUBLICATIONS_WORKBOOK ?? 'publications.xlsx',
);
const outputPath = path.resolve(
  projectRoot,
  process.env.PUBLICATIONS_OUTPUT ?? path.join('src', 'data', 'publications.ts'),
);

const expectedHeaders = [
  'Order',
  'Show',
  'Title',
  'Authors (semicolon-separated)',
  'Venue',
  'Year',
  'Type',
  'Award',
  'PDF',
  'External link',
  'Video',
  'Materials',
];

function textFromCell(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function isVisible(value, rowNumber) {
  const normalized = value.toLowerCase();
  if (['yes', 'y', 'true', '1'].includes(normalized)) return true;
  if (['no', 'n', 'false', '0'].includes(normalized)) return false;
  throw new Error(`Row ${rowNumber}: Show must be Yes or No.`);
}

function optional(value) {
  const normalized = value.trim();
  return normalized || undefined;
}

function validateLink(value, label, rowNumber) {
  if (!value) return;
  if (value.startsWith('/') || /^https?:\/\//i.test(value)) return;
  throw new Error(
    `Row ${rowNumber}: ${label} must start with / for a public file or http(s):// for an external link.`,
  );
}

function requireText(value, label, rowNumber) {
  if (!value.trim()) throw new Error(`Row ${rowNumber}: ${label} is required.`);
  return value.trim();
}

function columnIndex(address) {
  const letters = address.match(/^[A-Z]+/i)?.[0].toUpperCase();
  if (!letters) throw new Error(`Invalid cell address: ${address}`);
  return [...letters].reduce((value, letter) => value * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function attributeValue(attributes, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = attributes.match(new RegExp(`(?:^|\\s)${escapedName}="([^"]*)"`));
  return match ? decodeXml(match[1]) : undefined;
}

function textNodes(xml) {
  return [...xml.matchAll(/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)]
    .map((match) => decodeXml(match[1]))
    .join('');
}

async function unzipEntry(filePath, entry, required = true) {
  try {
    const { stdout } = await execFileAsync('unzip', ['-p', filePath, entry], {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    return stdout;
  } catch (error) {
    if (!required) return '';
    throw new Error(`Could not read ${entry} from the Excel workbook.`, { cause: error });
  }
}

async function readWorksheet(filePath, sheetName) {
  const workbookXml = await unzipEntry(filePath, 'xl/workbook.xml');
  const relationshipsXml = await unzipEntry(filePath, 'xl/_rels/workbook.xml.rels');
  const sheetTag = [...workbookXml.matchAll(/<(?:\w+:)?sheet\b([^>]*)\/?\s*>/g)].find(
    (match) => attributeValue(match[1], 'name') === sheetName,
  );
  if (!sheetTag) throw new Error(`The workbook must contain a sheet named ${sheetName}.`);
  const relationshipId =
    attributeValue(sheetTag[1], 'r:id') ?? attributeValue(sheetTag[1], 'id');
  const relationshipTag = [
    ...relationshipsXml.matchAll(/<(?:\w+:)?Relationship\b([^>]*)\/?\s*>/g),
  ].find((match) => attributeValue(match[1], 'Id') === relationshipId);
  if (!relationshipTag) throw new Error(`Could not locate the ${sheetName} worksheet data.`);
  const target = attributeValue(relationshipTag[1], 'Target');
  if (!target) throw new Error(`Could not locate the ${sheetName} worksheet path.`);
  const targetPath = target.replace(/^\/+/, '');
  const worksheetPath = path.posix.normalize(
    targetPath.startsWith('xl/') ? targetPath : `xl/${targetPath}`,
  );
  const worksheetXml = await unzipEntry(filePath, worksheetPath);

  const sharedStringsXml = await unzipEntry(filePath, 'xl/sharedStrings.xml', false);
  const sharedStrings = [
    ...sharedStringsXml.matchAll(/<(?:\w+:)?si\b[^>]*>([\s\S]*?)<\/(?:\w+:)?si>/g),
  ].map((match) => textNodes(match[1]));

  const outputRows = [];
  for (const rowMatch of worksheetXml.matchAll(
    /<(?:\w+:)?row\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?row>/g,
  )) {
    const rowIndex = Number(attributeValue(rowMatch[1], 'r')) - 1;
    if (!Number.isInteger(rowIndex) || rowIndex < 0) continue;
    const outputRow = outputRows[rowIndex] ?? [];
    for (const cellMatch of rowMatch[2].matchAll(
      /<(?:\w+:)?c\b([^>]*)\/>|<(?:\w+:)?c\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/g,
    )) {
      const attributes = cellMatch[1] ?? cellMatch[2] ?? '';
      const address = attributeValue(attributes, 'r');
      if (!address) continue;
      const colIndex = columnIndex(address);
      const type = attributeValue(attributes, 't');
      const contents = cellMatch[3] ?? '';
      const rawValue = contents.match(
        /<(?:\w+:)?v\b[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/,
      )?.[1];
      let value = '';
      if (type === 's') value = sharedStrings[Number(rawValue)] ?? '';
      else if (type === 'inlineStr') value = textNodes(contents);
      else if (type === 'b') value = rawValue === '1' ? 'Yes' : 'No';
      else if (rawValue !== undefined) value = decodeXml(rawValue);
      outputRow[colIndex] = value;
    }
    outputRows[rowIndex] = outputRow;
  }
  return outputRows;
}

const rows = await readWorksheet(workbookPath, 'Publications');

let headerRowNumber = 0;
rows.forEach((row, rowIndex) => {
  if (!headerRowNumber && textFromCell(row[0]) === 'Order') {
    headerRowNumber = rowIndex + 1;
  }
});
if (!headerRowNumber) throw new Error('Could not find the publication header row.');

const actualHeaders = expectedHeaders.map((_, index) =>
  textFromCell(rows[headerRowNumber - 1]?.[index]),
);
for (let index = 0; index < expectedHeaders.length; index += 1) {
  if (actualHeaders[index] !== expectedHeaders[index]) {
    throw new Error(
      `Column ${index + 1} must be named "${expectedHeaders[index]}" (found "${actualHeaders[index]}").`,
    );
  }
}

const publications = [];
for (let rowNumber = headerRowNumber + 1; rowNumber <= rows.length; rowNumber += 1) {
  const row = rows[rowNumber - 1] ?? [];
  const values = expectedHeaders.map((_, index) => textFromCell(row[index]));
  if (values.every((value) => value === '')) continue;

  const [
    orderText,
    showText,
    titleText,
    authorsText,
    venueText,
    yearText,
    typeText,
    awardText,
    pdfText,
    externalLinkText,
    videoText,
    materialsText,
  ] = values;

  const order = Number(orderText);
  if (!Number.isInteger(order) || order < 1) {
    throw new Error(`Row ${rowNumber}: Order must be a positive whole number.`);
  }
  const show = isVisible(showText, rowNumber);
  if (!show) continue;

  const year = Number(yearText);
  if (!Number.isInteger(year) || year < 1900 || year > 2200) {
    throw new Error(`Row ${rowNumber}: Year must be a whole number from 1900 to 2200.`);
  }

  const authors = requireText(authorsText, 'Authors', rowNumber)
    .split(/;|\n/)
    .map((author) => author.trim())
    .filter(Boolean);
  if (authors.length === 0) throw new Error(`Row ${rowNumber}: Add at least one author.`);

  const links = {
    pdf: optional(pdfText),
    external: optional(externalLinkText),
    video: optional(videoText),
    materials: optional(materialsText),
  };
  validateLink(links.pdf, 'PDF', rowNumber);
  validateLink(links.external, 'External link', rowNumber);
  validateLink(links.video, 'Video', rowNumber);
  validateLink(links.materials, 'Materials', rowNumber);

  publications.push({
    order,
    title: requireText(titleText, 'Title', rowNumber),
    authors,
    venue: requireText(venueText, 'Venue', rowNumber),
    year,
    type: requireText(typeText, 'Type', rowNumber),
    award: optional(awardText),
    links,
  });
}

if (publications.length === 0) throw new Error('No visible publications were found.');

const duplicateOrders = publications
  .map((publication) => publication.order)
  .filter((order, index, orders) => orders.indexOf(order) !== index);
if (duplicateOrders.length > 0) {
  throw new Error(`Order values must be unique. Duplicate: ${duplicateOrders[0]}.`);
}

// Larger order numbers are newer and should appear first on the website. This
// lets editors append each new paper at the bottom of the workbook.
publications.sort((a, b) => b.order - a.order);

const output = `// Generated by npm run publications:sync. Edit the Excel workbook, not this file.
export type Publication = {
  order: number;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  award?: string;
  links: {
    pdf?: string;
    external?: string;
    video?: string;
    materials?: string;
  };
};

export const publications: Publication[] = ${JSON.stringify(publications, null, 2)};
`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output, 'utf8');
console.log(`Synced ${publications.length} publications to ${path.relative(projectRoot, outputPath)}.`);
