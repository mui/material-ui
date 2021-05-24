import * as React from 'react';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { DocSearch } from '@docsearch/react';
import '@docsearch/react/dist/style.css';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

const AppSearchRoot = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

export default function AppSearch() {
  const userLanguage = useUserLanguage();

  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;

  return (
    <AppSearchRoot>
      <GlobalStyles
        styles={(theme) => ({
          html: {
            '.DocSearch-SearchButton': {
              '--docsearch-searchbox-background': alpha(theme.palette.common.white, 0.15),
              '--docsearch-searchbox-focus-background': alpha(theme.palette.common.white, 0.25),
              '--docsearch-searchbox-shadow': 'none',
              '&:hover': {
                '& .DocSearch-Search-Icon': {
                  color: 'inherit',
                },
              },
              '.DocSearch-SearchButton-Placeholder': {
                opacity: 0.72,
              },
            },
            '.DocSearch-Container': {
              zIndex: theme.zIndex.appBar + 1,
              '.DocSearch-Modal': {
                display: 'flex',
              },
              '.DocSearch-SearchBar': {
                margin: theme.spacing(1.5),
                padding: 0,
              },
              '.DocSearch-Reset': {
                padding: 8,
                marginRight: 'calc(-1 * var(--docsearch-spacing))',
                '&:hover,:focus,:active': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              '.DocSearch-Footer': {
                boxShadow: 'none',
                margin: theme.spacing(1.5),
                background: theme.palette.grey[100],
                width: 'auto',
                borderRadius: 8,
              },
              '.DocSearch-Form': {
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: 0,
              },
              '.DocSearch-Input': {
                paddingLeft: 16,
              },
              '.DocSearch-Hit-source': {
                paddingTop: 0,
              },
            },
            ':root': {
              '--docsearch-primary-color': theme.palette.primary.main,
              '--docsearch-text-color': theme.palette.text.primary,
              '--docsearch-modal-background': theme.palette.background.paper,
              '--docsearch-container-background': theme.palette.action.active,
              '--docsearch-key-gradient': alpha(theme.palette.common.white, 0.4),
              '--docsearch-key-shadow': 'none',
              '--docsearch-hit-color': theme.palette.text.primary,
              '--docsearch-hit-shadow': 'none',
              '--docsearch-hit-background': theme.palette.background.paper,
              '--docsearch-footer-background': theme.palette.background.paper,
              '--docsearch-footer-shadow': '0 -4px 8px 0 rgba(0, 0, 0, 0.2)',
              '--docsearch-logo-color': theme.palette.primary.main,
              '--docsearch-muted-color': theme.palette.text.secondary,
            },
          },
        })}
      />
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
    </AppSearchRoot>
  );
}
