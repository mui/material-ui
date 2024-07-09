import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import GlobalStyles from '@mui/material/GlobalStyles';
import { alpha, styled } from '@mui/material/styles';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { LANGUAGES_SSR } from 'docs/config';
import { Link } from '@mui/docs/Link';
import { useTranslate, useUserLanguage } from '@mui/docs/i18n';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import PageContext from 'docs/src/modules/components/PageContext';

const SearchButton = styled('button')(({ theme }) => [
  {
    minHeight: 32,
    minWidth: 32,
    margin: 0,
    paddingLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    position: 'relative',
    backgroundColor: alpha(theme.palette.grey[50], 0.6),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    color: (theme.vars || theme).palette.text.secondary,
    border: `1px solid ${(theme.vars || theme).palette.grey[200]}`,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    boxShadow: `hsl(200, 0%, 100%) 0 1px 0 inset, ${alpha(theme.palette.grey[100], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
    '&:hover': {
      background: alpha(theme.palette.grey[100], 0.5),
      borderColor: (theme.vars || theme).palette.grey[300],
      boxShadow: 'none',
    },
    '&:focus-visible': {
      outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
      outlineOffset: '2px',
    },
  },
  theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
    borderColor: alpha(theme.palette.primaryDark[600], 0.4),
    boxShadow: `${alpha(theme.palette.primaryDark[600], 0.1)} 0 1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
    '&:hover': {
      background: (theme.vars || theme).palette.primaryDark[700],
      borderColor: (theme.vars || theme).palette.primaryDark[600],
      boxShadow: 'none',
    },
  }),
]);

const SearchLabel = styled('span')(({ theme }) => ({
  marginRight: 'auto',
  marginBottom: '1px', // optical alignment
  color: (theme.vars || theme).palette.text.tertiary,
  lineHeight: 1,
}));

