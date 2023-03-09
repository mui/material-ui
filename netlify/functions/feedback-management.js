const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/**
 * @param {object} event
 * @param {object} context
 */
exports.handler = async (event) => {
  const { type, payload } = JSON.parse(event.body);

  switch (type) {
    case 'sendMessage':
      {
        const { rating, comment, currentLocationURL, commmentSectionURL, commmentSectionTitle } =
          payload;

        const simpleSlackMessage = [
          `New comment ${rating === 1 ? '👍' : ''}${rating === 0 ? '👎' : ''}`,
          `>${comment.split('\n').join('\n>')}`,
          `sent from ${currentLocationURL}${
            commmentSectionTitle
              ? ` (from section <${commmentSectionURL}|${commmentSectionTitle})>`
              : ''
          }`,
        ].join('\n\n');
        app.client.chat.postMessage({
          channel: 'C041SDSF32L',
          text: simpleSlackMessage,
        });
      }
      break;

    default:
      break;
  }

  return {
    statusCode: 200,
    body: {},
  };
};
