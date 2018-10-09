import colors from '../shared/colors';
import { fontWeights } from '../shared/typography';

const breakpoints = {
  xs: 370,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1680,
};

const mq = {
  xs: `@media(min-width: ${breakpoints.xs}px)`,
  sm: `@media(min-width: ${breakpoints.sm}px)`,
  md: `@media(min-width: ${breakpoints.md}px)`,
  lg: `@media(min-width: ${breakpoints.lg}px)`,
  xl: `@media(min-width: ${breakpoints.xl}px)`,
};

const fontFamily = [
  'Graphik',
  '-apple-system',
  'BlinkMacSystemFont',
  "'Segoe UI'",
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  '"Open Sans"',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

// TODO: change <Typography variant="…" /> props config …
// title1: nope (called 'title')
// title2: nope (called 'title')
// display4: not used by us
// body3: nope
// intro: nope
// subhead: called 'subheading'

const config = {
  breakpoints: {
    values: breakpoints,
  },
  palette: {
    primary: {
      main: colors.doclyText,
      light: colors.doclyGrey300,
      dark: colors.doclyGrey900,
    },
    default: {
      100: colors.doclyRed100,
      500: colors.doclyRed500,
      800: colors.doclyRed800,
      A400: colors.doclyRedA500,
      main: colors.doclyRed500,
    },
    secondary: {
      100: colors.doclyRed100,
      500: colors.doclyRed500,
      800: colors.doclyRed800,
      A400: colors.doclyRedA500,
      main: colors.doclyRed500,
    },
    notification: {
      error: colors.doclyYellow500,
      success: colors.doclyGreen500,
      info: colors.doclyBlue500,
    },
    grey: {
      100: colors.doclyGrey100,
      200: colors.doclyGrey200,
      300: colors.doclyGrey300,
      400: colors.doclyGrey400,
      500: colors.doclyGrey500,
      700: colors.doclyGrey700,
      900: colors.doclyGrey900,
      A900: colors.doclyGreyA900,
    },
    text: {
      primary: colors.doclyText,
      secondary: colors.doclyText,
      // secondary: "rgba(0, 0, 0, 0.54)",
      // disabled: "rgba(0, 0, 0, 0.38)",
      // hint: "rgba(0, 0, 0, 0.38)"
    },
  },
  spacing: {
    unit: 8,
  },
  shape: {
    borderRadius: 999,
  },

  typography: {
    fontFamily,
    fontSize: 16,

    display1: {
      lineHeight: 1.2,
      fontWeight: fontWeights.bold,
      fontSize: 36,
      [mq.sm]: { fontSize: 38 },
      [mq.md]: { fontSize: 50 },
      [mq.lg]: { fontSize: 72 },
    },

    display2: {
      fontSize: 36,
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 38 },
      [mq.md]: { fontSize: 50 },
      [mq.lg]: { fontSize: 50 },
    },

    display3: {
      fontSize: 36,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontWeight: fontWeights.bold },
      [mq.lg]: { fontSize: 38 },
    },

    // same as display3 (for now)
    display4: {
      fontSize: 36,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontWeight: fontWeights.bold },
      [mq.lg]: { fontSize: 38 },
    },

    title: {
      fontSize: 27,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 28 },
      [mq.md]: { fontSize: 29 },
      [mq.lg]: { fontSize: 29 },
    },

    title1: {
      fontSize: 27,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 28 },
      [mq.md]: { fontSize: 29 },
      [mq.lg]: { fontSize: 29 },
    },

    title2: {
      fontSize: 22,
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 24 },
      [mq.lg]: { fontSize: 26 },
    },

    subheading: {
      fontSize: 18,
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
      [mq.md]: { fontSize: 20 },
    },

    intro: {
      fontSize: 21,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.sm]: { fontWeight: fontWeights.semiBold },
      [mq.md]: { fontSize: 22 },
    },

    body1: {
      fontSize: 18,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.lg]: { fontSize: 19 },
    },

    body2: {
      fontSize: 16,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.lg]: { fontSize: 17 },
    },

    body3: {
      fontSize: 13,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.5,
    },
  },
};

export default config;
