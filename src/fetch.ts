interface ImageInfo {
  url: string;
}

interface Page {
  pageid: number;
  ns: number;
  title: string;
  imageinfo?: ImageInfo[];
}

interface QueryResponse {
  query: {
    pages: Record<string, Page>;
  };
}

const baseUrl = 'https://en.wikipedia.org/w/api.php';

// Function to fetch image URLs based on file names
export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  try {
    const response = await fetch(url);
    const data: QueryResponse = await response.json();

    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    const imageUrl = page?.imageinfo?.[0]?.url;

    if (imageUrl != null && imageUrl.trim() !== '') {
      return imageUrl;
    } else {
      return 'placeholder-image-url';
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return 'placeholder-image-url'; // Fallback in case of an error
  }
};

// Function to fetch bear data
export const fetchBearData = async (): Promise<string | undefined> => {
  const params = {
    action: 'parse',
    page: 'List_of_ursids',
    prop: 'wikitext',
    section: '3',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.parse?.wikitext?.['*'];
  } catch (error) {
    console.error('Error fetching bear data:', error);
    return undefined;
  }
};
