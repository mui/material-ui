// @flow

import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import warning from 'warning';
import Head from 'next/head';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppContent from 'docs/src/modules/components/AppContent';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Demo from 'docs/src/modules/components/Demo';
import { getComponents, getContents, getTitle } from 'docs/src/modules/utils/parseMarkdown';

const styles = theme => ({
  '@global': {
    '#carbonads': {
      padding: theme.spacing.unit,
      boxSizing: 'content-box',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
        maxWidth: 130,
        float: 'right',
      },
      [theme.breakpoints.up('xl')]: {
        position: 'fixed',
        margin: 0,
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
      },
      '& img': {
        verticalAlign: 'middle',
      },
      '& a': {
        textDecoration: 'none',
      },
      '& .carbon-wrap': {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      '& .carbon-text': {
        ...theme.typography.body1,
        display: 'block',
        margin: `0 0 0 ${theme.spacing.unit}px`,
        [theme.breakpoints.up('sm')]: {
          margin: `${theme.spacing.unit}px 0`,
        },
      },
      '& .carbon-poweredby': {
        ...theme.typography.caption,
        display: 'block',
        marginTop: theme.spacing.unit / 2,
        position: 'absolute',
        right: 4,
        bottom: 4,
        [theme.breakpoints.up('sm')]: {
          marginTop: 0,
          position: 'static',
        },
      },
    },
  },
  root: {
    marginBottom: 100,
  },
  ad: {
    minHeight: 120,
    margin: `${theme.spacing.unit}px 0 0`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      minHeight: 0,
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

const demoRegexp = /^demo='(.*)'$/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/v1-beta';

function MarkdownDocs(props, context) {
  const { classes, demos, markdown, sourceLocation: sourceLocationProp } = props;
  const contents = getContents(markdown);
  const components = getComponents(markdown);

  let sourceLocation = sourceLocationProp || context.activePage.pathname;

  if (!sourceLocationProp) {
    // Hack for handling the nested demos
    if (sourceLocation.indexOf('/demos') === 0) {
      const token = sourceLocation.split('/');
      token.push(token[token.length - 1]);
      sourceLocation = token.join('/');
    }

    if (sourceLocation.indexOf('/api') === 0) {
      sourceLocation = `/pages/${sourceLocation}.md`;
    } else {
      sourceLocation = `/docs/src/pages${sourceLocation}.md`;
    }
  }

  return (
    <AppContent className={classes.root}>
      <Head>
        <title>{`${getTitle(markdown)} - Material-UI`}</title>
      </Head>
      <div className={classes.header}>
        <Button component="a" href={`${SOURCE_CODE_ROOT_URL}${sourceLocation}`}>
          {'Edit this page'}
        </Button>
      </div>
      <div className={classes.ad}>
        <script
          async
          src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=materialuicom"
          id="_carbonads_js"
        />
      </div>
      {contents.map(content => {
        const match = content.match(demoRegexp);

        if (match) {
          const name = match[1];
          warning(demos && demos[name], `Missing demo: ${name}.`);
          return <Demo key={content} name={name} js={demos[name].js} raw={demos[name].raw} />;
        }

        return <MarkdownElement key={content} text={content} />;
      })}
      {components.length > 0 ? (
        <MarkdownElement
          text={`
## API

${components
            .map(component => `- [&lt;${component} /&gt;](/api/${kebabCase(component)})`)
            .join('\n')}
            `}
        />
      ) : null}
    </AppContent>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  markdown: PropTypes.string.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  sourceLocation: PropTypes.string,
};

MarkdownDocs.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MarkdownDocs);
