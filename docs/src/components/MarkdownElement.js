// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import marked from 'marked';
import customPropTypes from 'material-ui/utils/customPropTypes';
import prism from 'docs/src/utils/prism';

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
    <h${level}>
      <a class="anchor-link" id="${escapedText}"></a>${
      text
      }<a class="anchor-link-style" href="#${escapedText}">${
        '#'
      }</a>
    </h${level}>
  `;
};

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
  renderer,
});

const anchorLinkStyle = (theme) => ({
  '& .anchor-link-style': {
    display: 'none',
  },
  '&:hover .anchor-link-style': {
    display: 'inline',
    fontSize: '0.8em',
    lineHeight: '1',
    paddingLeft: theme.spacing.unit,
    color: theme.palette.text.hint,
  },
});

const styleSheet = createStyleSheet('MarkdownElement', (theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: '0 10px',
    '& .anchor-link': {
      marginTop: -theme.spacing.unit * 12, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre': {
      margin: '25px 0',
      padding: '12px 18px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 3,
      overflow: 'auto',
    },
    '& code': {
      display: 'inline-block',
      lineHeight: 1.6,
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      padding: '3px 6px',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      fontSize: 14,
    },
    '& h1': {
      ...theme.typography.display2,
      color: theme.palette.text.secondary,
      margin: '0.7em 0',
      ...anchorLinkStyle(theme),
    },
    '& h2': {
      ...theme.typography.display1,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
      ...anchorLinkStyle(theme),
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
      ...anchorLinkStyle(theme),
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& p code, & ul code': {
      fontSize: 14,
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
    },
    '& thead': {
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& tbody': {
      fontSize: 13,
      lineHeight: 1.5,
      color: theme.palette.text.primary,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 8}px ${
        theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
      textAlign: 'left',
    },
    '& td:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td compact': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td code': {
      fontSize: 13,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: '0 56px 0 24px',
      textAlign: 'left',
    },
    '& th:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& tr': {
      height: 48,
    },
    '& thead tr': {
      height: 64,
    },
    '& strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& blockquote': {
      borderLeft: `5px solid ${theme.palette.text.hint}`,
      background: theme.palette.background.paper,
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
      margin: `${theme.spacing.unit * 3}px 0`,
    },
    '& a': {
      color: theme.palette.accent.A400,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

function MarkdownElement(props, context) {
  const {
    className,
    text,
  } = props;

  const classes = context.styleManager.render(styleSheet);

  /* eslint-disable react/no-danger */
  return (
    <div
      className={classNames(classes.root, 'markdown-body', className)}
      dangerouslySetInnerHTML={{ __html: marked(text) }}
    />
  );
  /* eslint-enable */
}

MarkdownElement.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

MarkdownElement.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default MarkdownElement;
