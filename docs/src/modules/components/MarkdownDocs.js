import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import PageContext from 'docs/src/modules/components/PageContext';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import Link from 'docs/src/modules/components/Link';
import { exactProp } from '@material-ui/utils';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import Demo from 'docs/src/modules/components/Demo';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';

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
      marginBottom: 198,
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
});

function MarkdownDocs(props) {
  const { classes, disableAd = false, disableToc = false, demos = {}, docs, requireDemo } = props;

  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const { description, location, rendered, title, toc } = docs[userLanguage] || docs.en;
  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, (page) => page.pathname === activePage?.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
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
            {rendered.map((renderedMarkdownOrDemo, index) => {
              if (typeof renderedMarkdownOrDemo === 'string') {
                const renderedMarkdown = renderedMarkdownOrDemo;
                return <MarkdownElement key={index} renderedMarkdown={renderedMarkdown} />;
              }

              const demoOptions = renderedMarkdownOrDemo;
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
                <React.Fragment key={index}>
                  <Demo
                    demo={{
                      raw: demo.raw,
                      js: requireDemo(demo.module).default,
                      rawTS: demo.rawTS,
                      tsx: demo.moduleTS ? requireDemo(demo.moduleTS).default : null,
                    }}
                    demoOptions={demoOptions}
                    githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
                  />
                </React.Fragment>
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
      </AdManager>
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  requireDemo: PropTypes.func,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default withStyles(styles)(MarkdownDocs);
