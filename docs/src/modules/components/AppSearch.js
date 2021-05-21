import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { alpha, useTheme } from '@material-ui/core/styles';
import { DocSearch } from '@docsearch/react';
import '@docsearch/react/dist/style.css';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      ':root': {
        '--docsearch-modal-height': 'calc(100vh - 100px)',
        '--docsearch-primary-color': theme.palette.primary.main,
        '--docsearch-text-color': theme.palette.text.primary,
        // '--docsearch-container-background': theme.palette.background.paper,
        '--docsearch-modal-background': theme.palette.background.paper,
        '--docsearch-searchbox-background': alpha(theme.palette.common.white, 0.15),
        '--docsearch-searchbox-focus-background': alpha(theme.palette.common.white, 0.25),
        '--docsearch-key-gradient': alpha(theme.palette.common.white, 0.4),
        '--docsearch-key-shadow': 'none',
        '--docsearch-hit-color': theme.palette.primary.main,
        '--docsearch-hit-shadow': theme.shadows[1],
        '--docsearch-hit-background': theme.palette.background.paper,
        '--docsearch-footer-background': theme.palette.background.paper,
        '--docsearch-footer-shadow': '0 -4px 8px 0 rgba(0, 0, 0, 0.2)',
        '--docsearch-logo-color': theme.palette.primary.main,
        '--docsearch-muted-color': 'rgb(127, 132, 151)',
        '.DocSearch-Form': {
          '--docsearch-searchbox-shadow': '0 0 0 2px rgba(0, 0, 0, 0.3)',
        },
      },
      '.DocSearch-Button': { margin: '0px', height: '39px' },
      '.DocSearch-Button-Placeholder': { width: '100%', textAlign: 'left' },
      '.DocSearch-SearchButton': { borderRadius: '2px' },
      '.DocSearch-Search-Icon': { width: '28px' },
      '.DocSearch-Container': {
        zIndex: theme.zIndex.appBar + 1,
        borderRadius: theme.shape.borderRadius,
        '& .DocSearch-Commands-Key': { paddingBottom: '1px' },
      },
    },
  }),
  { name: 'AppSearch' },
);

export default function AppSearch() {
  useStyles();
  const theme = useTheme();
  const userLanguage = useUserLanguage();

  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;

  return (
    <div style={{ display: desktop ? 'flex' : 'none' }}>
      <DocSearch
        apiKey="1d8534f83b9b0cfea8f16498d19fbcab"
        indexName="material-ui"
        transformItems={(items) => {
          return items.map((item) => {
            const a = document.createElement('a');
            a.href = item.url;
            return {
              ...item,
              url: `${a.pathname}${a.hash}`,
            };
          });
        }}
        searchParameters={{
          facetFilters: ['version:next', facetFilterLanguage],
        }}
      />
    </div>
  );
}
