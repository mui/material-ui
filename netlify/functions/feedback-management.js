const { WebClient } = require('@slack/web-api');
const { App, AwsLambdaReceiver } = require('@slack/bolt');
const querystring = require('node:querystring');
const { JWT } = require('google-auth-library');
const { sheets } = require('@googleapis/sheets');

const X_FEEBACKS_CHANNEL_ID = 'C04U3R2V9UK';
const JOY_FEEBACKS_CHANNEL_ID = 'C050VE13HDL';
const TOOLPAD_FEEBACKS_CHANNEL_ID = 'C050MHU703Z';
const CORE_FEEBACKS_CHANNEL_ID = 'C041SDSF32L';

const getSlackChannelId = (url) => {
  if (url.includes('/x/')) {
    return X_FEEBACKS_CHANNEL_ID;
  }
  if (url.includes('/joy-ui/')) {
    return JOY_FEEBACKS_CHANNEL_ID;
  }
  if (url.includes('/toolpad/')) {
    return TOOLPAD_FEEBACKS_CHANNEL_ID;
  }
  return CORE_FEEBACKS_CHANNEL_ID;
};

const spreadSheetsIds = {
  forLater: '1NAUTsIcReVylWPby5K0omXWZpgjd9bjxE8V2J-dwPyc',
};

// Setup of the slack bot (taken from https://slack.dev/bolt-js/deployments/aws-lambda)
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

// Define slack actions to answer

app.shortcut('delete_action', async ({ ack, body, client }) => {
  await ack();
  await client.chat.delete({
    channel: body.channel.id,
    ts: body.message_ts,
    as_user: true,
    token: process.env.SLACK_BOT_TOKEN,
  });
});

app.shortcut('save_message', async ({ ack, body, client }) => {
  await ack();
  const {
    user: { username },
    channel: { id: channelId },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    message_ts,
    message,
  } = body;
  const elements = message?.blocks?.[0]?.elements;

  const quote = message?.text
    .split('\n\nsent from')[0]
    .split('\n\n')
    .slice(1)
    .join('\n\n')
    .replace(/&gt;/g, '');

  const links = elements[2].elements
    .filter((element) => element.type === 'link')
    .map((element) => element.url);

  const googleAuth = new JWT({
    email: 'service-account-804@docs-feedbacks.iam.gserviceaccount.com',
    key: process.env.G_SHEET_TOKEN.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const service = sheets({ version: 'v4', auth: googleAuth });

  await service.spreadsheets.values.append({
    spreadsheetId: spreadSheetsIds.forLater,
    range: 'Sheet1!A:D',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[username, quote, links[0] ?? '', links[1] ?? '']],
    },
  });
  await client.chat.postMessage({
    channel: channelId,
    thread_ts: message_ts,
    as_user: true,
    text: `Saved in <https://docs.google.com/spreadsheets/d/${spreadSheetsIds.forLater}/>`,
  });
});

// Slack API
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * @param {object} event
 * @param {object} context
 */
exports.handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 };
  }
  try {
    const { payload } = querystring.parse(event.body);
    const data = JSON.parse(decodeURIComponent(payload));

    if (data.callback_id === 'send_feedback') {
      // We send the feedback to the appopiate slack channel
      const { rating, comment, currentLocationURL, commmentSectionURL, commmentSectionTitle } =
        data;

      const simpleSlackMessage = [
        `New comment ${rating === 1 ? '👍' : ''}${rating === 0 ? '👎' : ''}`,
        `>${comment.split('\n').join('\n>')}`,
        `sent from ${currentLocationURL}${
          commmentSectionTitle
            ? ` (from section <${commmentSectionURL}|${commmentSectionTitle})>`
            : ''
        }`,
      ].join('\n\n');

      await slackClient.chat.postMessage({
        channel: getSlackChannelId(currentLocationURL),
        text: simpleSlackMessage,
        as_user: true,
        unfurl_links: false,
        unfurl_media: false,
      });
    } else {
      const handler = await awsLambdaReceiver.start();
      return handler(event, context, callback);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({}),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
