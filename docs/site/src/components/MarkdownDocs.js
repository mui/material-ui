// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';

const styleSheet = createStyleSheet('MarkdownDocs', (theme) => {
  return {
    content: {
      marginBottom: 100,
      '@raw pre': {
        margin: '25px 0',
        padding: '12px 18px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        '@raw code': {
          lineHeight: 1.6,
          padding: 0,
          fontSize: 14,
        },
      },
      '@raw code': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        padding: '3px 6px',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        fontSize: 14,
      },
    },
  };
});

const demoRegexp = /^demo='(.*)'$/;

export default class MarkdownDocs extends Component {

  static propTypes = {
    route: PropTypes.object,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  renderContent(content) {
    const contents = content.split(/(?:^{{)|(?:}}$)/gm);
    return contents.map((n, i) => {
      if (demoRegexp.test(n)) {
        return <Demo key={i} demo={n.match(demoRegexp)[1]} />;
      }
      return <MarkdownElement key={i} text={n} />;
    });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.content}>
        {this.renderContent(this.props.route.content)}
      </div>
    );
  }
}
