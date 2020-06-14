import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import Link from '@material-ui/core/Link';
import AppFooter from 'docs/src/modules/components/AppFooter';
import { exactProp } from '@material-ui/utils';
import MarkdownElement from './MarkdownElement';

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
    '& img, & video': {
      display: 'block',
      margin: 'auto',
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      '& a': {
        color: theme.palette.text.secondary,
        textDecoration: 'underline',
      },
    },
  },
});

function TopLayoutBlog(props) {
  const { classes, docs } = props;
  const { description, rendered, title } = docs.en;

  return (
    <AppFrame disableDrawer>
      <Head title={`${title} - Material-UI`} description={description} />
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
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <AppFooter />
      </div>
    </AppFrame>
  );
}

TopLayoutBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  TopLayoutBlog.propTypes = exactProp(TopLayoutBlog.propTypes);
}

export default withStyles(styles)(TopLayoutBlog);
