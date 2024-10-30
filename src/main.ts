import { fetchImageUrl, fetchBearData } from './fetch';
import { renderBears, setupCommentToggle, setupCommentForm } from './ui';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Extract bears from Wikitext
const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);
      const range =
        rangeMatch?.[1] !== undefined ? rangeMatch[1].trim() : 'Unknown';

      if (
        nameMatch?.[1] !== undefined &&
        binomialMatch?.[1] !== undefined &&
        imageMatch?.[1] !== undefined
      ) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);
        const bear: Bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range,
        };
        bears.push(bear);
      }
    }
  }
  renderBears(bears);
};

// Fetch and display bear data
const initialize = async (): Promise<void> => {
  const wikitext = await fetchBearData();
  if (wikitext !== undefined && wikitext.trim() !== '') {
    await extractBears(wikitext);
  } else {
    console.error('No wikitext data available to extract bears.');
  }

  setupCommentToggle();
  setupCommentForm();
};

// Start the application with explicit handling
void initialize();
