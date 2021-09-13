import React from 'react';
import { DocSearch, DocSearchModal } from '@docsearch/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import '@docsearch/css';

export default function AppSearch() {
  const userLanguage = useUserLanguage();
  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;
  return (
    <React.Fragment>
      <GlobalStyles
        styles={(theme) => ({
          html: {
            ':root': {
              '--docsearch-primary-color': theme.palette.primary[500],
              '--docsearch-muted-color': 'rgba(0, 0, 0, 0.54)',
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
            },
            '.DocSearch-Container': {
              backgroundColor: 'rgba(32,38,45,0.2)',
              '& .DocSearch-Modal': {
                boxShadow: `0px 4px 20px ${
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.72)
                    : 'rgba(170, 180, 190, 0.3)'
                }`,
                borderRadius: 10,
                backgroundColor: theme.palette.background.paper,
                '& .DocSearch-SearchBar': {
                  borderBottom: '1px solid',
                  borderColor: theme.palette.grey[200],
                  paddingBottom: theme.spacing(1),
                  '& .DocSearch-Form': {
                    '& .DocSearch-Reset': {
                      display: 'none',
                    },
                    '& .DocSearch-Input': {
                      paddingLeft: theme.spacing(2.5),
                    },
                  },
                  '& .DocSearch-Cancel': {
                    alignSelf: 'center',
                    height: '1.5rem',
                    marginRight: theme.spacing(1),
                    padding: '.15rem .40rem',
                    fontSize: 0,
                    borderRadius: 7,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: theme.palette.grey[200],
                    '&::before': {
                      content: '"esc"',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    },
                  },
                },
              },
              '& .DocSearch-Dropdown': {
                '&::before': {
                  padding: `${theme.spacing(2)} ${theme.spacing(1.5)}`,
                  display: 'block',
                  content: '"Results:"',
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[300]
                      : theme.palette.grey[800],
                },
                '& .DocSearch-Hit a': {
                  border: '1px solid transparent',
                  borderBottomColor: theme.palette.grey[100],
                },
                [`& .DocSearch-Hit[aria-selected='true'] a`]: {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[600]
                      : theme.palette.primary[50],
                  borderRadius: 10,
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[100]
                      : theme.palette.primary[400],
                },
                '& .DocSearch-Hit-Container': {
                  padding: `${theme.spacing(4)} 0`,
                },
                '& .DocSearch-Hit-content-wrapper': {
                  paddingLeft: theme.spacing(2),
                  '& .DocSearch-Hit-title': {
                    color: `${theme.palette.text.primary} !important`,
                    padding: `${theme.spacing(0.5)} 0`,
                  },
                  '& .DocSearch-Hit-path': {
                    color: `rgba(0, 0, 0, 0.54) !important`,
                    padding: `${theme.spacing(0.5)} 0`,
                  },
                },
                '& .DocSearch-Hit-icon, & .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                  color: `${theme.palette.primary[500]} !important`,
                },
                '& .DocSearch-Hit-action': {
                  marginRight: theme.spacing(1),
                },
                '& .DocSearch-Hit-source': {
                  display: 'none',
                },
              },
              '& .DocSearch-Footer': {
                '& .DocSearch-Commands': {
                  display: 'none',
                },
              },
            },
          },
        })}
      />
      <DocSearchModal
        apiKey="1d8534f83b9b0cfea8f16498d19fbcab"
        indexName="material-ui"
        searchParameters={{
          facetFilters: ['version:next', facetFilterLanguage],
        }}
      />
    </React.Fragment>
  );
}
