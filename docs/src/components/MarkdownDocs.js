// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import Demo from 'docs/src/components/Demo';

const styleSheet = createStyleSheet({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

const headerRegexp = /---\n(.*)\n---/;
const demoRegexp = /^demo='(.*)'$/;
const emptyRegexp = /^\s*$/;

const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/v1-beta';

function MarkdownDocs(props) {
  const { classes, route } = props;
  const contents = route.content
    .replace(headerRegexp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegexp.test(content)); // Remove empty lines

  let markdownUrl = SOURCE_CODE_ROOT_URL;

  // Map back to the source code
  if (route.componentAPI) {
    markdownUrl += `/src${route.componentAPI.path
      .replace('./component-api/', '/')
      .replace('.md', '.js')}`;
  } else if (route.demo) {
    markdownUrl += `/docs/src/pages/component-demos${route.demo.path.replace('./', '/')}`;
  } else {
    markdownUrl += `/docs/src/pages${route.path}.md`;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button component="a" href={markdownUrl}>
          {'Edit this page'}
        </Button>
      </div>
      {contents.map(content => {
        if (demoRegexp.test(content)) {
          return <Demo key={content} demo={content.match(demoRegexp)[1]} />;
        }

        return <MarkdownElement key={content} text={content} />;
      })}
    </div>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.shape({
    content: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    componentAPI: PropTypes.object,
    demo: PropTypes.object,
  }).isRequired,
};

export default withStyles(styleSheet)(MarkdownDocs);
