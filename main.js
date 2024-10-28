// main.js
import { fetchImageUrl, fetchBearData } from './fetch.js';
import { renderBears, setupCommentToggle, setupCommentForm } from './ui.js';

// Extract bears from Wikitext
const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);
      const range = rangeMatch ? rangeMatch[1].trim() : "Unknown";

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        const imageUrl = await fetchImageUrl(fileName);
        const bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: range
        };
        bears.push(bear);
      }
    }
  }
  renderBears(bears);
};

// Fetch and display bear data
const initialize = async () => {
  const wikitext = await fetchBearData();
  if (wikitext) await extractBears(wikitext);

  setupCommentToggle();
  setupCommentForm();
};

// Start the application
initialize();
