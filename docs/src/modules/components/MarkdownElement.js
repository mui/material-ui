import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, darken, styled } from '@mui/material/styles';
import { blueDark } from 'docs/src/modules/brandingTheme';

const Root = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  wordBreak: 'break-word',
  '& .anchor-link': {
    marginTop: -96, // Offset for the anchor.
    position: 'absolute',
  },
  '& pre': {
    margin: theme.spacing(2, 'auto'),
    padding: theme.spacing(2),
    backgroundColor: blueDark[800],
    colorScheme: 'dark',
    direction: 'ltr',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderColor: blueDark[700],
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    maxWidth: 'calc(100vw - 32px)',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100vw - 32px - 16px)',
    },
  },
  '& code, & code[class*="language-"]': {
    direction: 'ltr',
    display: 'inline-block',
    ...theme.typography.body2,
    fontSize: theme.typography.pxToRem(13),
    fontFamily: theme.typography.fontFamilyCode,
    fontWeight: 400,
    WebkitFontSmoothing: 'subpixel-antialiased',
    padding: '0 5px',
    borderRadius: 5,
  },
  // inline code
  '& code': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
  },
  // block code
  '& code[class*="language-"]': {
    color: '#fff',
    backgroundColor: blueDark[800],
  },
  '& h1': {
    ...theme.typography.h3,
    fontSize: theme.typography.pxToRem(36),
    fontFamily: `"PlusJakartaSans-ExtraBold", ${theme.typography.fontFamilySystem}`,
    margin: '10px 0',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[50] : blueDark[900],
    fontWeight: 800,
  },
  '& .description': {
    ...theme.typography.subtitle1,
    fontWeight: 400,
    margin: '0 0 40px',
  },
  '& h2': {
    ...theme.typography.h5,
    fontFamily: theme.typography.fontFamilySystem,
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
    margin: '40px 0 4px',
  },
  '& h3': {
    ...theme.typography.h6,
    fontFamily: theme.typography.fontFamilySystem,
    fontWeight: 'semiBold',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[900],
    margin: '24px 0 8px',
  },
  '& h4': {
    ...theme.typography.subtitle1,
    fontFamily: theme.typography.fontFamilySystem,
    fontWeight: 'semiBold',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900],
    margin: '24px 0 8px',
  },
  '& h5': {
    ...theme.typography.subtitle2,
    fontWeight: 'semiBold',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900],
    margin: '20px 0 8px',
  },
  '& p, & ul, & ol': {
    marginTop: 0,
    marginBottom: 16,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[900],
  },
  '& ul': {
    ...(theme.direction === 'rtl' && {
      paddingRight: 30,
    }),
    ...(theme.direction !== 'rtl' && {
      paddingLeft: 30,
    }),
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
    '& a:not(.anchor-link-style):hover': {
      color: 'currentColor',
      borderBottom: '1px solid currentColor',
      textDecoration: 'none',
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
  '& h1 code': {
    fontWeight: 'semiBold',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.primary[900],
  },
  '& h2 code': {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'semiBold',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.primary[900],
  },
  '& h3 code': {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.primary[900],
  },
  '& table': {
    // Trade display table for scroll overflow
    display: 'block',
    wordBreak: 'normal',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    borderCollapse: 'collapse',
    marginBottom: '20px',
    borderSpacing: 0,
    '& .prop-name, & .prop-type, & .prop-default': {
      fontWeight: 400,
      fontFamily: theme.typography.fontFamilyCode,
      WebkitFontSmoothing: 'subpixel-antialiased',
      fontSize: theme.typography.pxToRem(13),
    },
    '& .required': {
      color: theme.palette.mode === 'light' ? '#006500' : '#a5ffa5',
    },
    '& .optional': {
      color: theme.palette.type === 'light' ? '#080065' : '#a5b3ff',
    },
    '& .prop-type': {
      color: theme.palette.mode === 'light' ? '#932981' : '#ffb6ec',
    },
    '& .prop-default': {
      borderBottom: `1px dotted ${theme.palette.divider}`,
    },
  },
  '& td': {
    ...theme.typography.body2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: theme.palette.text.secondary,
  },
  '& td code': {
    lineHeight: 1.6,
  },
  '& th': {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: 500,
    color: theme.palette.text.primary,
    whiteSpace: 'pre',
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  '& blockquote': {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderLeft: '8px solid',
    borderColor:
      theme.palette.mode === 'dark'
        ? // Support Material Design theme
          theme.palette.warning[500] ?? theme.palette.warning.dark
        : theme.palette.warning[300] ?? theme.palette.warning.light,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? // Support Material Design theme
          alpha(theme.palette.warning[900] ?? theme.palette.warning.dark, 0.2)
        : theme.palette.warning[50] ?? theme.palette.warning.light,
    padding: '10px 20px',
    margin: '20px 0',
    '& p': {
      marginTop: 10,
      color: theme.palette.mode === 'dark' ? theme.palette.grey[50] : blueDark[800],
    },
  },
  '& a, & a code': {
    // Style taken from the Link component
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
    textDecoration: 'underline',
    textDecorationColor: alpha(theme.palette.primary.main, 0.4),
    '&:hover': {
      textDecorationColor: 'inherit',
    },
  },
  '& a code': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : darken(theme.palette.primary.main, 0.04),
  },
  '& img, video': {
    maxWidth: '100%',
  },
  '& img': {
    // Avoid layout jump
    display: 'inline-block',
  },
  '& hr': {
    height: 1,
    margin: theme.spacing(6, 0),
    border: 0,
    flexShrink: 0,
    backgroundColor: theme.palette.divider,
  },
  '& kbd.key': {
    // Style taken from GitHub
    padding: '4px 5px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    margin: '0 1px',
    font: '11px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
    lineHeight: '10px',
    color: theme.palette.text.primary,
    verticalAlign: 'middle',
    backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[50],
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300]
    }`,
    borderRadius: 5,
    boxShadow: `inset 0 -1px 0 ${
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300]
    }`,
  },
  '& details': {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(0.5, 0, 0.5, 1),
    '& summary': {
      cursor: 'pointer',
    },
    '& pre': {
      marginTop: theme.spacing(1),
    },
  },
}));

const MarkdownElement = React.forwardRef(function MarkdownElement(props, ref) {
  const { className, renderedMarkdown, ...other } = props;
  const more = {};

  if (typeof renderedMarkdown === 'string') {
    // workaround for https://github.com/facebook/react/issues/17170
    // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
    more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
  }

  return <Root className={clsx('markdown-body', className)} {...more} {...other} ref={ref} />;
});

MarkdownElement.propTypes = {
  className: PropTypes.string,
  renderedMarkdown: PropTypes.string,
};

export default MarkdownElement;
