import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import useMarkdownDocsContents from 'docs/src/modules/components/useMarkdownDocsContents';
import PageContext from 'docs/src/modules/components/PageContext';
import {
  getHeaders,
  getTitle,
  getDescription,
  demoRegexp,
} from 'docs/src/modules/utils/parseMarkdown';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  header: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
  markdownElementBlog: {
    maxWidth: 700,
    margin: 'auto',
    padding: 0,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: `Roboto Slab, ${theme.typography.fontFamily}`,
    fontWeight: 300,
    '& p, & ul, & ol': {
      lineHeight: 1.7,
    },
    '& strong': {
      fontWeight: 400,
      fontFamily: theme.typography.fontFamily,
    },
    '& img': {
      display: 'block',
      margin: 'auto',
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
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

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master/docs/src';

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

function MarkdownDocs(props) {
  const {
    blog,
    classes,
    disableAd = false,
    disableEdit,
    disableToc = false,
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  } = props;

  const t = useSelector(state => state.options.t);
  const userLanguage = useSelector(state => state.options.userLanguage);

  let demos;
  let markdown = markdownProp;

  if (req) {
    demos = {};
    const markdowns = {};
    req.keys().forEach(filename => {
      if (filename.indexOf('.md') !== -1) {
        const match = filename.match(/-([a-z]{2})\.md$/);

        if (match && LANGUAGES_IN_PROGRESS.indexOf(match[1]) !== -1) {
          markdowns[match[1]] = req(filename);
        } else {
          markdowns.en = req(filename);
        }
      } else if (filename.indexOf('.tsx') !== -1) {
        const demoName = `${reqPrefix}/${filename.replace(/\.\//g, '').replace(/\.tsx/g, '.js')}`;

        demos[demoName] = {
          ...demos[demoName],
          tsx: req(filename).default,
          rawTS: reqSource(filename),
        };
      } else {
        const demoName = `${reqPrefix}/${filename.replace(/\.\//g, '')}`;

        demos[demoName] = {
          ...demos[demoName],
          js: req(filename).default,
          raw: reqSource(filename),
        };
      }
    });
    markdown = markdowns[userLanguage] || markdowns.en;
  }

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, page => page.pathname === activePage.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  const headers = getHeaders(markdown);
  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_UNIQUE__ = {};

  const { contents, markdownLocation } = useMarkdownDocsContents({
    markdown,
    markdownLocationProp,
  });

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdown)} - Material-UI`}
        description={headers.description || getDescription(markdown)}
      />
      {disableToc ? null : <AppTableOfContents contents={contents} />}
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
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
      <AppContent disableAd={disableAd} disableToc={disableToc}>
        {!disableEdit ? (
          <div className={classes.header}>
            <EditPage
              markdownLocation={markdownLocation}
              sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
            />
          </div>
        ) : null}
        {contents.map((content, index) => {
          if (demos && demoRegexp.test(content)) {
            let demoOptions;
            try {
              demoOptions = JSON.parse(`{${content}}`);
            } catch (err) {
              console.error('JSON.parse fails with: ', `{${content}}`);
              console.error(err);
              return null;
            }

            const name = demoOptions.demo;
            if (!demos || !demos[name]) {
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
                <div key={content}>
                  {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                  {warnIcon} Missing demo `{name}` {warnIcon}
                </div>
              );
            }

            return (
              <Demo
                key={content}
                demo={demos[name]}
                demoOptions={demoOptions}
                githubLocation={`${SOURCE_CODE_ROOT_URL}/${name}`}
              />
            );
          }

          return (
            <MarkdownElement
              className={clsx(classes.markdownElement, { [classes.markdownElementBlog]: blog })}
              key={index}
              text={content}
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
      </AppContent>
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  blog: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  disableEdit: PropTypes.bool,
  disableToc: PropTypes.bool,
  markdown: PropTypes.string,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
  req: PropTypes.func,
  reqPrefix: PropTypes.string,
  reqSource: PropTypes.func,
};

export default withStyles(styles)(MarkdownDocs);
