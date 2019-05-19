import { INewsMessageObject } from '@org/types';
// import AWS = require("aws-sdk");
import { ChromeClient } from './chrome-client';
// to be continued
// const sns = new AWS.SNS({ region: process.env.region });

export const isNewsMessageObject = (arg: any): arg is INewsMessageObject => {
  return arg && arg.selectors && arg.url;
};

export const fetchNewsHandler = async (event: any) => {
  const message: INewsMessageObject = JSON.parse(event.Records[0].Sns.Message);
  if (isNewsMessageObject(message)) {
    const chrome = await ChromeClient.getInstance();
    const scrapedData = await chrome.fetchNews(message.url, message.selectors);
    await ChromeClient.browser.close();
    return {
      scrapedData,
      statusCode: 200
    };
  }
  return;
};
