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
  try {
    const { type, payload } = JSON.parse(event.body);

    if (type === 'sendMessage') {
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
    } else {
      const {
        // user: { username },
        channel: { id: channelId },
        callback_id,
        message_ts,
        // message,
      } = JSON.parse(payload);

      if (callback_id === 'delete_action') {
        app.client.chat
          .delete({
            channel: channelId,
            ts: message_ts,
            as_user: true,
          })
          .catch((error) => {
            return {
              statusCode: 500,
              body: { error },
            };
          });
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: { error },
    };
  }

  return {
    statusCode: 200,
    body: {},
  };
};
