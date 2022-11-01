import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, darken, styled } from '@mui/material/styles';
import {
  blue,
  blueDark,
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';

const Root = styled('div')(
  ({ theme }) => ({
    ...theme.typography.body1,
    color: (theme.vars || theme).palette.text.primary,
    '& strong': {
      color: (theme.vars || theme).palette.text.primary,
    },
    wordBreak: 'break-word',
    '& pre': {
      margin: theme.spacing(2, 'auto'),
      padding: theme.spacing(2),
      backgroundColor: blueDark[800],
      color: '#f8f8f2',
      colorScheme: 'dark',
      direction: 'ltr',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: '1px solid',
      borderColor: blueDark[700],
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      fontSize: theme.typography.pxToRem(13),
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: '400px',
      [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },
    '& code': {
      ...theme.typography.body2,
      fontFamily: theme.typography.fontFamilyCode ?? lightTheme.typography.fontFamilyCode,
      fontWeight: 400,
      WebkitFontSmoothing: 'subpixel-antialiased',
      // Reset for Safari
      // https://github.com/necolas/normalize.css/blob/master/normalize.css#L102
      fontSize: '1em',
    },
    // inline code block
    '& :not(pre) > code': {
      display: 'inline-block',
      padding: '0 5px',
      color: (theme.vars || theme).palette.text.primary,
      backgroundColor: alpha(lightTheme.palette.primary.light, 0.15),
      borderRadius: 5,
      fontSize: theme.typography.pxToRem(13),
    },
    '& h1': {
      ...theme.typography.h3,
      fontSize: theme.typography.pxToRem(36),
      fontFamily: `"PlusJakartaSans-ExtraBold", ${theme.typography.fontFamilySystem}`,
      margin: '10px 0',
      color: blueDark[900],
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
      color: (theme.vars || theme).palette.grey[900],
      margin: '40px 0 4px',
    },
    '& h3': {
      ...theme.typography.h6,
      fontFamily: theme.typography.fontFamilySystem,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: (theme.vars || theme).palette.grey[900],
      margin: '24px 0 8px',
    },
    '& h4': {
      ...theme.typography.subtitle1,
      fontFamily: theme.typography.fontFamilySystem,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: (theme.vars || theme).palette.grey[900],
      margin: '24px 0 8px',
    },
    '& h5': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: (theme.vars || theme).palette.grey[900],
      margin: '20px 0 8px',
    },
    '& p, & ul, & ol': {
      marginTop: 0,
      marginBottom: 16,
      color: (theme.vars || theme).palette.grey[900],
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
        textAlign: 'center',
        lineHeight: '21.5px',
        marginLeft: 10,
        height: '26px',
        width: '26px',
        background: (theme.vars || theme).palette.primary[50],
        border: '1px solid',
        borderColor: (theme.vars || theme).palette.grey[200],
        borderRadius: 8,
        color: (theme.vars || theme).palette.text.secondary,
        '&:hover': {
          color: (theme.vars || theme).palette.text.primary,
        },
        '& svg': {
          width: '0.875rem',
          height: '0.875rem',
          fill: 'currentColor',
        },
      },
    },
    '& h1 code, & h2 code, & h3 code': {
      color: (theme.vars || theme).palette.primary[900],
    },
    '& h1 code': {
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '& h2 code': {
      fontSize: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '& h3 code': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
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
        color: '#a5ffa5',
      },
      '& .optional': {
        color: '#a5b3ff',
      },
      '& .prop-type': {
        color: '#ffb6ec',
      },
      '& .prop-default': {
        borderBottom: `1px dotted ${(theme.vars || theme).palette.divider}`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
      color: (theme.vars || theme).palette.text.secondary,
    },
    '& td code': {
      lineHeight: 1.6,
    },
    '& th': {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: 500,
      color: (theme.vars || theme).palette.text.primary,
      whiteSpace: 'pre',
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
    },
    '& blockquote': {
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: '1px solid',
      borderLeft: '8px solid',
      borderColor:
        (theme.vars || theme).palette.warning[300] ?? (theme.vars || theme).palette.warning.light,
      backgroundColor:
        (theme.vars || theme).palette.warning[50] ?? (theme.vars || theme).palette.warning.light,
      padding: '10px 20px',
      margin: '20px 0',
      '& p': {
        marginTop: 10,
        color: blueDark[800],
      },
    },
    '& .MuiCallout-root': {
      padding: '16px',
      margin: '16px 0',
      border: '1px solid',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      '& > p': {
        color: 'inherit',
        '&:last-child': {
          margin: 0,
        },
      },
      '& ul, li': {
        color: 'inherit',
      },
      '&.MuiCallout-error': {
        color:
          (theme.vars || theme).palette.error[900] ?? (theme.vars || theme).palette.text.primary,
        backgroundColor:
          (theme.vars || theme).palette.error[50] ?? (theme.vars || theme).palette.error.light,
        borderColor:
          (theme.vars || theme).palette.error[200] ?? (theme.vars || theme).palette.error.light,
        '& strong': {
          color:
            (theme.vars || theme).palette.error[800] ?? (theme.vars || theme).palette.text.primary,
        },
        '& a': {
          color:
            (theme.vars || theme).palette.error[800] ?? (theme.vars || theme).palette.text.primary,
          textDecorationColor: alpha(lightTheme.palette.error.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-info': {
        color:
          (theme.vars || theme).palette.primary[900] ?? (theme.vars || theme).palette.text.primary,
        backgroundColor: alpha(
          lightTheme.palette.primary[50] ?? lightTheme.palette.primary.dark,
          0.8,
        ),
        borderColor:
          (theme.vars || theme).palette.primary[100] ?? (theme.vars || theme).palette.primary.light,
        '& strong': {
          color:
            (theme.vars || theme).palette.primary[800] ??
            (theme.vars || theme).palette.text.primary,
        },
      },
      '&.MuiCallout-success': {
        color:
          (theme.vars || theme).palette.success[900] ?? (theme.vars || theme).palette.text.primary,
        backgroundColor:
          (theme.vars || theme).palette.success[50] ?? (theme.vars || theme).palette.success.light,
        borderColor:
          (theme.vars || theme).palette.success[200] ?? (theme.vars || theme).palette.success.light,
        '& strong': {
          color:
            (theme.vars || theme).palette.success[900] ??
            (theme.vars || theme).palette.text.primary,
        },
        '& a': {
          color:
            (theme.vars || theme).palette.success[900] ??
            (theme.vars || theme).palette.text.primary,
          textDecorationColor: alpha(lightTheme.palette.success.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-warning': {
        color:
          (theme.vars || theme).palette.grey[900] ?? (theme.vars || theme).palette.text.primary,
        backgroundColor: alpha(
          lightTheme.palette.warning[50] ?? lightTheme.palette.warning.light,
          0.6,
        ),
        borderColor:
          (theme.vars || theme).palette.warning[300] ?? (theme.vars || theme).palette.warning.light,
        '& strong': {
          color:
            (theme.vars || theme).palette.warning[800] ??
            (theme.vars || theme).palette.text.primary,
        },
        '& a': {
          color:
            (theme.vars || theme).palette.warning[800] ??
            (theme.vars || theme).palette.text.primary,
          textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: (theme.vars || theme).palette.primary[600],
      textDecoration: 'underline',
      textDecorationColor: alpha(lightTheme.palette.primary.main, 0.4),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    },
    '& a code': {
      color: darken(lightTheme.palette.primary.main, 0.04),
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
      backgroundColor: (theme.vars || theme).palette.divider,
    },
    '& kbd.key': {
      padding: '5px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0 1px',
      font: '11px Consolas,Liberation Mono,Menlo,monospace',
      lineHeight: '10px',
      color: (theme.vars || theme).palette.text.primary,
      verticalAlign: 'middle',
      backgroundColor: (theme.vars || theme).palette.grey[50],
      border: `1px solid ${(theme.vars || theme).palette.grey[300]}`,
      borderRadius: 5,
      boxShadow: `inset 0 -1px 0 ${(theme.vars || theme).palette.grey[300]}`,
    },
    '& details': {
      marginBottom: theme.spacing(1.5),
      padding: theme.spacing(0.5, 0, 0.5, 1),
      '& pre': {
        marginTop: theme.spacing(1),
      },
    },
    '& summary': {
      cursor: 'pointer',
    },
    '& .MuiCode-root': {
      position: 'relative',
      '&:hover': {
        '& .MuiCode-copy': {
          display: 'block',
        },
      },
    },
    '& .MuiCode-copy': {
      minWidth: 64,
      display: 'none',
      backgroundColor: alpha(blueDark[600], 0.5),
      cursor: 'pointer',
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      fontFamily: 'inherit',
      fontSize: theme.typography.pxToRem(13),
      fontWeight: 500,
      padding: theme.spacing(0.5, 1),
      borderRadius: 4,
      border: `1px solid`,
      borderColor: blueDark[500],
      color: blueDark[50],
      '&:hover, &:focus': {
        opacity: 1,
        color: '#fff',
        backgroundColor: alpha(blueDark[600], 0.7),
        borderColor: blueDark[500],
        '& .MuiCode-copyKeypress': {
          opacity: 1,
        },
      },
      '&[data-copied]': {
        // style of the button when it is in copied state.
        borderColor: blue[700],
        color: '#fff',
        backgroundColor: blueDark[600],
      },
      '&:focus-visible': {
        outline: '2px solid',
        outlineOffset: 2,
        outlineColor: blueDark[500],
      },
    },
    '& .MuiCode-copyKeypress': {
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0,
      position: 'absolute',
      left: '50%',
      top: '100%',
      minWidth: '100%',
      marginTop: theme.spacing(0.5),
      whiteSpace: 'nowrap',
      transform: 'translateX(-50%)',
      '& > span': {
        opacity: 0.72,
      },
    },
    '& li': {
      '& pre': {
        marginTop: theme.spacing(1),
      },
    },
  }),
  ({ theme }) =>
    theme.applyDarkStyles({
      '& strong': {
        color: (theme.vars || theme).palette.grey[200],
      },
      '& h1': {
        color: (theme.vars || theme).palette.grey[50],
      },
      '& h2': {
        color: (theme.vars || theme).palette.grey[100],
      },
      '& h3': {
        color: (theme.vars || theme).palette.grey[200],
      },
      '& h4': {
        color: (theme.vars || theme).palette.grey[300],
      },
      '& h5': {
        color: (theme.vars || theme).palette.grey[300],
      },
      '& p, & ul, & ol': {
        color: (theme.vars || theme).palette.grey[400],
      },
      '& h1, & h2, & h3, & h4': {
        '&:hover .anchor-link-style': {
          background: alpha(blue[800], 0.3),
          borderColor: blueDark[500],
        },
      },
      '& h1 code, & h2 code, & h3 code': {
        color: (theme.vars || theme).palette.grey[100],
      },
      '& table': {
        '& .required': {
          color: '#006500',
        },
        '& .optional': {
          color: '#45529f',
        },
        '& .prop-type': {
          color: '#932981',
        },
      },
      '& blockquote': {
        borderColor:
          (theme.vars || theme).palette.warning[500] ?? (theme.vars || theme).palette.warning.dark,
        backgroundColor: alpha(
          darkTheme.palette.warning[900] ?? darkTheme.palette.warning.dark,
          0.2,
        ),
        '& p': {
          color: (theme.vars || theme).palette.grey[50],
        },
      },
      '& .MuiCallout-root': {
        '&.MuiCallout-error': {
          color: (theme.vars || theme).palette.error[50] ?? '#fff',
          backgroundColor: alpha(
            darkTheme.palette.error[900] ?? darkTheme.palette.error.dark,
            0.35,
          ),
          borderColor:
            (theme.vars || theme).palette.error[800] ?? (theme.vars || theme).palette.error.dark,
          '& strong': {
            color: (theme.vars || theme).palette.error[100] ?? '#fff',
          },
          '& a': {
            color: (theme.vars || theme).palette.error[100] ?? '#fff',
          },
        },
        '&.MuiCallout-info': {
          color: (theme.vars || theme).palette.primary[50] ?? '#fff',
          backgroundColor: alpha(
            darkTheme.palette.primary[900] ?? darkTheme.palette.primary.dark,
            0.2,
          ),
          borderColor:
            (theme.vars || theme).palette.primary[800] ??
            (theme.vars || theme).palette.primary.dark,
          '& strong': {
            color: (theme.vars || theme).palette.primary[100] ?? '#fff',
          },
        },
        '&.MuiCallout-success': {
          color: (theme.vars || theme).palette.success[50] ?? '#fff',
          backgroundColor: alpha(
            darkTheme.palette.success[900] ?? darkTheme.palette.success.dark,
            0.35,
          ),
          borderColor:
            (theme.vars || theme).palette.success[800] ??
            (theme.vars || theme).palette.success.dark,
          '& strong': {
            color: (theme.vars || theme).palette.success[100] ?? '#fff',
          },
          '& a': {
            color: (theme.vars || theme).palette.success[100] ?? '#fff',
          },
        },
        '&.MuiCallout-warning': {
          color: (theme.vars || theme).palette.warning[50] ?? '#fff',
          backgroundColor: alpha(
            darkTheme.palette.warning[900] ?? darkTheme.palette.warning.dark,
            0.35,
          ),
          '& strong': {
            color:
              (theme.vars || theme).palette.warning[800] ??
              (theme.vars || theme).palette.warning.dark,
          },
          '& a': {
            color: (theme.vars || theme).palette.warning[100] ?? '#fff',
          },
        },
      },
      '& a, & a code': {
        color: (theme.vars || theme).palette.primary[300],
      },
      '& a code': {
        color: (theme.vars || theme).palette.primary.light,
      },
      '& kbd.key': {
        backgroundColor: blueDark[900],
        border: `1px solid ${blueDark[500]}`,
        boxShadow: `inset 0 -1px 0 ${blueDark[700]}`,
      },
    }),
);

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
