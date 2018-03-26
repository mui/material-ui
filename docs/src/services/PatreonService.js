import { patreon as patreonAPI, oauth as patreonOAuth } from 'patreon';

const CLIENT_ID = 'o2LpJEZuhrc9z2ZSm6kXGVAWm4AFciXzSK4zb0bEszGxSVPImNTJaW7eEZsWqu5I';
const CLIENT_SECRET = 'SsRZ12GMWV75vEEXalhSKRkBRV0PxvsaNPA78D0qnESvkeTrWuJ';

const TOKEN = 'ojwtWwI5Kx_WQZPMEKBwbG4afhBhKJTO5tZfxWpdk9Y';

class PatreonService {
  constructor() {
    this.patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);
    this.patreonAPIClient = patreonAPI(TOKEN);
  }

  getPatrons() {
    return this.patreonAPIClient('/campaigns/1559688/pledges')
      .then(({ rawJson }) => rawJson.data
        // sort by pledge amount
        .sort((a, b) => a.attributes.amount_cents - b.attributes.amount_cents)
        .reverse()
        .map(({ relationships }) => {
          const patronId = relationships.patron.data.id;
          const user = rawJson.included.find(entity => entity.id === patronId);

          return user.attributes;
        }));
  }
}

export default new PatreonService();

