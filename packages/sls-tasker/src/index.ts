import AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: process.env.region });

async function publishSnsTopic(data: object) {
  const params = {
    Message: JSON.stringify(data),
    TopicArn: `arn:aws:sns:${process.env.region}:${
      process.env.accountId
    }:fetch-news`
  };
  return sns.publish(params).promise();
}

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

export const tasker = async (event: any) => {
  const metadata = await publishSnsTopic(dummyData);
};
