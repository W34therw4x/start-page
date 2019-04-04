import puppeteer from 'puppeteer';
import { getChrome } from './chromeClient';

const dummyData = {
  options: {
    number: 5,
    onLoadSteps: [
      {
        action: 'click',
        selector: ''
      }
    ]
  },
  selectors: {
    container: '.postItem + div',
    description: 'a > div',
    link: 'a',
    title: 'h3 div'
  },
  url: 'https://hackernoon.com/latest-tech-stories/home'
};

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
  const url = dummyData.url;
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
    dummyData
  );
  await browser.close();
  return {
    scrapedData,
    statusCode: 200
  };
};
