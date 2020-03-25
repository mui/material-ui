import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import marked from 'marked/lib/marked';
import { withStyles } from '@material-ui/core/styles';
import textToHash from 'docs/src/modules/utils/textToHash';
import prism from 'docs/src/modules/components/prism';

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
renderer.heading = (text, level) => {
  // Small title. No need for an anchor.
  // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
  if (level >= 4) {
    return `<h${level}>${text}</h${level}>`;
  }

  // eslint-disable-next-line no-underscore-dangle
  const hash = textToHash(text, global.__MARKED_UNIQUE__);

  return [
    `<h${level}>`,
    `<a class="anchor-link" id="${hash}"></a>`,
    text,
    `<a class="anchor-link-style" aria-hidden="true" aria-label="anchor" href="#${hash}">`,
    '<svg><use xlink:href="#anchor-link-icon" /></svg>',
    '</a>',
    `</h${level}>`,
  ].join('');
};

const externs = [
  'https://material.io/',
  'https://getbootstrap.com/',
  'https://www.amazon.com/',
  'https://materialdesignicons.com/',
  'https://www.w3.org/',
  'https://devexpress.github.io/',
  'https://ui-kit.co/',
];

renderer.link = (href, title, text) => {
  let more = '';

  if (externs.some((domain) => href.indexOf(domain) !== -1)) {
    more = ' target="_blank" rel="noopener nofollow"';
  }

  // eslint-disable-next-line no-underscore-dangle
  const userLanguage = global.__MARKED_USER_LANGUAGE__;
  let finalHref = href;

  if (userLanguage !== 'en' && finalHref.indexOf('/') === 0 && finalHref !== '/size-snapshot') {
    finalHref = `/${userLanguage}${finalHref}`;
  }

  return `<a href="${finalHref}"${more}>${text}</a>`;
};

const markedOptions = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, language) {
    let prismLanguage;
    switch (language) {
      case 'ts':
        prismLanguage = prism.languages.tsx;
        break;

      case 'js':
      case 'sh':
        prismLanguage = prism.languages.jsx;
        break;

      case 'diff':
        prismLanguage = { ...prism.languages.diff };
        // original `/^[-<].*$/m` matches lines starting with `<` which matches
        // <SomeComponent />
        // we will only use `-` as the deleted marker
        prismLanguage.deleted = /^[-].*$/m;
        break;

      default:
        prismLanguage = prism.languages[language];
        break;
    }

    if (!prismLanguage) {
      if (language) {
        throw new Error(`unsupported language: "${language}", "${code}"`);
      } else {
        prismLanguage = prism.languages.jsx;
      }
    }

    return prism.highlight(code, prismLanguage);
  },
  renderer,
};

const styles = (theme) => ({
  root: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    '& .anchor-link': {
      marginTop: -96, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre': {
      margin: theme.spacing(3, 0),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
      direction: 'ltr',
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      maxWidth: 'calc(100vw - 32px)',
      [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },
    '& code': {
      lineHeight: 1.4,
      display: 'inline-block',
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      WebkitFontSmoothing: 'subpixel-antialiased',
      padding: '0 3px',
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.type === 'light' ? 'rgba(255, 229, 100, 0.2)' : 'rgba(255, 229, 100, 0.2)',
      fontSize: 14,
      borderRadius: 2,
    },
    '& code[class*="language-"]': {
      backgroundColor: '#272c34',
      color: '#fff',
      // Avoid layout jump after hydration (style injected by prism)
      lineHeight: 1.5,
    },
    '& p code, & ul code, & pre code': {
      fontSize: 14,
    },
    '& .token.operator': {
      background: 'transparent',
    },
    '& h1': {
      ...theme.typography.h3,
      fontSize: 40,
      margin: '16px 0',
    },
    '& .description': {
      ...theme.typography.h5,
      margin: '0 0 40px',
    },
    '& h2': {
      ...theme.typography.h4,
      fontSize: 30,
      margin: '40px 0 16px',
    },
    '& h3': {
      ...theme.typography.h5,
      margin: '40px 0 16px',
    },
    '& h4': {
      ...theme.typography.h6,
      margin: '32px 0 16px',
    },
    '& h5': {
      ...theme.typography.subtitle2,
      margin: '32px 0 16px',
    },
    '& p, & ul, & ol': {
      marginTop: 0,
      marginBottom: 16,
    },
    '& ul': {
      paddingLeft: 30,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },
      '& .anchor-link-style': {
        // To prevent the link to get the focus.
        display: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        padding: '0 8px',
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
        '& svg': {
          width: '0.7em',
          height: '0.7em',
          fill: 'currentColor',
        },
      },
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      borderCollapse: 'collapse',
      marginBottom: '16px',
      borderSpacing: 0,
      overflow: 'hidden',
      '& .prop-name': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
      '& .required': {
        color: theme.palette.type === 'light' ? '#006500' : '#a5ffa5',
      },
      '& .prop-type': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.type === 'light' ? '#932981' : '#ffb6ec',
      },
      '& .prop-default': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.divider}`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
      color: theme.palette.text.primary,
    },
    '& td code': {
      fontSize: 13,
      lineHeight: 1.6,
    },
    '& th': {
      fontSize: 14,
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: 16,
    },
    '& blockquote': {
      borderLeft: '5px solid #ffe564',
      backgroundColor: 'rgba(255,229,100,0.2)',
      padding: '4px 24px',
      margin: '24px 0',
      '& p': {
        marginTop: '16px',
      },
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
    '& hr': {
      height: 1,
      margin: theme.spacing(6, 0),
      border: 'none',
      flexShrink: 0,
      backgroundColor: theme.palette.divider,
    },
  },
});

function MarkdownElement(props) {
  const { classes, className, text, ...other } = props;

  const userLanguage = useSelector((state) => state.options.userLanguage);

  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_USER_LANGUAGE__ = userLanguage;

  /* eslint-disable react/no-danger */
  return (
    <div
      className={clsx(classes.root, 'markdown-body', className)}
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
