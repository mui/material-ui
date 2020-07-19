// @ts-check
require('dotenv').config();

const fse = require('fs-extra');
const path = require('path');
const { patreon: patreonApi } = require('patreon');

function processPatreonPledges(rawJson) {
  return (
    rawJson.data
      // sort by pledge amount
      .sort((a, b) => a.attributes.amount_cents - b.attributes.amount_cents)
      .reverse()
      .map(({ relationships }) => {
        const patronId = relationships.patron.data.id;
        const user = rawJson.included.find((entity) => entity.id === patronId);

        return user.attributes;
      })
  );
}

async function main() {
  if (!process.argv[2]) {
    throw new Error(
      `Please provide creator access token as argument.\n
Find creator access token at https://www.patreon.com/portal/registration/register-clients\n
Then pass token like: yarn generate-backers {your token here}`
    );
  }

  const patreonAPIClient = patreonApi(process.argv[2]);
  const { rawJson } = await patreonAPIClient('/campaigns/1559688/pledges');
  const processedPatreonResponse = processPatreonPledges(rawJson);

  await fse.writeFile(
    path.resolve(__dirname, '..', 'patrons.json'),
    JSON.stringify(processedPatreonResponse)
  );
}

main().catch(console.error);
