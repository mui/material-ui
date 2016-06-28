import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import MarkdownElement from './MarkdownElement';

export const styleSheet = createStyleSheet('MarkdownDocs', (theme) => {
  return {
    content: {
      '@raw pre': {
        margin: '25px 0',
        padding: '12px 18px',
        backgroundColor: '#fff',
        boxShadow: theme.shadows[4],
        borderRadius: 3,
        '@raw code': {
          padding: 0,
          fontSize: 14,
        },
      },
      '@raw code': {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        padding: '3px 6px',
        color: '#333',
        backgroundColor: '#fff',
      },
    },
  };
});

export default class MarkdownDocs extends Component {

  static propTypes = {
    route: PropTypes.object,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.content}>
        <MarkdownElement text={this.props.route.content} />
      </div>
    );
  }
}
