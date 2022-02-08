import * as React from 'react';
import { createPortal } from 'react-dom';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchIcon from '@mui/icons-material/Search';
import GlobalStyles from '@mui/material/GlobalStyles';
import { alpha, styled } from '@mui/material/styles';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import Link from 'docs/src/modules/components/Link';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import { useRouter } from 'next/router';
import replaceUrl from 'docs/src/modules/utils/replaceUrl';

const SearchButton = styled('button')(({ theme }) => {
  return {
    minHeight: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      minWidth: 34,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : theme.palette.grey[50],
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    '&:hover': {
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.primaryDark[700], 0.4)
          : alpha(theme.palette.grey[100], 0.7),
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.grey[300],
    },
  };
});

const SearchLabel = styled('span')(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    marginRight: 'auto',
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '20px',
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : '#FFF',
    padding: theme.spacing(0, 0.8),
    borderRadius: 5,
  };
});

const NewStartScreen = () => {
  const startScreenOptions = [
    {
      category: {
        name: 'Getting started',
        icon: <ArticleRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Installation', href: '/getting-started/installation/' },
        { name: 'Usage', href: '/getting-started/usage/' },
        { name: 'Learn', href: '/getting-started/learn/' },
      ],
    },
    {
      category: {
        name: 'Popular searches',
        icon: <ToggleOffRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Material Icons', href: '/components/material-icons/' },
        { name: 'Text Fields', href: '/components/text-fields/' },
        { name: 'Button', href: '/components/buttons/' },
      ],
    },
    {
      category: {
        name: 'Customization',
        icon: <EditRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
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
        icon: <HandymanRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
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

function DocSearcHit(props) {
  const { children, hit } = props;

  if (hit.pathname) {
    return (
      <Link href={hit.pathname} as={hit.as}>
        {children}
      </Link>
    );
  }

  // DocSearch stores the old results in its cache
  // hit.pathname won't be defined for them.
  return <Link href={hit.url}>{children}</Link>;
}

DocSearcHit.propTypes = {
  children: PropTypes.node,
  hit: PropTypes.object.isRequired,
};

export default function AppSearch() {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@3.0.0-alpha.40/dist/style.min.css',
    '#app-search',
  );
  const FADE_DURATION = 100; // ms
  const t = useTranslate();
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
  const router = useRouter();
  const keyboardNavigator = {
    navigate({ item }) {
      const as = item.userLanguage !== 'en' ? `/${item.userLanguage}${item.as}` : item.as;
      router.push(item.pathname, as);
    },
  };

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
        const handleInput = (event) => {
          const newStartScreen = document.querySelector('.DocSearch-NewStartScreen');
          if (newStartScreen) {
            newStartScreen.style.display = event.target.value !== '' ? 'none' : 'grid';
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

  const search = `${t('algoliaSearch')}…`;

  return (
    <React.Fragment>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <SearchIcon
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[500],
          }}
        />
        <SearchLabel>{search}</SearchLabel>
        <Shortcut>
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
            placeholder={search}
            transformItems={(items) => {
              return items.map((item) => {
                // `url` contains the domain
                // but we want to link to the current domain e.g. deploy-preview-1--material-ui.netlify.app
                const parseUrl = document.createElement('a');
                parseUrl.href = item.url;

                let hash = parseUrl.hash;
                let pathname = parseUrl.pathname;

                if (['lvl2', 'lvl3'].includes(item.type)) {
                  // remove '#heading-' from `href` url so that the link targets <span class="anchor-link"> inside <h2> or <h3>
                  // this will make the title appear under the Header
                  hash = hash.replace('#heading-', '#');
                }

                // TODO: remove this logic once the migration to new structure is done.
                // This logic covers us during the ~60 minutes that it takes Algolia to run a crawl and update its index.
                // It also allows us to have a search bar that works in dev mode while the new structure is not pushed to production.
                pathname = replaceUrl(pathname, router.asPath);

                const { canonicalAs, canonicalPathname } = pathnameToLanguage(`${pathname}${hash}`);

                return {
                  ...item,
                  pathname: canonicalPathname,
                  as: canonicalAs,
                  userLanguage,
                };
              });
            }}
            hitComponent={DocSearcHit}
            initialScrollY={typeof window !== 'undefined' ? window.scrollY : undefined}
            onClose={onClose}
            navigator={keyboardNavigator}
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
                  : alpha(theme.palette.grey[600], 0.2),
              backdropFilter: 'blur(4px)',
            },
            '& .DocSearch-StartScreen': {
              display: 'none',
            },
            '& .DocSearch-NewStartScreen': {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing(2),
              padding: theme.spacing(2, 1),
            },
            '& .DocSearch-NewStartScreenCategory': {
              display: 'flex',
              flexDirection: 'column',
            },
            '& .DocSearch-NewStartScreenTitle': {
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(1, 1),
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.text.secondary,
            },
            '& .DocSearch-NewStartScreenTitleIcon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              marginRight: theme.spacing(1.5),
              fontSize: theme.typography.pxToRem(16),
            },
            '& .DocSearch-NewStartScreenItem': {
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              padding: theme.spacing(0.5, 4.6),
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
              maxWidth: '700px',
              boxShadow: `0px 4px 20px ${
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.7)
                  : alpha(theme.palette.grey[700], 0.2)
              }`,
              ...(theme.palette.mode === 'dark' && {
                border: '1px solid',
                borderColor: theme.palette.primaryDark[700],
              }),
              // docsearch.css: <= 750px will be full screen modal
              borderRadius: `clamp(0px, (100vw - 750px) * 9999, ${theme.shape.borderRadius}px)`,
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
                fontSize: theme.typography.pxToRem(12),
                letterSpacing: '.08rem',
                fontWeight: 700,
                color: theme.palette.text.secondary,
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
            '& .DocSearch-Dropdown-Container': {
              '& .DocSearch-Hits:first-of-type': {
                '& .DocSearch-Hit-source': {
                  paddingTop: theme.spacing(1),
                },
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
              '&:not(:first-of-type)': {
                marginTop: -1,
              },
            },
            '& .DocSearch-Hit a': {
              backgroundColor: 'transparent',
              padding: theme.spacing(0.25, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderBottomColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
            },
            '& .DocSearch-Hit-content-wrapper': {
              paddingLeft: theme.spacing(2),
            },
            '& .DocSearch-Hit-title': {
              fontSize: theme.typography.pxToRem(14),
              color: `${theme.palette.text.primary}`,
            },
            '& .DocSearch-Hit-path': {
              fontSize: theme.typography.pxToRem(12),
              color: `${theme.palette.text.secondary}`,
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
                  : theme.palette.primary[500]
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
