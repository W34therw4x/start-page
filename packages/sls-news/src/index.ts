import { INewsMessageObject } from '@org/sls-news-types';
// import AWS = require("aws-sdk");
import { ChromeService } from './chrome-service';
// const sns = new AWS.SNS({ region: process.env.region });

export const isNewsMessageObject = (arg: any): arg is INewsMessageObject => {
  return arg && arg.selectors && arg.url;
};

export const fetchNewsHandler = async (event: any) => {
  const message: INewsMessageObject = JSON.parse(event.Records[0].Sns.Message)
    .message;
  if (isNewsMessageObject(message)) {
    const chromeService = await ChromeService.getInstance();
    const blankPage = await chromeService.getNewPage();
    const page = await chromeService.goToUrl(blankPage, message.url);
    const scrapedData = await chromeService.fetchNews(page, message.selectors);
    await chromeService.closeBrowser();
    return {
      message: scrapedData,
      statusCode: 200,
      task: 'asdf'
    };
  }
  return;
};
