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
import Head from 'docs/src/modules/components/Head';
import useMarkdownDocs from 'docs/src/modules/components/useMarkdownDocs';
import AppContent from 'docs/src/modules/components/AppContent';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import PageContext from 'docs/src/modules/components/PageContext';
import { getHeaders, getTitle, getDescription } from 'docs/src/modules/utils/parseMarkdown';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  header: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
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

  const markdownDocs = useMarkdownDocs({
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  });

  const headers = getHeaders(markdownDocs.markdown);

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, page => page.pathname === activePage.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdownDocs.markdown)} - Material-UI`}
        description={headers.description || getDescription(markdownDocs.markdown)}
      />
      {disableToc ? null : <AppTableOfContents contents={markdownDocs.contents} />}
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
      <AppContent disableAd={disableAd} disableToc={disableToc}>
        {!disableEdit ? (
          <div className={classes.header}>
            <EditPage markdownLocation={markdownDocs.location} />
          </div>
        ) : null}
        <div className={clsx({ [classes.markdownElementBlog]: blog })}>{markdownDocs.element}</div>
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
