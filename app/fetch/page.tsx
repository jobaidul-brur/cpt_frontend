import axios from 'axios';
import cheerio from 'cheerio';

const scrapeWebsite = async () => {
  try {
    const url = 'https://codeforces.com/problemset/problem/1886/F'; // Replace with the URL you want to scrape
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Select the desired <div> element by its class or other attributes
      const desiredDiv = $('.problem-statement'); // Replace 'your-div-class' with the class or selector for your target div

      // Convert the selected <div> element to HTML
      const divHtml = desiredDiv.html();
      console.log('Selected <div> as HTML:', divHtml);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export default scrapeWebsite;
