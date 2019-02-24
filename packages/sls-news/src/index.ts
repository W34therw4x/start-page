import puppeteer from 'puppeteer';
import { getChrome } from './chromeClient';

/* in (cnn proof of concept):
  {
    selectors: {
      newsContainerSelector: Selector ('#intl_homepage1-zone-1 .cn--idx-0'),      (document.querySelector('#intl_homepage1-zone-1 .cn--idx-0'))
      newsLinkSelector: Selector ('#intl_homepage1-zone-1 .cn--idx-0 .cd__content a'),      (document.querySelectorAll('#intl_homepage1-zone-1 .cn--idx-0 .cd__content a'))
      newsTitleSelector: Selector
      newsDescritptionSelector: Selector ('#body-text > div.l-container > div.el__leafmedia.el__leafmedia--sourced-paragraph > p'),     (document.querySelector('#body-text > div.l-container > div.el__leafmedia.el__leafmedia--sourced-paragraph > p').textContent;)
    },
    options: {
      newsNumber: Number
      onLoadSteps: [
        {
          selector: Selector
          action: 'click,remove'
        }
      ]
    }
  }
*/

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
  const url = 'https://www.pclab.pl';
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const title = await page.title();
  await browser.close();
  return {
    statusCode: 200,
    title
  };
};
