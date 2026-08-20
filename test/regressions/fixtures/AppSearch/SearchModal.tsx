import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrandingProvider } from '@mui/internal-core-docs/branding';
import { UserLanguageProvider } from '@mui/internal-core-docs/i18n';
import PageContext from '@mui/internal-core-docs/PageContext';
import { AppSearch } from '@mui/internal-core-docs/AppLayout/components/AppSearch';

// DocSearch ships its own stylesheet, and every release is free to restyle the
// markup our `AppSearch` overrides target. Two regressions slipped through the
// v4 -> v5 bump that way, so cover the modal here.
//
// `index.test.js` opens the modal (see the `AppSearch` block) rather than this
// fixture doing it on mount: the route loop screenshots the testcase element,
// and a fixed-position overlay would paint over it. That block also declares
// the `docsearch` layer order, so opening this fixture by hand in
// `test:regressions:dev` shows the modal with DocSearch's own styling.

const INDEX_NAME = process.env.SEARCH_INDEX!;

// Shaped like what DocSearch persists: a hit minus `_highlightResult` and
// `_snippetResult`, plus the `pathname`/`as`/`userLanguage` that `AppSearch`'s
// `transformItems` adds. Seeding these renders the hit list without a network
// round-trip, which is where the section headings and the result cards have to
// line up.
const RECENT_SEARCHES = [
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

// `AppSearch` reads `productId`/`productCategoryId` off the context, and
// `PageContext` has no default value.
const pageContext = {
  activePage: null,
  pages: [],
  productId: 'material-ui',
  productCategoryId: 'core',
  productIdentifier: { metadata: '', name: 'Material UI', versions: [] },
  activePageParents: [],
} as unknown as React.ContextType<typeof PageContext>;

export default function SearchModal() {
  // Seed before `AppSearch` mounts: DocSearch reads the stored searches once,
  // when the modal first renders.
  const [seeded, setSeeded] = React.useState(false);
  React.useLayoutEffect(() => {
    localStorage.setItem(
      `__DOCSEARCH_RECENT_SEARCHES__${INDEX_NAME}`,
      JSON.stringify(RECENT_SEARCHES),
    );
    localStorage.setItem(`__DOCSEARCH_FAVORITE_SEARCHES__${INDEX_NAME}`, '[]');
    setSeeded(true);
  }, []);

  return (
    // `useUserLanguage` defaults to an empty string, which makes every
    // `t(...)` call fall back to an ellipsis.
    <UserLanguageProvider defaultUserLanguage="en">
      <BrandingProvider mode="light">
        {/*
          `TestViewer` sets `box-sizing: content-box` on purpose, to catch
          components that rely on the docs' reset. DocSearch is one: it sets
          `border-box` on the modal subtree, and with the layer order corrected
          our `content-box` now outranks it and the modal overflows. The docs
          render `CssBaseline`, so render it here too.
        */}
        <CssBaseline />
        <PageContext.Provider value={pageContext}>
          {seeded ? <AppSearch sx={{ minWidth: { sm: 160 } }} /> : null}
        </PageContext.Provider>
      </BrandingProvider>
    </UserLanguageProvider>
  );
}
