// Records the response the `AppSearch/SearchModal*` fixtures replay.
//
// Run it when the index or the record shape changes:
//
//   pnpm test:regressions:record
//
// It queries the live index with the same parameters `AppSearch` sends, so the
// fixture stays a real payload rather than a hand-written approximation. Keep
// it out of CI: screenshots have to stay deterministic, and the index changes
// whenever the docs are recrawled.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { INDEX_NAME, QUERY } from './docsearchFixtureData.js';

// Public search-only credentials, the same pair `AppSearch` ships.
const APP_ID = 'TZGZ85B9TB';
const API_KEY = '8177dfb3e2be72b241ffb8c5abafa899';
const LIVE_INDEX = 'material-ui-v9';
// Enough hits for several sections, a parent with children and a content hit.
const HITS_PER_PAGE = 8;
// DocSearch's own default, in words.
const SNIPPET_LENGTH = 15;

const levels = [0, 1, 2, 3, 4, 5].map((n) => `hierarchy.lvl${n}`);

const response = await fetch(
  `https://${APP_ID.toLowerCase()}-dsn.algolia.net/1/indexes/*/queries`,
  {
    method: 'POST',
    headers: {
      'x-algolia-application-id': APP_ID,
      'x-algolia-api-key': API_KEY,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      requests: [
        {
          indexName: LIVE_INDEX,
          query: QUERY,
          hitsPerPage: HITS_PER_PAGE,
          // Mirrors the `searchParameters` in `AppSearch`.
          facetFilters: ['version:master', 'language:en'],
          filters: 'NOT productId:base-ui',
          optionalFilters: ['productId:material-ui'],
          attributesToRetrieve: [
            ...levels,
            'content',
            'type',
            'url',
            'productId',
            'productCategoryId',
          ],
          // DocSearch's defaults, which `AppSearch` does not override.
          attributesToSnippet: [...levels.slice(1), 'content'].map((a) => `${a}:${SNIPPET_LENGTH}`),
          snippetEllipsisText: '…',
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>',
        },
      ],
    }),
  },
);

if (!response.ok) {
  throw new Error(`Algolia replied ${response.status} ${response.statusText}`);
}

const [result] = (await response.json()).results;

// Drop the fields that vary per request, and report the index the fixture
// answers for rather than the one recorded from.
const { processingTimeMS, processingTimingsMS, serverTimeMS, params, ...rest } = result;
const recorded = { ...rest, index: INDEX_NAME };

const target = fileURLToPath(new URL('./algoliaSearchResponse.json', import.meta.url));
writeFileSync(target, `${JSON.stringify({ results: [recorded] }, null, 2)}\n`);

const sections = new Set(recorded.hits.map((hit) => hit.hierarchy.lvl0));
console.warn(
  `Recorded ${recorded.hits.length} hits for "${QUERY}" across ${sections.size} sections.`,
);
