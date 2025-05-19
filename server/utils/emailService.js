const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.sendEmail = (to, subject, body) => {
  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: subject },
    },
    Source: process.env.EMAIL_SOURCE, // Verified email in SES
  };

  return ses.sendEmail(params).promise();
};
