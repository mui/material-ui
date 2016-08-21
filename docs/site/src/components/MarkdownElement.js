// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import marked from 'marked';

import prism from '../utils/prism';

const styleSheet = createStyleSheet('MarkdownElement', (theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
    '@raw table': {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
    },
    '@raw thead': {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    '@raw tbody': {
      fontSize: 13,
      color: theme.palette.text.primary,
    },
    '@raw td': {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: '0 56px 0 24px',
      '&:last-child': {
        paddingRight: 24,
      },
      '& compact': {
        paddingRight: 24,
      },
      textAlign: 'left',
    },
    '@raw td code': {
      fontSize: 13,
    },
    '@raw th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: '0 56px 0 24px',
      '&:last-child': {
        paddingRight: 24,
      },
      '& compact': {
        paddingRight: 24,
      },
      textAlign: 'left',
    },
    '@raw tr': {
      height: 48,
    },
    '@raw thead tr': {
      height: 64,
    },
  },
}));

class MarkdownElement extends Component {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps = {
    text: '',
  };

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code) {
        return prism.highlight(code, prism.languages.jsx);
      },
    });
  }

  render() {
    const {
      className,
      text,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    /* eslint-disable react/no-danger */
    return (
      <div
        className={classNames(classes.root, 'markdown-body', className)}
        dangerouslySetInnerHTML={{ __html: marked(text) }}
      />
    );
    /* eslint-enable */
  }
}

export default MarkdownElement;
