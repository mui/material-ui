// Shared by the `AppSearch/SearchModal*` fixtures, `index.test.js` and
// `vite.config.mts`, so the index name that keys DocSearch's storage is
// declared once.
export const INDEX_NAME = 'material-ui-regressions';

export const recentSearchesKey = `__DOCSEARCH_RECENT_SEARCHES__${INDEX_NAME}`;
export const favoriteSearchesKey = `__DOCSEARCH_FAVORITE_SEARCHES__${INDEX_NAME}`;

// Shaped like what DocSearch persists: a hit minus `_highlightResult` and
// `_snippetResult`, plus the `pathname`/`as`/`userLanguage` that `AppSearch`'s
// `transformItems` adds. Seeding these gives the start screen a hit list
// without a network round-trip, which is where the section headings and the
// result cards have to line up.
export const RECENT_SEARCHES = [
  {
    objectID: 'regression-card',
    content: null,
    url: 'https://mui.com/material-ui/react-card/',
    url_without_anchor: 'https://mui.com/material-ui/react-card/',
    type: 'lvl1',
    anchor: null,
    hierarchy: {
      lvl0: 'Components',
      lvl1: 'Card',
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },
    productId: 'material-ui',
    productCategoryId: 'core',
    pathname: '/material-ui/react-card/',
    as: '/material-ui/react-card/',
    userLanguage: 'en',
  },
  {
    objectID: 'regression-breakpoints',
    content: null,
    url: 'https://mui.com/material-ui/customization/breakpoints/',
    url_without_anchor: 'https://mui.com/material-ui/customization/breakpoints/',
    type: 'lvl2',
    anchor: null,
    hierarchy: {
      lvl0: 'Customization',
      lvl1: 'Breakpoints',
      lvl2: 'Default breakpoints',
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },
    productId: 'material-ui',
    productCategoryId: 'core',
    pathname: '/material-ui/customization/breakpoints/',
    as: '/material-ui/customization/breakpoints/',
    userLanguage: 'en',
  },
];
