// Canned Algolia response for the `AppSearch/SearchModal*` fixtures.
//
// The results screen is where the hit markup lives -- highlighted matches,
// breadcrumbs, the tree connector between a section and its children -- so it
// needs hits. Serving them from a stub rather than the live index keeps the
// screenshots from churning every time the docs are recrawled, and keeps the
// suite off the network.
//
// Shaped like a real `/1/indexes/*/queries` response: `_snippetResult` carries
// the `<mark>` tags DocSearch renders, `_highlightResult.hierarchy.lvl0` is what
// it groups the sections by, and `productId`/`productCategoryId` are the extra
// attributes `AppSearch` requests for its product chip.
const hit = ({ objectID, type, hierarchy, content = null, snippet, url }) => ({
  objectID,
  type,
  content,
  url,
  url_without_anchor: url.split('#')[0],
  anchor: null,
  hierarchy: {
    lvl0: null,
    lvl1: null,
    lvl2: null,
    lvl3: null,
    lvl4: null,
    lvl5: null,
    lvl6: null,
    ...hierarchy,
  },
  productId: 'material-ui',
  productCategoryId: 'core',
  _highlightResult: {
    hierarchy: { lvl0: { value: hierarchy.lvl0, matchLevel: 'none', matchedWords: [] } },
  },
  _snippetResult: snippet,
});

const HITS = [
  hit({
    objectID: 'components-card',
    type: 'lvl1',
    hierarchy: { lvl0: 'Components', lvl1: 'Card' },
    snippet: { hierarchy: { lvl1: { value: '<mark>Card</mark>', matchLevel: 'full' } } },
    url: 'https://mui.com/material-ui/react-card/',
  }),
  hit({
    objectID: 'components-card-basics',
    type: 'lvl2',
    hierarchy: { lvl0: 'Components', lvl1: 'Card', lvl2: 'Basic card' },
    snippet: { hierarchy: { lvl2: { value: 'Basic <mark>card</mark>', matchLevel: 'full' } } },
    url: 'https://mui.com/material-ui/react-card/#basic-card',
  }),
  hit({
    objectID: 'components-card-media',
    type: 'lvl2',
    hierarchy: { lvl0: 'Components', lvl1: 'Card', lvl2: 'Media' },
    snippet: { hierarchy: { lvl2: { value: 'Media', matchLevel: 'none' } } },
    url: 'https://mui.com/material-ui/react-card/#media',
  }),
  hit({
    objectID: 'api-card',
    type: 'lvl1',
    hierarchy: { lvl0: 'Component API', lvl1: 'Card API' },
    snippet: { hierarchy: { lvl1: { value: '<mark>Card</mark> API', matchLevel: 'full' } } },
    url: 'https://mui.com/material-ui/api/card/',
  }),
  hit({
    objectID: 'api-card-props',
    type: 'content',
    hierarchy: { lvl0: 'Component API', lvl1: 'Card API' },
    // Long on purpose. Below 768px DocSearch lets the title and the path wrap
    // instead of truncating, and a string that fits on one line would render
    // the same either way, leaving the narrow capture with nothing to catch.
    content:
      'The content of the card, which renders inside a Paper surface and accepts any children you pass to it, including a card header, card media and card actions.',
    snippet: {
      content: {
        value:
          'The content of the <mark>card</mark>, which renders inside a Paper surface and accepts any children you pass to it, including a <mark>card</mark> header, <mark>card</mark> media and <mark>card</mark> actions.',
        matchLevel: 'full',
      },
    },
    url: 'https://mui.com/material-ui/api/card/#props',
  }),
];

const RESPONSE = {
  results: [
    {
      hits: HITS,
      nbHits: HITS.length,
      page: 0,
      nbPages: 1,
      hitsPerPage: 40,
      exhaustiveNbHits: true,
      query: 'card',
      params: '',
      index: 'material-ui-regressions',
      processingTimeMS: 1,
      queryID: 'regression',
    },
  ],
};

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
};

const isAlgolia = (url) =>
  url.hostname.endsWith('.algolia.net') || url.hostname.endsWith('.algolianet.com');

/**
 * Answer the search request the modal fires, so the results screen renders the
 * same hits on every run.
 *
 * @param {import('@playwright/test').Page} page
 */
export async function stubAlgoliaSearch(page) {
  await page.route(isAlgolia, (route) =>
    route.fulfill(
      route.request().method() === 'OPTIONS'
        ? { status: 204, headers: CORS }
        : {
            status: 200,
            headers: { ...CORS, 'content-type': 'application/json' },
            body: JSON.stringify(RESPONSE),
          },
    ),
  );
}

/** @param {import('@playwright/test').Page} page */
export async function unstubAlgoliaSearch(page) {
  await page.unroute(isAlgolia);
}
