const fetch = require('node-fetch');

/**
 * @param {object} event
 * @param {string} event.body - https://jsoneditoronline.org/#left=cloud.fb1a4fa30a4f475fa6887071c682e2c1
 */
exports.handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const repo = payload.commit_url.match(/github\.com\/(.*)\/commit/);
  if (!repo) {
    throw new Error(`No repo found at commit_url: ${payload.commit_url}`);
  }

  // eslint-disable-next-line no-console
  console.info(`repo:`, repo[1]);
  // eslint-disable-next-line no-console
  console.info(`branch:`, payload.branch);
  // eslint-disable-next-line no-console
  console.info(`url:`, payload.deploy_ssl_url);

  // for more details > https://circleci.com/docs/2.0/api-developers-guide/#
  await fetch(`https://circleci.com/api/v2/project/gh/${repo[1]}/pipeline`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // token from https://app.netlify.com/sites/material-ui/settings/deploys#environment-variables
      'Circle-Token': process.env.CIRCLE_CI_TOKEN,
    },
    body: JSON.stringify({
      branch: payload.branch,
      parameters: {
        // the parameters defined in .circleci/config.yml
        workflow: 'e2e-website', // name of the workflow
        'e2e-base-url': payload.deploy_ssl_url, // deploy preview url
      },
    }),
  });
  return {
    statusCode: 200,
    body: {},
  };
};
