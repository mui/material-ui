import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

export const createOverrides = (theme: Theme): StyleRules<any> => ({
  body: {
    fontFamily: 'roboto',
    '-webkit-font-smoothing:': 'antialiased',
    backgroundColor: theme.palette.background.default,
  },
  h1: theme.typography.h1,
  h2: {
    ...theme.typography.h2,
    textTransform: 'unset',
    margin: '32px 0 16px',
  },
  h3: {
    ...theme.typography.h3,
    textTransform: 'unset',
    margin: '32px 0 16px',
  },
  h4: {
    ...theme.typography.h4,
    textTransform: 'unset',
    margin: '32px 0 8px',
  },
  h5: theme.typography.h5,
  h6: theme.typography.h6,
  p: {
    ...theme.typography.body1,
    textTransform: 'unset',
  },
  a: {
    color: theme.palette.secondary.main,
  },
  pre: {
    margin: '24px 0',
    padding: '12px 18px',
    overflow: 'auto',
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper + ' !important',
  },
  ul: {
    color: theme.palette.text.primary,
  },
  li: theme.typography.body1,
  code: {
    fontSize: 16,
    lineHeight: 1.4,
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : 'black',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    backgroundColor: theme.palette.background.paper + ' !important',
  },
  blockquote: {
    marginLeft: 0,
    paddingLeft: '1em',
    borderLeft: `3px solid ${theme.palette.grey[200]}`,

    '& > p': {
      fontSize: '0.9rem',
    },
  },
  'h1, h2, h3, h4, h5': {
    position: 'relative',
    '& a.anchor-link': {
      position: 'absolute',
      top: -80,
    },
    '& a.anchor-link-style': {
      visibility: 'hidden',
      marginLeft: 4,
      fontSize: '80%',
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto',
    },
    '&:hover a.anchor-link-style': {
      visibility: 'visible',
    },
  },
});
