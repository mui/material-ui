process.env.NODE_ENV = 'production';
require('react-scripts/config/env');

const fse = require('fs-extra');
const path = require('path');
const patreonApi = require('patreon').patreon;

const patreonAPIClient = patreonApi(process.env.CREATOR_TOKEN);

patreonAPIClient('/campaigns/1559688/pledges')
  .then(({ rawJson }) =>
    rawJson.data
      // sort by pledge amount
      .sort((a, b) => a.attributes.amount_cents - b.attributes.amount_cents)
      .reverse()
      .map(({ relationships }) => {
        const patronId = relationships.patron.data.id;
        const user = rawJson.included.find(entity => entity.id === patronId);

        return user.attributes;
      })
  )
  .then(users =>
    fse.writeFile(path.resolve(__dirname, '..', 'src', 'patrons.json'), JSON.stringify(users))
  );
