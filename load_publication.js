d3.csv("document/publication.csv").then(function(data) {
  console.log(data)
  const publicationDiv = document.getElementById('Info_Publications');
  let html = '<p class = "Title" name = "Publications">Publications</p>'
  html+='<p class = "Text" style = "padding-left: 4px;">';
  for (let i = 0; i < data.length; i++) {
    html += '<p class = "Text" style = "padding-left: 4px;">';
    html += data[i].citation
    if(data[i].Link!=0){
      html += `<a href=${data[i].Link}>[link]</a>`;}
      html += '</p>';
    }
    html += '<br>';
    html += '</p>';
    publicationDiv.innerHTML = html;


}).catch(function(error) {
    console.error('Error loading the CSV file:', error);
});
/*
document.addEventListener('DOMContentLoaded', function () {
    const publicationDiv = document.getElementById('Info_Publications');
    const csvPath = 'document/publication.csv'; // Replace with the path to your CSV file
    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                header: false, // Set to true if your CSV has a header row
                skipEmptyLines: true,
                delimiter: '\t', // Set the delimiter as tab character
                complete: function(results) {
                    const lines = results.data;
            let html = '<p class = "Title" name = "Publications">Publications</p>'
            html+='<p class = "Text" style = "padding-left: 4px;">';
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim(); // Trim whitespace
                console.log(line)
                  const columns =line.split(regex);
                  console.log(columns)
                  html += '<p class = "Text" style = "padding-left: 4px;">';
                  for (let j = 0; j < columns.length-1; j++) {

                      html += columns[j];
                      if (j < columns.length - 1) {
                          html += ', ';
                      }
                  }
                  html += `<a href=${columns[columns.length-1]}>[link]</a>`;
                  html += '</p>';
                }


            html += '</p>';

            publicationDiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error reading CSV:', error);
            publicationDiv.innerHTML = 'Error reading CSV file.';
        });
});
*/
