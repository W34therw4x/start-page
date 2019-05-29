import AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: process.env.region });

function generateResponse(code: number, payload: object) {
  return {
    body: JSON.stringify(payload),
    statusCode: code
  };
}
function generateError(code: number, err: Error) {
  return generateResponse(code, {
    message: err.message
  });
}

async function publishSnsTopic(data: ITaskObject) {
  const params = {
    Message: JSON.stringify(data.message),
    TopicArn: `arn:aws:sns:${process.env.region}:
    ${process.env.accountId}:${data.task}`
  };
  return sns.publish(params).promise();
}

// interface temp here
interface ITaskObject {
  message: object;
  task: string;
}

const dummyData = {
  message: {
    options: {
      initialActions: [
        {
          action: 'click',
          selector: ''
        }
      ],
      limit: 5
    },
    selectors: {
      container: '.postItem + div',
      description: 'a > div',
      link: 'a',
      title: 'h3 div'
    },
    url: 'https://hackernoon.com/latest-tech-stories/home'
  },
  task: 'fetch-news'
};

export const tasker = async (event: any) => {
  try {
    const metadata = await publishSnsTopic(dummyData);
    return generateResponse(200, {
      data: metadata,
      message: 'Successfully added the calculation.'
    });
  } catch (err) {
    return generateError(
      500,
      new Error("Couldn't add the calculation due to an internal error.")
    );
  }
};