const Shortcut = styled('kbd')(({ theme }) => {
  return {
    all: 'unset',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    lineHeight: '19px',
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${(theme.vars || theme).palette.grey[200]}`,
    backgroundColor: '#FFF',
    padding: theme.spacing(0, 0.5),
    borderRadius: 7,
    ...theme.applyDarkStyles({
      borderColor: (theme.vars || theme).palette.primaryDark[600],
      backgroundColor: (theme.vars || theme).palette.primaryDark[800],
    }),
  };
});

function NewStartScreen() {
  const startScreenOptions = [
    {
      category: {
        name: 'Material UI',
      },
      items: [
        {
          name: 'Installation',
          href: '/material-ui/getting-started/installation/',
          icon: <DownloadRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Components',
          href: '/material-ui/getting-started/supported-components/',
          icon: <SmartButtonRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Example projects',
          href: '/material-ui/getting-started/example-projects/',
          icon: <LibraryBooksRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Templates',
          href: '/material-ui/getting-started/templates/',
          icon: <CollectionsBookmarkRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'Base UI',
      },
      items: [
        {
          name: 'Installation',
          href: '/base-ui/getting-started/quickstart/',
          icon: <DownloadRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Components',
          href: '/base-ui/all-components/',
          icon: <SmartButtonRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Customization',
          href: '/base-ui/getting-started/customization/',
          icon: <DesignServicesRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Usage',
          href: '/base-ui/getting-started/usage/',
          icon: <DriveFileRenameOutlineRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'MUI X',
      },
      items: [
        {
          name: 'Overview',
          href: '/x/introduction/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Licensing',
          href: '/x/introduction/licensing/',
          icon: <CopyrightRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'What is new in MUI X',
          href: '/x/whats-new/',
          icon: <NewspaperRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'Joy UI',
      },
      items: [
        {
          name: 'Installation',
          href: '/joy-ui/getting-started/installation/',
          icon: <DownloadRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Templates',
          href: '/joy-ui/getting-started/templates/',
          icon: <CollectionsBookmarkRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Customization',
          href: '/joy-ui/customization/approaches/',
          icon: <DesignServicesRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'Toolpad',
      },
      items: [
        {
          name: 'Overview',
          href: '/toolpad/studio/getting-started/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Why Toolpad?',
          href: '/toolpad/studio/getting-started/why-toolpad/',
          icon: <ChecklistRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Example applications',
          href: '/toolpad/studio/examples/',
          icon: <LibraryBooksRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'MUI System',
      },
      items: [
        {
          name: 'Overview',
          href: '/system/getting-started/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Usage',
          href: '/system/getting-started/usage/',
          icon: (
            <IntegrationInstructionsRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />
          ),
        },
        {
          name: 'The sx prop',
          href: '/system/getting-started/the-sx-prop/',
          icon: <SettingsRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
  ];
  return (
    <div className="DocSearch-NewStartScreen">
      {startScreenOptions.map(({ category, items }) => (
        <div key={category.name} className="DocSearch-NewStartScreenCategory">
          <div className="DocSearch-NewStartScreenTitle">{category.name}</div>
          {items.map(({ name, icon, href }) => (
            <NextLink key={name} href={href} className="DocSearch-NewStartScreenItem">
              {icon}
              {name}
            </NextLink>
          ))}
        </div>
      ))}
    </div>
  );
}

const productNameProductId = {
  'material-ui': 'Material UI',
  'joy-ui': 'Joy UI',
  'base-ui': 'Base UI',
  x: 'MUI X',
  system: 'MUI System',
  toolpad: 'Toolpad',
  'toolpad-studio': 'Toolpad Studio',
  'toolpad-core': 'Toolpad Core',
  'docs-infra': 'Docs Infra',
};

export function convertProductIdToName(productInfo) {
  return (
    productNameProductId[productInfo.productId] ||
    productNameProductId[productInfo.productCategoryId]
  );
}

function getDisplayTag(hit) {
  if (hit.productId === undefined || hit.productCategoryId === undefined) {
    return null;
  }

  const productName = convertProductIdToName({
    productId: hit.productId,
    productCategoryId: hit.productCategoryId,
  });

  if (!productName) {
    console.error(
      `getDisplayTag missing mapping for productId: ${hit.productId}, pathname: ${hit.pathname}.`,
    );
  }

  return <Chip label={productName} size="small" variant="outlined" sx={{ mr: 1 }} />;
}

function DocSearchHit(props) {
  const { children, hit } = props;

  if (hit.pathname) {
    return (
      <Link
        href={hit.pathname}
        as={hit.as}
        sx={{ display: 'flex !important', '& .DocSearch-Hit-Container': { flex: 1, minWidth: 0 } }}
      >
        {children}
        {getDisplayTag(hit)}
      </Link>
    );
  }

  // DocSearch stores the old results in its cache
  // hit.pathname won't be defined for them.
  return <Link href={hit.url}>{children}</Link>;
}

DocSearchHit.propTypes = {
  children: PropTypes.node,
  hit: PropTypes.object.isRequired,
};

export default function AppSearch(props) {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@3.0.0-alpha.40/dist/style.min.css',
    '#app-search',
  );
  const FADE_DURATION = 120; // ms
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState(undefined);
  const facetFilterLanguage = LANGUAGES_SSR.includes(userLanguage)
    ? `language:${userLanguage}`
    : `language:en`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const router = useRouter();
  const pageContext = React.useContext(PageContext);

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
    }
    setIsOpen(false); // DO NOT call setIsOpen inside a timeout (it causes scroll issue).
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

  const optionalFilters = [];
  if (pageContext.productId !== 'null') {
    optionalFilters.push(`productId:${pageContext.productId}`);
  } else if (pageContext.productCategoryId !== 'null') {
    optionalFilters.push(`productCategoryId:${pageContext.productCategoryId}`);
  }

  return (
    <React.Fragment>
      <SearchButton
        ref={searchButtonRef}
        onClick={onOpen}
        aria-labelledby="app-search-label"
        {...props}
      >
        <SearchIcon color="primary" sx={{ fontSize: '1.125rem' }} />
        <SearchLabel id="app-search-label">{t('searchButton')}</SearchLabel>
        <Shortcut aria-hidden="true">
          {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
          {macOS ? '⌘' : 'Ctrl+'}K
        </Shortcut>
      </SearchButton>
      {isOpen &&
        ReactDOM.createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            appId="TZGZ85B9TB"
            apiKey="8177dfb3e2be72b241ffb8c5abafa899"
            indexName="material-ui"
            searchParameters={{
              facetFilters: ['version:master', facetFilterLanguage],
              optionalFilters,
              attributesToRetrieve: [
                // Copied from https://github.com/algolia/docsearch/blob/ce0c865cd8767e961ce3088b3155fc982d4c2e2e/packages/docsearch-react/src/DocSearchModal.tsx#L231
                'hierarchy.lvl0',
                'hierarchy.lvl1',
                'hierarchy.lvl2',
                'hierarchy.lvl3',
                'hierarchy.lvl4',
                'hierarchy.lvl5',
                'hierarchy.lvl6',
                'content',
                'type',
                'url',
                // Extra
                'productId',
                'productCategoryId',
              ],
              analyticsTags: [facetFilterLanguage, `product:${pageContext.productId}`],
              hitsPerPage: 40,
            }}
            placeholder={`${t('algoliaSearch')}`}
            transformItems={(items) => {
              return items.map((item) => {
                // `url` contains the domain
                // but we want to link to the current domain e.g. deploy-preview-1--material-ui.netlify.app
                const parseUrl = document.createElement('a');
                parseUrl.href = item.url;

                const { canonicalAs, canonicalPathname } = pathnameToLanguage(
                  `${parseUrl.pathname}${parseUrl.hash}`,
                );

                return {
                  ...item,
                  pathname: canonicalPathname,
                  as: canonicalAs,
                  userLanguage,
                };
              });
            }}
            hitComponent={DocSearchHit}
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
              '--docsearch-primary-color': (theme.vars || theme).palette.primary[600],
              '--docsearch-text-color': (theme.vars || theme).palette.text.primary,
              '--docsearch-muted-color': (theme.vars || theme).palette.grey[600],
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
              '--docsearch-hit-active-color': (theme.vars || theme).palette.primary[600],
              '--docsearch-logo-color': (theme.vars || theme).palette.grey[600],
              '--docsearch-searchbox-focus-background': 'unset',
              '--docsearch-footer-background': 'unset',
              '--docsearch-modal-background': (theme.vars || theme).palette.background.paper,
            },
          },
          body: {
            '.DocSearch-Container': {
              transition: `opacity ${FADE_DURATION}ms`,
              opacity: 0,
              zIndex: theme.zIndex.tooltip + 100,
              backgroundColor: alpha(theme.palette.grey[700], 0.5),
              backdropFilter: 'blur(2px)',
            },
            '& .DocSearch-StartScreen': {
              display: 'none',
            },
            '& .DocSearch-NewStartScreen': {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing(2),
              paddingBottom: theme.spacing(2),
            },
            '& .DocSearch-NewStartScreenCategory': {
              display: 'flex',
              flexDirection: 'column',
            },
            '& .DocSearch-NewStartScreenTitle': {
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(2, 3, 1.5, 2),
              fontSize: theme.typography.pxToRem(11),
              fontWeight: theme.typography.fontWeightBold,
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '& .DocSearch-NewStartScreenTitleIcon': {
              fontSize: theme.typography.pxToRem(18),
              color: (theme.vars || theme).palette.primary[500],
              marginRight: theme.spacing(1.5),
              opacity: 0.6,
              // Redefine SvgIcon-root style as ReactDOMServer.renderToStaticMarkup doesn't
              // Generate the CSS.
              // TODO v6: This hack should no longer be needed with static CSS rendering.
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              flexShrink: 0,
              fill: 'currentColor',
            },
            '& .DocSearch-NewStartScreenItem': {
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              height: '42px',
              color: (theme.vars || theme).palette.primary[600],
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightMedium,
              padding: theme.spacing(0.25, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.grey[50], 0.4),
              borderColor: alpha(theme.palette.grey[100], 0.5),
              marginBottom: theme.spacing(1),
              '&:hover, &:focus': {
                backgroundColor: (theme.vars || theme).palette.primary[50],
                borderColor: (theme.vars || theme).palette.primary[300],
              },
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: (theme.vars || theme).palette.primary[200],
                outlineOffset: 0,
              },
            },
            '& .DocSearch-Modal': {
              // docsearch.css: <= 750px will be full screen modal
              maxWidth: '640px',
              boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.2)}`,
              borderRadius: theme.shape.borderRadius,
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[300],
            },
            '& .DocSearch-SearchBar': {
              borderBottom: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              padding: theme.spacing(0.5, 1),
            },
            '& .DocSearch-Form': {
              '& .DocSearch-Reset': {
                display: 'none',
              },
              '& .DocSearch-Input': {
                paddingLeft: theme.spacing(2),
                fontSize: theme.typography.pxToRem(16),
                fontWeight: theme.typography.fontWeightMedium,
              },
              '& .DocSearch-Search-Icon': {
                width: '18px',
                height: '18px',
              },
              '& .DocSearch-VisuallyHiddenForAccessibility': {
                width: 0,
                visibility: 'hidden',
              },
            },
            '& .DocSearch-Cancel': {
              display: 'block',
              alignSelf: 'center',
              cursor: 'pointer',
              height: '1.5rem',
              marginRight: theme.spacing(1),
              padding: theme.spacing(0.3, 0.8, 0.6, 0.8),
              fontSize: 0,
              borderRadius: 6,
              backgroundColor: (theme.vars || theme).palette.grey[50],
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              '&::before': {
                content: '"esc"',
                fontFamily: theme.typography.fontFamilyCode,
                fontSize: theme.typography.pxToRem(12),
                fontWeight: theme.typography.fontWeightBold,
                color: (theme.vars || theme).palette.text.secondary,
              },
            },
            '& .DocSearch-Dropdown': {
              minHeight: 384, // = StartScreen height, to prevent layout shift when first char
              '&::-webkit-scrollbar-thumb': {
                borderColor: (theme.vars || theme).palette.background.paper,
                backgroundColor: (theme.vars || theme).palette.grey[500],
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: (theme.vars || theme).palette.background.paper,
              },
              '* ul': {
                marginTop: theme.spacing(1),
              },
            },
            '& .DocSearch-Dropdown-Container': {
              '& .DocSearch-Hits:first-of-type': {
                '& .DocSearch-Hit-source': {
                  paddingTop: theme.spacing(2.5),
                  paddingBottom: theme.spacing(0.5),
                },
              },
            },
            '& .DocSearch-Hit-source': {
              top: 'initial',
              padding: theme.spacing(1.5, 3, 1.5, 3),
              background: 'transparent',
              fontSize: theme.typography.pxToRem(11),
              fontWeight: theme.typography.fontWeightBold,
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: '.1rem',
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '& .DocSearch-Hit': {
              paddingBottom: 8,
              '&:not(:first-of-type)': {
                marginTop: -1,
              },
              '& .DocSearch-Hit-Container': {
                height: '52px',
              },
            },
            '& .DocSearch-Hit a': {
              padding: theme.spacing(0.25, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.grey[50], 0.4),
              borderColor: alpha(theme.palette.grey[100], 0.5),
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: (theme.vars || theme).palette.primary[200],
                outlineOffset: 0,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                borderColor: (theme.vars || theme).palette.primary[300],
              },
            },
            '& .DocSearch-Hit-content-wrapper': {
              paddingLeft: theme.spacing(1),
            },
            '& .DocSearch-Hit-title': {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightMedium,
              color: (theme.vars || theme).palette.text.primary,
            },
            '& .DocSearch-Hit-path': {
              fontSize: theme.typography.pxToRem(12),
              color: (theme.vars || theme).palette.text.secondary,
            },
            '& .DocSearch-Hit-icon': {
              '> svg': {
                height: '16px',
                width: '16px',
                margin: 0,
              },
            },
            '& .DocSearch-Hit-Select-Icon': {
              height: '14px',
              width: '14px',
            },
            '& .DocSearch-Hit[aria-selected="true"] a': {
              backgroundColor: (theme.vars || theme).palette.primary[50],
              borderColor: (theme.vars || theme).palette.primary[300],
            },
            '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
              color: (theme.vars || theme).palette.primary[500],
              '& .DocSearch-Hit-action-button': {
                display: 'flex',
                width: '24px',
                borderRadius: '6px',
                border: '1px solid transparent',
                '> svg': {
                  margin: 0,
                },
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                  borderColor: (theme.vars || theme).palette.primary[300],
                },
              },
            },
            '& .DocSearch-Footer': {
              borderTop: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              '& .DocSearch-Commands': {
                display: 'none',
              },
            },
          },
        })}
      />
      <GlobalStyles
        styles={(theme) => [
          {
            [theme.vars ? '[data-mui-color-scheme="dark"]:root' : '.mode-dark']: {
              '--docsearch-primary-color': (theme.vars || theme).palette.primaryDark[300],
              '--docsearch-hit-active-color': (theme.vars || theme).palette.primary[300],
            },
          },
          {
            [theme.vars ? '[data-mui-color-scheme="dark"] body' : '.mode-dark']: {
              '.DocSearch-Container': {
                backgroundColor: alpha(theme.palette.grey[900], 0.6),
              },
              '& .DocSearch-NewStartScreenTitleIcon': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .DocSearch-NewStartScreenItem': {
                color: (theme.vars || theme).palette.primary[300],
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.5),
                borderColor: alpha(theme.palette.primaryDark[700], 0.8),
                '&:hover, &:focus': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                  borderColor: alpha(theme.palette.primary[700], 0.6),
                },
                '&:focus-visible': {
                  outlineColor: (theme.vars || theme).palette.primary[700],
                },
              },
              '& .DocSearch-Modal': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[900],
                boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
              '& .DocSearch-SearchBar': {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
              '& .DocSearch-Cancel': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[800],
                borderColor: (theme.vars || theme).palette.primaryDark[600],
              },
              '& .DocSearch-Dropdown': {
                '&::-webkit-scrollbar-thumb': {
                  borderColor: (theme.vars || theme).palette.primaryDark[900],
                  backgroundColor: (theme.vars || theme).palette.primaryDark[100],
                },
              },
              '& .DocSearch-Hit a': {
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.5),
                borderColor: alpha(theme.palette.primaryDark[700], 0.8),
                '&:focus-visible': {
                  outlineColor: alpha(theme.palette.primary[400], 0.5),
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                  borderColor: alpha(theme.palette.primary[700], 0.6),
                },
              },
              '& .DocSearch-Hit[aria-selected="true"] a': {
                color: (theme.vars || theme).palette.primary[300],
                backgroundColor: alpha(theme.palette.primary[900], 0.4),
                borderColor: alpha(theme.palette.primary[700], 0.6),
              },
              '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                color: (theme.vars || theme).palette.primary[400],
                '& .DocSearch-Hit-action-button': {
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.8),
                    borderColor: alpha(theme.palette.primary[700], 0.8),
                  },
                },
              },
              '& .DocSearch-Footer': {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
            },
          },
        ]}
      />
    </React.Fragment>
  );
}
