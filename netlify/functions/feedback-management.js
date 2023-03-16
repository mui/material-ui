const { WebClient } = require('@slack/web-api');
const querystring = require('node:querystring');
const { JWT } = require('google-auth-library');
const { sheets } = require('@googleapis/sheets');

const slackChannels = {
  'mui-x': 'C04U3R2V9UK',
  'mui-core': 'C041SDSF32L',
};

const spreadSheetsIds = {
  forLater: '1NAUTsIcReVylWPby5K0omXWZpgjd9bjxE8V2J-dwPyc',
};

/**
 * @param {object} event
 * @param {object} context
 */
exports.handler = async (event) => {
  // Slack API
  const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

  try {
    const { payload } = querystring.parse(event.body);
    const data = JSON.parse(decodeURIComponent(payload));

    // eslint-disable-next-line no-console
    console.log('=== data ===');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 2));
    // eslint-disable-next-line no-console
    console.log('============');
    switch (data.callback_id) {
      case 'send_feedback':
        {
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
            channel: slackChannels['mui-x'],
            text: simpleSlackMessage,
            as_user: true,
          });
        }
        break;
      case 'delete_action':
        await slackClient.chat.delete({
          channel: data.channel.id,
          ts: data.message_ts,
          as_user: true,
          token: process.env.SLACK_BOT_TOKEN,
        });

        break;
      case 'save_message':
        {
          const googleAuth = new JWT({
            email: 'service-account-804@docs-feedbacks.iam.gserviceaccount.com',
            key: process.env.G_SHEET_TOKEN,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });

          const service = sheets({ version: 'v4', auth: googleAuth });

          const {
            user: { username },
            channel: { id: channelId },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            message_ts,
            message,
          } = data;
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

          service.spreadsheets.values
            .append({
              spreadsheetId: spreadSheetsIds.forLater,
              range: 'Sheet1!A:D',
              valueInputOption: 'USER_ENTERED',
              resource: {
                values: [[username, quote, links[0] ?? '', links[1] ?? '']],
              },
            })
            .then(() => {
              slackClient.chat.postMessage({
                channel: channelId,
                thread_ts: message_ts,
                as_user: true,
                text: `Saved in <https://docs.google.com/spreadsheets/d/${spreadSheetsIds.forLater}/>`,
              });
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        }

        break;

      default:
        break;
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
