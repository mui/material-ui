// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import Demo from 'docs/src/components/Demo';

const styleSheet = createStyleSheet('MarkdownDocs', () => {
  return {
    root: {
      marginBottom: 100,
    },
  };
});

const headerRegexp = /---\n(.*)\n---/;
const demoRegexp = /^demo='(.*)'$/;
const emptyRegexp = /^\s*$/;

export default function MarkdownDocs(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const contents = props.route.content
    .replace(headerRegexp, '') // Remove header informations
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegexp.test(content)); // Remove empty lines

  return (
    <div className={classes.root}>
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
  }).isRequired,
};

MarkdownDocs.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
