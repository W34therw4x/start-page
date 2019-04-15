import puppeteer from 'puppeteer';
import { getChrome } from './chromeClient';

/* out
  {
    news: [
      {
        link: String,
        title: String,
        description: String
      }
    ]
  }
*/
export const hello = async (event: any) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const url = message.url;
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const scrapedData = await page.evaluate(
    data =>
      Array.from(document.querySelectorAll(data.selectors.container)).map(
        article => ({
          description: article.querySelector(data.selectors.description)!
            .textContent,
          link: article
            .querySelector(data.selectors.link)!
            .getAttribute('href'),
          title: article.querySelector(data.selectors.title)!.textContent
        })
      ),
    message
  );
  await browser.close();

  return {
    scrapedData,
    statusCode: 200
  };
};
