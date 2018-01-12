import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MarkdownIt from 'markdown-it';
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor';
import { withStyles } from 'material-ui/styles';
import prism from 'docs/src/modules/utils/prism';

const md = new MarkdownIt({
  langPrefix: 'language-',
  highlight(code, lang) {
    let language;
    switch (lang) {
      case 'diff':
        language = prism.languages.diff;
        break;

      case 'css':
        language = prism.languages.css;
        break;

      case 'js':
      case 'jsx':
      default:
        language = prism.languages.jsx;
        break;
    }

    return prism.highlight(code, language);
  },
}).use(markdownItTocAndAnchor, {
  anchorLinkSymbol: '⌗',
  tocClassName: 'anchor-link',
  anchorLinkSymbolClassName: 'anchor-link-style',
  anchorLinkBefore: false,
});

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
    color: theme.palette.text.primary,
    '& .anchor-link': {
      marginTop: -theme.spacing.unit * 12, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre, & pre[class*="language-"]': {
      margin: `${theme.spacing.unit * 3}px 0`,
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
    '& p code, & ul code, & pre code': {
      fontSize: 14,
      lineHeight: 1.6,
    },
    '& h1': {
      ...theme.typography.display2,
      color: theme.palette.text.secondary,
      margin: '0.7em 0',
    },
    '& h2': {
      ...theme.typography.display1,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& h4': {
      ...theme.typography.title,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
      },
      '& .anchor-link-style': {
        opacity: 0,
        // To prevent the link to get the focus.
        display: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        transform: 'skew(-20deg)',
        fontWeight: 600,
        opacity: 1,
        padding: `0 ${theme.spacing.unit}px`,
        color: theme.palette.text.hint,
        '&:hover': {
          color: theme.palette.text.secondary,
        },
        '& svg': {
          width: '0.55em',
          height: '0.55em',
          fill: 'currentColor',
        },
      },
    },
    '& table': {
      width: '100%',
      display: 'block',
      overflowX: 'auto',
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
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${
        theme.spacing.unit
      }px`,
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
      lineHeight: 1.6,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: `0 ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit}px`,
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
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
      margin: `${theme.spacing.unit * 3}px 0`,
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

function MarkdownElement(props) {
  const { classes, className, text, ...other } = props;

  /* eslint-disable react/no-danger */
  return (
    <div
      className={classNames(classes.root, 'markdown-body', className)}
      dangerouslySetInnerHTML={{ __html: md.render(text) }}
      {...other}
    />
  );
  /* eslint-enable */
}

MarkdownElement.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default withStyles(styles, { flip: false })(MarkdownElement);
