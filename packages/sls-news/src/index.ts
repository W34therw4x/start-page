import { INewsMessageObject } from '@org/types';
// import AWS = require("aws-sdk");
import puppeteer from 'puppeteer';
import { getChrome } from './chrome-client';
// to be continued
// const sns = new AWS.SNS({ region: process.env.region });

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
  const message: INewsMessageObject = JSON.parse(event.Records[0].Sns.Message);
  const url = message.url;
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const scrapedData = await page.evaluate(
    selectors =>
      Array.from(document.querySelectorAll(selectors.container)).map(
        article => ({
          description: article.querySelector(selectors.description)!
            .textContent,
          link: article.querySelector(selectors.link)!.getAttribute('href'),
          title: article.querySelector(selectors.title)!.textContent
        })
      ),
    JSON.stringify(message.selectors)
  );
  await browser.close();

  return {
    scrapedData,
    statusCode: 200
  };
};
