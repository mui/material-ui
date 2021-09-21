import * as React from 'react';
import { createPortal } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import NextLink from 'next/link';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchIcon from '@mui/icons-material/Search';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import GlobalStyles from '@mui/material/GlobalStyles';
import { alpha, styled } from '@mui/material/styles';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';

const SearchButton = styled('button')(({ theme }) => {
  return {
    display: 'none',
    minHeight: 33,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 210,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : theme.palette.grey[50],
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
    },
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
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
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    // So that clicks target the input.
    // Makes the text non selectable but neither is the placeholder or adornment.
    pointerEvents: 'none',
    '&.Mui-focused': {
      opacity: 0,
    },
  };
});

const NewStartScreen = () => {
  const startScreenOptions = [
    {
      category: {
        name: 'Getting Started',
        icon: <ArticleOutlinedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Installation', href: '/getting-started/installation/' },
        { name: 'Usage', href: '/getting-started/usage/' },
        { name: 'Learn', href: '/getting-started/learn/' },
      ],
    },
    {
      category: {
        name: 'Popular Searches',
        icon: <ToggleOffOutlinedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Material Icons', href: '/components/material-icons/' },
        { name: 'Text Fields', href: '/components/text-fields/' },
        { name: 'Button', href: '/components/buttons' },
      ],
    },
    {
      category: {
        name: 'Customization',
        icon: <CreateOutlinedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'How To Customize', href: '/customization/how-to-customize/' },
        { name: 'Theming', href: '/customization/theming/' },
        { name: 'Default Theme', href: '/customization/default-theme/' },
      ],
    },
    {
      category: {
        name: 'System',
        icon: <BuildOutlinedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Basics', href: '/system/basics/' },
        { name: 'Properties', href: '/system/properties/' },
        { name: 'The sx prop', href: '/system/the-sx-prop/' },
      ],
    },
  ];
  return (
    <div className="DocSearch-NewStartScreen">
      {startScreenOptions.map(({ category, items }) => (
        <div key={category.name} className="DocSearch-NewStartScreenCategory">
          <div className="DocSearch-NewStartScreenTitle">
            {category.icon}
            {category.name}
          </div>
          {items.map(({ name, href }) => (
            <NextLink key={name} href={href}>
              <a href={href} className="DocSearch-NewStartScreenItem">
                {name}
                <KeyboardArrowRightRounded className="DocSearch-NewStartScreenItemIcon" />
              </a>
            </NextLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function AppSearch() {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@3.0.0-alpha.40/dist/style.min.css',
    '#app-search',
  );
  const FADE_DURATION = 120; // ms
  const userLanguage = useUserLanguage();
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState(undefined);
  const facetFilterLanguage =
    LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    const modal = document.querySelector('.DocSearch-Container');
    if (modal) {
      // fade out transition
      modal.style.opacity = 0;
      setTimeout(() => {
        setIsOpen(false);
      }, FADE_DURATION);
    }
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

  React.useEffect(() => {
    const addStartScreen = () => {
      const dropDown = document.querySelector('.DocSearch-Dropdown');
      const isExisting = document.querySelector('.DocSearch-NewStartScreen');
      if (dropDown && !isExisting) {
        dropDown.insertAdjacentHTML(
          'beforeend',
          ReactDOMServer.renderToStaticMarkup(<NewStartScreen />),
        );
      }
    };
    // add transition to Modal
    if (isOpen) {
      const modal = document.querySelector('.DocSearch-Container');
      const searchInput = document.querySelector('.DocSearch-Input');
      if (modal) {
        modal.style.opacity = 1;
        addStartScreen();
      }
      if (searchInput) {
        const handleInput = (e) => {
          const newStartScreen = document.querySelector('.DocSearch-NewStartScreen');
          if (newStartScreen) {
            newStartScreen.style.display = e.target.value !== '' ? 'none' : 'grid';
          }
        };
        searchInput.addEventListener('input', handleInput);
        return () => {
          searchInput.removeEventListener('input', handleInput);
        };
      }
    }
    return () => {};
  }, [isOpen]);

  return (
    <React.Fragment>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <SearchIcon
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.primary[500],
            ml: 0.5,
            mr: 1,
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
              transition: `opacity ${FADE_DURATION}ms`,
              opacity: 0,
              zIndex: theme.zIndex.tooltip + 100,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.grey[900], 0.7)
                  : alpha(theme.palette.grey[900], 0.2),
              backdropFilter: 'blur(2px)',
            },
            '& .DocSearch-StartScreen': {
              display: 'none',
            },
            '& .DocSearch-NewStartScreen': {
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing(2),
              padding: theme.spacing(2, 2, 4),
            },
            '& .DocSearch-NewStartScreenCategory': {
              display: 'flex',
              flexDirection: 'column',
            },
            '& .DocSearch-NewStartScreenTitle': {
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(2, 1),
              fontSize: theme.typography.pxToRem(13),
              color: theme.palette.text.secondary,
            },
            '& .DocSearch-NewStartScreenTitleIcon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              marginRight: theme.spacing(1),
              fontSize: theme.typography.pxToRem(18),
            },
            '& .DocSearch-NewStartScreenItem': {
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              padding: theme.spacing(0.5, 1),
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              '&:hover, &:focus': {
                '.DocSearch-NewStartScreenItemIcon': {
                  marginLeft: theme.spacing(1),
                },
              },
            },
            '& .DocSearch-NewStartScreenItemIcon': {
              marginLeft: theme.spacing(0.5),
              transition: 'margin 0.2s',
              fontSize: theme.typography.pxToRem(16),
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
              minHeight: 384, // = StartScreen height, to prevent layout shift when first char
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
