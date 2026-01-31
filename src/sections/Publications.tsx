import { useEffect, useRef, useState } from 'react';
import { FileText, ExternalLink, Award, Video, Package } from 'lucide-react';

const publications = [
  {
    title: 'Teaching Air Quality and Data Visualization Using Tangible Models for Middle Schoolers',
    authors: ['Yixuan Li', 'Alex Endert', 'Jessica Roberts'],
    venue: '2025 IEEE VIS Workshop on Visualization Education, Literacy, and Activities (EduVIS)',
    year: '2025',
    type: 'Workshop Paper',
    award: null,
    links: {
      pdf: '/document/paper/EduVis2025.pdf',
      doi: 'https://ieeexplore.ieee.org/abstract/document/11298879',
      materials: '/document/materials/Skittles-worksheet.pdf', // ← 新增（可选）
    },
  },
  {
    title: 'From Perception to Decision: Assessing the Role of Chart Type Affordances in High-Level Decision Tasks',
    authors: ['Yixuan Li', 'Emery D Berger', 'Minsuk Kahng', 'Cindy Xiong Bearfield'],
    venue: '2025 IEEE Visualization and Visual Analytics (VIS)',
    year: '2025',
    type: 'Short Paper',
    award: null,
    links: {
      pdf: '/document/paper/VIS2025.pdf',
      doi: 'https://ieeexplore.ieee.org/abstract/document/11298733',
    },
  },
  {
    title: 'DPV (Domain, Purpose, Visual) Framework: A data visualization design pedagogical method for middle schoolers',
    authors: ['Yixuan Li', 'Alex Endert', 'Jessica Roberts'],
    venue: 'EuroVis 2025',
    year: '2025',
    type: 'Full Paper',
    award: null,
    links: {
      pdf: '/document/paper/EuroVis2025.pdf',
      doi: 'https://diglib.eg.org/items/2d9174ce-6e19-4104-8822-b2a651cd620a',
      video: 'https://youtu.be/X2RD7ZvhIsc',
      materials: '/document/materials/DPY-worksheep.pdf', // ← 新增
    },
  },
  {
    title: 'Skills and Dispositions for PFL: Promoting Data Literacy for Middle School Students in a Summer Camp',
    authors: ['Yixuan Li', 'Alex Endert', 'Christine Fry Wise', 'et al.'],
    venue:
      '18th International Conference on Computer-Supported Collaborative Learning (CSCL) 2025-CSCL Proceedings',
    year: '2025',
    type: 'Poster Paper',
    award: null,
    links: {
      pdf: '/document/paper/CSCL2025.pdf',
      doi: 'https://doi.org/10.22318/cscl2025.100413',
    },
  },
  {
    title:
      "Equivalence: An analysis of artists' roles with Image Generative AI from Conceptual Art perspective through an interactive installation design practice",
    authors: ['Yixuan Li', 'Dan C Baciu', 'Marcos Novak', 'George Legrady'],
    venue: 'Generative AI and HCI workshop at CHI 2024',
    year: '2024',
    type: 'Workshop Paper',
    award: null,
    links: {
      pdf: '/document/paper/GenAICHI2024.pdf',
      doi: 'https://arxiv.org/pdf/2404.18385',
      video: 'https://youtu.be/LRD1PXQiRIU'
    },
  },
  {
    title:
      'Diverse interaction recommendation for public users exploring multi-view visualization using deep learning',
    authors: ['Yixuan Li', 'Yusheng Qi', 'Yang Sh', 'et al.'],
    venue: 'IEEE Transactions on Visualization and Computer Graphics',
    year: '2022',
    type: 'Full Paper',
    award: null,
    links: {
      pdf: '/document/paper/TVCG2022.pdf',
      doi: 'https://ieeexplore.ieee.org/abstract/document/9903596',
      video: 'https://youtu.be/PxR0OxZnb8s'
    },
  },
];

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      className={`mb-20 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-2xl font-bold text-[#333] mb-6 pb-2 border-b border-[#e0e0e0]">
        Publications
      </h2>

      <div className="space-y-5">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="bg-white border border-[#e0e0e0] rounded-lg p-5 hover:shadow-md hover:border-[#6b8e6b]/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#333] mb-2 leading-snug">
                  {pub.title}
                </h3>

                <p className="text-sm text-[#666] mb-2">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      {author === 'Yixuan Li' ? (
                        <span className="font-semibold text-[#333]">{author}</span>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-[#6b8e6b]">
                    {pub.venue}
                  </span>
                  <span className="text-sm text-[#999]">·</span>
                  <span className="text-sm text-[#666]">{pub.year}</span>
                  <span className="text-sm text-[#999]">·</span>
                  <span className="text-xs px-2 py-0.5 bg-[#f0f0f0] text-[#666] rounded">
                    {pub.type}
                  </span>

                  {pub.award && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">
                      <Award size={12} />
                      {pub.award}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={pub.links.pdf}
                    className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                  >
                    <FileText size={14} />
                    PDF
                  </a>

                  <a
                    href={pub.links.doi}
                    className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                  >
                    <ExternalLink size={14} />
                    LINK
                  </a>

                  {pub.links.video && (
                    <a
                      href={pub.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <Video size={14} />
                      Presentation
                    </a>
                  )}

                  {pub.links.materials && (
                    <a
                      href={pub.links.materials}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <Package size={14} />
                      Materials
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
