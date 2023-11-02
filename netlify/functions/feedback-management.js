const querystring = require('node:querystring');
const { App, AwsLambdaReceiver } = require('@slack/bolt');
const { JWT } = require('google-auth-library');
const { sheets } = require('@googleapis/sheets');

const X_FEEBACKS_CHANNEL_ID = 'C04U3R2V9UK';
const JOY_FEEBACKS_CHANNEL_ID = 'C050VE13HDL';
const TOOLPAD_FEEBACKS_CHANNEL_ID = 'C050MHU703Z';
const CORE_FEEBACKS_CHANNEL_ID = 'C041SDSF32L';
// The design feedback alert was removed in https://github.com/mui/material-ui/pull/39691
// This dead code is here to simplify the creation of special feedback channel
const DESIGN_FEEDBACKS_CHANNEL_ID = 'C05HHSFH2QJ';

const getSlackChannelId = (url, specialCases) => {
  const { isDesignFeedback } = specialCases;

  if (isDesignFeedback) {
    return DESIGN_FEEDBACKS_CHANNEL_ID;
  }
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
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Define slack actions to answer
app.action('delete_action', async ({ ack, body, client, logger }) => {
  try {
    await ack();

    const {
      user: { username },
      channel: { id: channelId },
      message,
      actions: [{ value }],
    } = body;

    const { comment, currentLocationURL = '', commmentSectionURL = '' } = JSON.parse(value);

    const googleAuth = new JWT({
      email: 'service-account-804@docs-feedbacks.iam.gserviceaccount.com',
      key: process.env.G_SHEET_TOKEN.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const service = sheets({ version: 'v4', auth: googleAuth });

    await service.spreadsheets.values.append({
      spreadsheetId: spreadSheetsIds.forLater,
      range: 'Deleted messages!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[username, comment, currentLocationURL, commmentSectionURL]],
      },
    });
    await client.chat.delete({
      channel: channelId,
      ts: message.ts,
      as_user: true,
      token: process.env.SLACK_BOT_TOKEN,
    });
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
  }
});

app.action('save_message', async ({ ack, body, client, logger }) => {
  try {
    await ack();
    const {
      user: { username },
      channel: { id: channelId },
      message,
      actions: [{ value }],
    } = body;

    const { comment, currentLocationURL = '', commmentSectionURL = '' } = JSON.parse(value);

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
        values: [[username, comment, currentLocationURL, commmentSectionURL]],
      },
    });
    await client.chat.postMessage({
      channel: channelId,
      thread_ts: message.ts,
      as_user: true,
      text: `Saved in <https://docs.google.com/spreadsheets/d/${spreadSheetsIds.forLater}/>`,
    });
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
  }
});

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
    const data = JSON.parse(payload);

    if (data.callback_id === 'send_feedback') {
      // We send the feedback to the appopiate slack channel
      const {
        rating,
        comment,
        currentLocationURL,
        commmentSectionURL: inCommmentSectionURL,
        commmentSectionTitle,
        githubRepo,
      } = data;

      // The design feedback alert was removed in https://github.com/mui/material-ui/pull/39691
      // This dead code is here to simplify the creation of special feedback channel
      const isDesignFeedback = inCommmentSectionURL.includes('#new-docs-api-feedback');
      const commmentSectionURL = isDesignFeedback ? '' : inCommmentSectionURL;

      const simpleSlackMessage = [
        `New comment ${rating === 1 ? '👍' : ''}${rating === 0 ? '👎' : ''}`,
        `>${comment.split('\n').join('\n>')}`,
        `sent from ${currentLocationURL}${
          commmentSectionTitle
            ? ` (from section <${commmentSectionURL}|${commmentSectionTitle})>`
            : ''
        }`,
      ].join('\n\n');

      const githubNewIssueParams = new URLSearchParams({
        title: '[ ] Docs feedback',
        body: `Feedback received:
${comment}

from ${commmentSectionURL}
`,
      });

      await app.client.chat.postMessage({
        channel: getSlackChannelId(currentLocationURL, { isDesignFeedback }),
        text: simpleSlackMessage, // Fallback for notification
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: simpleSlackMessage,
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Create issue',
                  emoji: true,
                },
                url: `${githubRepo}/issues/new?${githubNewIssueParams}`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Save',
                },
                value: JSON.stringify({
                  comment,
                  currentLocationURL,
                  commmentSectionURL,
                }),
                action_id: 'save_message',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Delete',
                },
                value: JSON.stringify({
                  comment,
                  currentLocationURL,
                  commmentSectionURL,
                }),
                style: 'danger',
                action_id: 'delete_action',
              },
            ],
          },
        ],
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
