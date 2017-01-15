// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import MarkdownElement from 'docs/site/src/components/MarkdownElement';
import Demo from './Demo';

const styleSheet = createStyleSheet('MarkdownDocs', () => {
  return {
    root: {
      marginBottom: 100,
    },
  };
});

const demoRegexp = /^demo='(.*)'$/;

export default function MarkdownDocs(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const contents = props.route.content.split(/(?:^{{)|(?:}}$)/gm);

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
  styleManager: PropTypes.object.isRequired,
};
