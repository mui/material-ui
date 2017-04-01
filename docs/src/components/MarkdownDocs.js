// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import Demo from 'docs/src/components/Demo';

const styleSheet = createStyleSheet('MarkdownDocs', () => {
  return {
    root: {
      marginBottom: 100,
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  };
});

const headerRegexp = /---\n(.*)\n---/;
const demoRegexp = /^demo='(.*)'$/;
const emptyRegexp = /^\s*$/;

const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/next';

export default function MarkdownDocs(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const contents = props.route.content
    .replace(headerRegexp, '') // Remove header informations
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegexp.test(content)); // Remove empty lines

  let markdownUrl = SOURCE_CODE_ROOT_URL;

  // Map back to the source code
  if (props.route.componentAPI) {
    markdownUrl += `/src${
      props.route.componentAPI.path.replace('./component-api/', '/').replace('.md', '.js')
    }`;
  } else if (props.route.demo) {
    markdownUrl += `/docs/src/pages/component-demos${props.route.demo.path.replace('./', '/')}`;
  } else {
    markdownUrl += `/docs/src/pages${props.route.path}.md`;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button component="a" href={markdownUrl} target="_blank">
          {'Edit this page'}
        </Button>
      </div>
      {contents.map((content) => {
        if (demoRegexp.test(content)) {
          return <Demo key={content} demo={content.match(demoRegexp)[1]} />;
        }

        return <MarkdownElement key={content} text={content} />;
      })}
    </div>
  );
}

MarkdownDocs.propTypes = {
  route: PropTypes.shape({
    content: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    componentAPI: PropTypes.object,
    demo: PropTypes.object,
  }).isRequired,
};

MarkdownDocs.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
