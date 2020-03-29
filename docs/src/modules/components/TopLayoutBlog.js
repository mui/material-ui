import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import Link from '@material-ui/core/Link';
import useMarkdownDocs from 'docs/src/modules/components/useMarkdownDocs';
import { getHeaders, getTitle, getDescription } from 'docs/src/modules/utils/parseMarkdown';
import AppFooter from 'docs/src/modules/components/AppFooter';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  back: {
    display: 'block',
    marginBottom: theme.spacing(4),
  },
  container: {
    marginBottom: theme.spacing(20),
    maxWidth: 680 + theme.spacing(8 + 4),
    '& .markdownElement': {
      fontSize: 18,
      lineHeight: 1.7,
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(4),
      },
    },
    '& img': {
      display: 'block',
      margin: 'auto',
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
});

function TopLayoutBlog(props) {
  const {
    classes,
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  } = props;

  const markdownDocs = useMarkdownDocs({
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  });

  const headers = getHeaders(markdownDocs.markdown);

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdownDocs.markdown)} - Material-UI`}
        description={headers.description || getDescription(markdownDocs.markdown)}
      />
      <div className={classes.root}>
        <AppContainer className={classes.container}>
          <Link
            href="https://medium.com/material-ui"
            rel="nofollow"
            color="textSecondary"
            className={classes.back}
          >
            {'< Back to blog'}
          </Link>
          {markdownDocs.element}
        </AppContainer>
        <AppFooter />
      </div>
    </AppFrame>
  );
}

TopLayoutBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  markdown: PropTypes.string,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
  req: PropTypes.func,
  reqPrefix: PropTypes.string,
  reqSource: PropTypes.func,
};

export default withStyles(styles)(TopLayoutBlog);
