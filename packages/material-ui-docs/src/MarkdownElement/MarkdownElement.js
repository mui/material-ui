import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import marked from 'marked';
import { withStyles } from '@material-ui/core/styles';
import prism from './prism';

// Monkey patch to preserve non-breaking spaces
// https://github.com/chjj/marked/blob/6b0416d10910702f73da9cb6bb3d4c8dcb7dead7/lib/marked.js#L142-L150
marked.Lexer.prototype.lex = function lex(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

const renderer = new marked.Renderer();

export function textToHash(text) {
  return text
    .toLowerCase()
    .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>/g, '')
    .replace(/\W+/g, '-')
    .replace(/-$/g, '');
}

renderer.heading = (text, level) => {
  // Small title. No need for an anchor.
  // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
  if (level >= 4) {
    return `<h${level}>${text}</h${level}>`;
  }

  const escapedText = textToHash(text);

  return (
    `
    <h${level}>
      <a class="anchor-link" id="${escapedText}"></a>${text}` +
    `<a class="anchor-link-style" href="#${escapedText}">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M46.9 13.9c-.5-.6-1.2-.94-2.07-.94h-6.67l1.86-8.98c.17-.85 0-1.7-.52-2.3-.48-.6-1.2-.94-2.07-.94-1.6 0-3.2 1.27-3.54 2.93l-.5 2.42c0 .07-.07.13-.07.2l-1.37 6.62H20.7l1.88-8.96c.16-.85 0-1.7-.53-2.3-.48-.6-1.2-.94-2.07-.94-1.65 0-3.2 1.27-3.56 2.93l-.52 2.58v.08l-1.37 6.64H7.3c-1.67 0-3.22 1.3-3.58 2.96-.16.86 0 1.7.52 2.3.48.6 1.2.93 2.07.93h6.97l-2 9.65H4c-1.67 0-3.22 1.27-3.56 2.94-.2.8 0 1.67.5 2.27.5.6 1.2.93 2.08.93H10l-1.84 9.05c-.2.84 0 1.67.52 2.3.5.6 1.25.92 2.08.92 1.66 0 3.2-1.3 3.55-2.94l1.94-9.33h11.22l-1.87 9.05c-.15.84.03 1.67.53 2.3.5.6 1.2.92 2.07.92 1.65 0 3.22-1.3 3.56-2.94l1.9-9.33h7c1.6 0 3.2-1.28 3.53-2.93.2-.87 0-1.7-.52-2.3-.48-.62-1.2-.96-2.05-.96h-6.7l2.02-9.65h6.93c1.67 0 3.22-1.27 3.56-2.92.2-.85 0-1.7-.5-2.3l-.04.03zM17.53 28.77l1.95-9.65H30.7l-1.97 9.66H17.5h.03z"/></svg>
      </a></h${level}>
  `
  );
};

const externs = [
  'https://material.io/',
  'https://www.styled-components.com/',
  'https://emotion.sh/',
  'https://getbootstrap.com/',
];

renderer.link = (href, title, text) => {
  let more = '';

  if (externs.some(domain => href.indexOf(domain) !== -1)) {
    more = ' target="_blank" rel="noopener nofollow"';
  }

  return `<a href="${href}"${more}>${text}</a>`;
};

const markedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    let language;
    switch (lang) {
      case 'diff':
        language = prism.languages.diff;
        break;

      case 'css':
        language = prism.languages.css;
        break;

      case 'ts':
      case 'tsx':
        language = prism.languages.typescript;
        break;

      case 'js':
      case 'jsx':
      default:
        language = prism.languages.jsx;
        break;
    }

    return prism.highlight(code, language);
  },
  renderer,
};

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    color: theme.palette.text.primary,
    '& .anchor-link': {
      marginTop: -96, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre, & pre[class*="language-"]': {
      margin: '24px 0',
      padding: '12px 18px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
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
      ...theme.typography.h2,
      margin: '32px 0 16px',
    },
    '& .description': {
      ...theme.typography.h5,
      margin: '0 0 40px',
    },
    '& h2': {
      ...theme.typography.h4,
      margin: '32px 0 24px',
    },
    '& h3': {
      ...theme.typography.h5,
      margin: '32px 0 24px',
    },
    '& h4': {
      ...theme.typography.h6,
      margin: '24px 0 16px',
    },
    '& h5': {
      ...theme.typography.subtitle2,
      margin: '24px 0 16px',
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-word',
      },
      '& .anchor-link-style': {
        opacity: 0,
        // To prevent the link to get the focus.
        display: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        opacity: 1,
        padding: '0 8px',
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
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
      '& .prop-name': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
      '& .required': {
        color: theme.palette.type === 'light' ? '#006500' : '#9bc89b',
      },
      '& .prop-type': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.type === 'light' ? '#932981' : '#dbb0d0',
      },
      '& .prop-default': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.text.hint}`,
      },
    },
    '& thead': {
      fontSize: 14,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& tbody': {
      fontSize: 14,
      lineHeight: 1.5,
      color: theme.palette.text.primary,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: '8px 16px 8px 8px',
      textAlign: 'left',
    },
    '& td:last-child': {
      paddingRight: 24,
    },
    '& td compact': {
      paddingRight: 24,
    },
    '& td code': {
      fontSize: 13,
      lineHeight: 1.6,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontWeight: theme.typography.fontWeightMedium,
      padding: '0 16px 0 8px',
      textAlign: 'left',
    },
    '& th:last-child': {
      paddingRight: 24,
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
      padding: '4px 24px',
      margin: '24px 0',
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& img': {
      maxWidth: '100%',
    },
  },
});

function MarkdownElement(props) {
  const { classes, className, text, ...other } = props;

  /* eslint-disable react/no-danger */
  return (
    <div
      className={classNames(classes.root, 'markdown-body', className)}
      dangerouslySetInnerHTML={{ __html: marked(text, markedOptions) }}
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
