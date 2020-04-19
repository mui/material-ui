import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import PageContext from 'docs/src/modules/components/PageContext';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import Link from 'docs/src/modules/components/Link';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import Demo from 'docs/src/modules/components/Demo';
import AppTableOfContents from './AppTableOfContents.new';

function flattenPages(pages, current = []) {
  return pages.reduce((items, item) => {
    if (item.children && item.children.length > 1) {
      items = flattenPages(item.children, items);
    } else {
      items.push(item.children && item.children.length === 1 ? item.children[0] : item);
    }
    return items;
  }, current);
}

// To replace with .findIndex() once we stop IE 11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ad: {
    '& .description': {
      marginBottom: 196,
    },
    '& .description.ad': {
      marginBottom: 40,
    },
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 175px - 240px)',
    },
  },
  footer: {
    marginTop: theme.spacing(12),
  },
  pagination: {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageLinkButton: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  },
  markdownElement: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    '& .anchor-link': {
      marginTop: -96, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre': {
      margin: theme.spacing(3, 0),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
      direction: 'ltr',
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      maxWidth: 'calc(100vw - 32px)',
      [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },
    '& code': {
      lineHeight: 1.4,
      display: 'inline-block',
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      WebkitFontSmoothing: 'subpixel-antialiased',
      padding: '0 3px',
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.type === 'light' ? 'rgba(255, 229, 100, 0.2)' : 'rgba(255, 229, 100, 0.2)',
      fontSize: 14,
      borderRadius: 2,
    },
    '& code[class*="language-"]': {
      backgroundColor: '#272c34',
      color: '#fff',
      // Avoid layout jump after hydration (style injected by prism)
      lineHeight: 1.5,
    },
    '& p code, & ul code, & pre code': {
      fontSize: 14,
    },
    '& .token.operator': {
      background: 'transparent',
    },
    '& h1': {
      ...theme.typography.h3,
      fontSize: 40,
      margin: '16px 0',
    },
    '& .description': {
      ...theme.typography.h5,
      margin: '0 0 40px',
    },
    '& h2': {
      ...theme.typography.h4,
      fontSize: 30,
      margin: '40px 0 16px',
    },
    '& h3': {
      ...theme.typography.h5,
      margin: '40px 0 16px',
    },
    '& h4': {
      ...theme.typography.h6,
      margin: '32px 0 16px',
    },
    '& h5': {
      ...theme.typography.subtitle2,
      margin: '32px 0 16px',
    },
    '& p, & ul, & ol': {
      marginTop: 0,
      marginBottom: 16,
    },
    '& ul': {
      paddingLeft: 30,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },
      '& .anchor-link-style': {
        // To prevent the link to get the focus.
        display: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        padding: '0 8px',
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
        '& svg': {
          width: '0.7em',
          height: '0.7em',
          fill: 'currentColor',
        },
      },
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      borderCollapse: 'collapse',
      marginBottom: '16px',
      borderSpacing: 0,
      overflow: 'hidden',
      '& .prop-name': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
      '& .required': {
        color: theme.palette.type === 'light' ? '#006500' : '#a5ffa5',
      },
      '& .prop-type': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.type === 'light' ? '#932981' : '#ffb6ec',
      },
      '& .prop-default': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.divider}`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
      color: theme.palette.text.primary,
    },
    '& td code': {
      fontSize: 13,
      lineHeight: 1.6,
    },
    '& th': {
      fontSize: 14,
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
    },
    '& blockquote': {
      borderLeft: '5px solid #ffe564',
      backgroundColor: 'rgba(255,229,100,0.2)',
      padding: '4px 24px',
      margin: '24px 0',
      '& p': {
        marginTop: '16px',
      },
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& img, video': {
      maxWidth: '100%',
    },
    '& hr': {
      height: 1,
      margin: theme.spacing(6, 0),
      border: 'none',
      flexShrink: 0,
      backgroundColor: theme.palette.divider,
    },
  },
});

function MarkdownDocs(props) {
  const { classes, disableAd = false, disableToc = false, demos, docs, requireDemo } = props;

  const t = useSelector((state) => state.options.t);

  const userLanguage = useSelector((state) => state.options.userLanguage);
  const { description, location, rendered, title, toc } = docs[userLanguage];

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, (page) => page.pathname === activePage.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  return (
    <AppFrame>
      <Head title={`${title} - Material-UI`} description={description} />
      {disableAd ? null : (
        <Portal
          container={() => {
            const container = document.querySelector('.description');
            container.classList.add('ad');
            return container;
          }}
        >
          <Ad />
        </Portal>
      )}
      <div
        className={clsx(classes.root, {
          [classes.ad]: !disableAd,
          [classes.toc]: !disableToc,
        })}
      >
        <AppContainer className={classes.container}>
          <div className={classes.actions}>
            <EditPage markdownLocation={location} />
          </div>
          <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
            <symbol id="anchor-link-icon" viewBox="0 0 16 16">
              <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
            </symbol>
          </svg>
          {rendered.map((someUnnamedVariable, index) => {
            if (typeof someUnnamedVariable === 'string') {
              const renderedMarkdown = someUnnamedVariable;
              return (
                <div
                  key={index}
                  className={clsx(classes.markdownElement, 'markdown-body', 'markdownElement')}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
                />
              );
            }

            const demoOptions = someUnnamedVariable;
            const name = demoOptions.demo;
            const demo = demos?.[name];
            if (demo === undefined) {
              const errorMessage = [
                `Missing demo: ${name}. You can use one of the following:`,
                Object.keys(demos),
              ].join('\n');

              if (userLanguage === 'en') {
                throw new Error(errorMessage);
              }

              if (process.env.NODE_ENV !== 'production') {
                console.error(errorMessage);
              }

              const warnIcon = (
                <span role="img" aria-label={t('emojiWarning')}>
                  ⚠️
                </span>
              );
              return (
                <div key={index}>
                  {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                  {warnIcon} Missing demo `{name}` {warnIcon}
                </div>
              );
            }

            return (
              <Demo
                key={index}
                demo={{
                  raw: demo.raw,
                  js: requireDemo(demo.module).default,
                  rawTS: demo.rawTS,
                  tsx: requireDemo(demo.moduleTS).default,
                }}
                demoOptions={demoOptions}
                githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
              />
            );
          })}
          <footer className={classes.footer}>
            {!currentPage ||
            currentPage.displayNav === false ||
            (nextPage.displayNav === false && !prevPage) ? null : (
              <React.Fragment>
                <Divider />
                <div className={classes.pagination}>
                  {prevPage ? (
                    <Button
                      component={Link}
                      naked
                      href={prevPage.pathname}
                      size="large"
                      className={classes.pageLinkButton}
                      startIcon={<ChevronLeftIcon />}
                    >
                      {pageToTitleI18n(prevPage, t)}
                    </Button>
                  ) : (
                    <div />
                  )}
                  {nextPage.displayNav === false ? null : (
                    <Button
                      component={Link}
                      naked
                      href={nextPage.pathname}
                      size="large"
                      className={classes.pageLinkButton}
                      endIcon={<ChevronRightIcon />}
                    >
                      {pageToTitleI18n(nextPage, t)}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </footer>
        </AppContainer>
      </div>
      {disableToc ? null : <AppTableOfContents items={toc} />}
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  requireDemo: PropTypes.func.isRequired,
};

export default withStyles(styles)(MarkdownDocs);
