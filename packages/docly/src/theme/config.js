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
  // Docly: add mobile-first media queries
  // instead of theme.breakpoints.up('md')
  mq,

  breakpoints: {
    keys: Object.keys(breakpoints),
    values: breakpoints,
  },
  mixins: {
    toolbar: {
      minHeight: 60,
      [mq.sm]: { minHeight: 80 },
    },
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

    // Docly: max content width
    maxWidth: 1440,
    // Docly: article width
    articleWidth: 890,
    // Docly: responsive spacing constants
    xt: 'var(--spacing-xt)',
    t: 'var(--spacing-t)',
    xs: 'var(--spacing-xs)',
    s: 'var(--spacing-s)',
    m: 'var(--spacing-m)',
    l: 'var(--spacing-l)',
    xl: 'var(--spacing-xl)',
    xxl: 'var(--spacing-xxl)',
  },
  shape: {
    borderRadius: 2,
  },
  // theme component overrides
  overrides: {
    MuiButton: {
      root: {
        // rounded corners for all buttons
        borderRadius: '999px',
      },
    },
  },

  typography: {
    // https://material-ui.com/style/typography/#migration-to-typography-v2
    useNextVariants: true,

    fontFamily,
    fontSize: 16,

    // docly: display1
    h1: {
      lineHeight: 1.2,
      fontWeight: fontWeights.bold,
      fontSize: 36,
      [mq.sm]: { fontSize: 38 },
      [mq.md]: { fontSize: 50 },
      [mq.lg]: { fontSize: 72 },
    },

    // docly: display2
    h2: {
      fontSize: 36,
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 38 },
      [mq.md]: { fontSize: 50 },
      [mq.lg]: { fontSize: 50 },
    },

    // docly: display3
    h3: {
      fontSize: 36,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontWeight: fontWeights.bold },
      [mq.lg]: { fontSize: 38 },
    },

    // same as display3 (for now)
    // mui: display1
    // docly: title1
    h4: {
      fontSize: 36,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontWeight: fontWeights.bold },
      [mq.lg]: { fontSize: 38 },
    },

    // mui: headline
    // material: h5
    // docly: title2
    h5: {
      fontSize: 27,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 28 },
      [mq.md]: { fontSize: 29 },
      [mq.lg]: { fontSize: 29 },
    },

    // docly: subhead/subheading
    // material: h6
    h6: {
      fontSize: 22,
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
      [mq.sm]: { fontSize: 24 },
      [mq.lg]: { fontSize: 26 },
    },

    // docly: intro
    // material: subtitle1
    subtitle1: {
      fontSize: 21,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.md]: { fontSize: 22 },
    },

    // docly: subhead | subheading
    // mui: subheading
    // material: subtitle2
    subtitle2: {
      fontSize: 18,
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
      [mq.md]: { fontSize: 20 },
    },

    body1: {
      fontSize: 18,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.lg]: { fontSize: 19 },
    },

    // body2 is default in new material + m-ui
    body2: {
      fontSize: 16,
      fontWeight: fontWeights.regular,
      lineHeight: 1.5,
      [mq.lg]: { fontSize: 17 },
    },

    // docly: body3
    // material: caption
    caption: {
      fontSize: 13,
      fontWeight: fontWeights.semiBold,
      lineHeight: 1.5,
    },

    button: {
      fontSize: 16,
      textTransform: 'inherit',
      fontWeight: fontWeights.semiBold,
    },
  },
};

export default config;
