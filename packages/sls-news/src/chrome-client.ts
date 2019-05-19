import { INewsMessageSelectors } from '@org/types';
import launchChrome from '@serverless-chrome/lambda';
import puppeteer, { Browser } from 'puppeteer';
import request from 'superagent';

export interface ISingleScrapedNewsContentObject {
  link: string;
  title: string;
  description: string;
}
export class ChromeClient {
  private static instance: ChromeClient;
  public static browser: Browser;

  private constructor() {}

  public static async getInstance() {
    if (!ChromeClient.instance) {
      ChromeClient.instance = new ChromeClient();
      const chrome = await ChromeClient.getChrome();
      ChromeClient.browser = await puppeteer.connect({
        browserWSEndpoint: chrome.endpoint
      });
    }
    return ChromeClient.instance;
  }

  private static async getChrome() {
    const chrome = await launchChrome();

    const response = await request
      .get(`${chrome.url}/json/version`)
      .set('Content-Type', 'application/json');

    const endpoint = response.body.webSocketDebuggerUrl;

    return {
      endpoint,
      instance: chrome
    };
  }

  private async getLoadedPage(url: string) {
    const page = await ChromeClient.browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    return page;
  }

  public async fetchNews(
    url: string,
    selectors: INewsMessageSelectors
  ): Promise<ISingleScrapedNewsContentObject[]> {
    const page = await this.getLoadedPage(url);
    return await page.evaluate(
      pageSelectors =>
        Array.from(document.querySelectorAll(pageSelectors.container)).map(
          article => ({
            description: article.querySelector(pageSelectors.description)!
              .textContent,
            link: article
              .querySelector(pageSelectors.link)!
              .getAttribute('href'),
            title: article.querySelector(pageSelectors.title)!.textContent
          })
        ),
      JSON.stringify(selectors)
    );
  }
}
