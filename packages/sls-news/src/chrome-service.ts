import {
  INewsMessageSelectors,
  ISingleScrapedNewsContentObject
} from '@org/sls-news-types';
import launchChrome from '@serverless-chrome/lambda';
import puppeteer, { Browser, Page } from 'puppeteer';
import request from 'superagent';

export class ChromeService {
  private static instance: ChromeService;
  private static chromeEndpoint: string;
  private static browser: Browser;

  private constructor() {}

  public static async getInstance(): Promise<ChromeService> {
    if (!ChromeService.instance) {
      ChromeService.instance = new ChromeService();
      ChromeService.chromeEndpoint = await ChromeService.getChromeEndpoint();
      ChromeService.browser = await ChromeService.getConnectedBrowser(
        ChromeService.chromeEndpoint
      );
    }
    return ChromeService.instance;
  }

  private static async getChromeEndpoint(): Promise<string> {
    const chrome = await launchChrome();

    const response = await request
      .get(`${chrome.url}/json/version`)
      .set('Content-Type', 'application/json');

    const endpoint = response.body.webSocketDebuggerUrl;

    return endpoint;
  }

  private static async getConnectedBrowser(endpoint: string): Promise<Browser> {
    return await puppeteer.connect({
      browserWSEndpoint: endpoint
    });
  }

  public async getNewPage(): Promise<Page> {
    return await ChromeService.browser.newPage();
  }

  public async goToUrl(page: Page, url: string): Promise<Page> {
    await page.goto(url, { waitUntil: 'networkidle0' });
    return page;
  }

  public async closeBrowser(): Promise<void> {
    ChromeService.browser.close();
  }

  public async fetchNews(
    page: Page,
    selectors: INewsMessageSelectors
  ): Promise<ISingleScrapedNewsContentObject[]> {
    return await page.evaluate(
      ({ container, description, link, title }) =>
        Array.from(document.querySelectorAll(container)).map(article => ({
          description: article.querySelector(description)!.textContent,
          link: article.querySelector(link)!.getAttribute('href'),
          title: article.querySelector(title)!.textContent
        })),
      { ...selectors }
    );
  }
}
