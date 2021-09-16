import * as React from 'react';
import { createPortal } from 'react-dom';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { alpha, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import SearchIcon from '@mui/icons-material/Search';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

function isAppleDevice() {
  if (typeof navigator !== 'undefined') {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  }
  return '';
}

const SearchButton = styled('button')(({ theme }) => {
  return {
    display: 'none',
    minHeight: 33,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 186,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : theme.palette.grey[50],
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
    },
    color: theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[600],
    fontSize: '1rem',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[700],
    lineHeight: '21px',
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[400] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#FFF',
    padding: theme.spacing(0, 0.7),
    right: theme.spacing(1),
    height: 23,
    top: 'calc(50% - 11px)',
    borderRadius: 5,
  };
});

export default function AppSearch() {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@3.0.0-alpha.40/dist/style.min.css',
    '#app-search',
  );
  const userLanguage = useUserLanguage();
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState(undefined);
  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;
  const macOS = isAppleDevice();

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = React.useCallback(
    (event) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <React.Fragment>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <SearchIcon
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.primary[500],
            mx: 1,
          }}
        />
        {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
        <React.Fragment>Search...</React.Fragment>
        <Shortcut sx={{ ml: 'auto' }}>
          {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
          {macOS ? '⌘' : 'Ctrl+'}K
        </Shortcut>
      </SearchButton>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            apiKey="1d8534f83b9b0cfea8f16498d19fbcab"
            indexName="material-ui"
            searchParameters={{
              facetFilters: ['version:master', facetFilterLanguage],
            }}
            placeholder="Search..."
            transformItems={(items) => {
              return items.map((item) => {
                const parseUrl = document.createElement('a');
                parseUrl.href = item.url;
                return {
                  ...item,
                  url: `${parseUrl.pathname}${parseUrl.hash}`,
                };
              });
            }}
            initialScrollY={typeof window !== 'undefined' ? window.scrollY : undefined}
            onClose={onClose}
          />,
          document.body,
        )}
      <GlobalStyles
        styles={(theme) => ({
          html: {
            ':root': {
              '--docsearch-primary-color':
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              '--docsearch-text-color': theme.palette.text.primary,
              '--docsearch-muted-color': theme.palette.grey[600],
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
              '--docsearch-hit-active-color':
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[300]
                  : theme.palette.primary[600],
              '--docsearch-logo-color': theme.palette.grey[600],
              '--docsearch-searchbox-focus-background': 'unset',
              '--docsearch-footer-background': 'unset',
              '--docsearch-modal-background': theme.palette.background.paper,
            },
          },
          body: {
            '.DocSearch-Container': {
              zIndex: theme.zIndex.tooltip + 100,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.grey[900], 0.7)
                  : alpha(theme.palette.grey[900], 0.2),
              backdropFilter: 'blur(2px)',
            },
            '& .DocSearch-Help': {
              fontSize: theme.typography.pxToRem(14),
              '& a': {
                color: 'var(--docsearch-highlight-color)',
              },
            },
            '& .DocSearch-Modal': {
              boxShadow: `0px 4px 20px ${
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.7)
                  : alpha(theme.palette.grey[700], 0.2)
              }`,
              ...(theme.palette.mode === 'dark' && {
                border: '1px solid',
                borderColor: theme.palette.primaryDark[700],
              }),
              borderRadius: theme.shape.borderRadius,
            },
            '& .DocSearch-SearchBar': {
              borderBottom: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[200],
              padding: theme.spacing(1),
            },
            '& .DocSearch-Form': {
              '& .DocSearch-Reset': {
                display: 'none',
              },
              '& .DocSearch-Input': {
                paddingLeft: theme.spacing(2.5),
              },
              '& .DocSearch-Search-Icon': {
                width: '20px',
                height: '20px',
              },
            },
            '& .DocSearch-Cancel': {
              display: 'block',
              alignSelf: 'center',
              height: '1.5rem',
              marginRight: theme.spacing(1),
              padding: theme.spacing(0.3, 0.8, 0.6, 0.8),
              fontSize: 0,
              borderRadius: 5,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[50],
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.grey[300],
              '&::before': {
                content: '"esc"',
                fontSize: theme.typography.pxToRem(13),
                fontWeight: 700,
                color: theme.palette.grey[600],
              },
            },
            '& .DocSearch-Dropdown': {
              '&::-webkit-scrollbar-thumb': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[900]
                    : theme.palette.background.paper,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[500],
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.paper,
              },
            },
            '& .DocSearch-Hit-source': {
              top: 'initial',
              paddingTop: theme.spacing(2),
              background: theme.palette.background.paper,
              fontSize: theme.typography.pxToRem(13),
              fontWeight: 500,
              color: theme.palette.text.secondary,
            },
            '& .DocSearch-Hit': {
              paddingBottom: 0,
              '&:not(:last-of-type)': {
                marginBottom: theme.spacing(0.5),
              },
            },
            '& .DocSearch-Hit a': {
              backgroundColor: 'transparent',
              padding: theme.spacing(1, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderBottomColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
            },
            '& .DocSearch-Hit-content-wrapper': {
              // padding: theme.spacing(0.5, 0),
              paddingLeft: theme.spacing(2),
              flexDirection: 'column-reverse',
            },
            '& .DocSearch-Hit-title': {
              fontSize: theme.typography.pxToRem(14),
              color: `${theme.palette.text.secondary}`,
            },
            '& .DocSearch-Hit-path': {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 700,
              color: `${theme.palette.text.primary}`,
            },
            '& .DocSearch-Hit-Select-Icon': {
              height: '15px',
              width: '15px',
            },
            '& .DocSearch-Hit[aria-selected="true"] a': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.primary[50],
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[400]
                  : theme.palette.primary[500],
              borderRadius: theme.shape.borderRadius,
            },
            '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
              color: `${
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[400]
                  : theme.palette.primary[600]
              }`,
            },
            '& .DocSearch-Footer': {
              borderTop: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[200],
              '& .DocSearch-Commands': {
                display: 'none',
              },
            },
          },
        })}
      />
    </React.Fragment>
  );
}
