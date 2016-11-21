// @flow weak

const defaultConstants = {
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
};

export default function createTypography(palette, constants = defaultConstants) {
  return {
    ...constants,
    display4: {
      fontSize: 112,
      fontWeight: constants.fontWeightLight,
      fontFamily: constants.fontFamily,
      color: palette.text.secondary,
      margin: '0.1em 0 0.2em',
    },
    display3: {
      fontSize: 56,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      color: palette.text.secondary,
      margin: '0.1em 0 0.2em',
    },
    display2: {
      fontSize: 45,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
      color: palette.text.secondary,
      lineHeight: '48px',
    },
    display1: {
      fontSize: 34,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
      color: palette.text.secondary,
      lineHeight: '40px',
    },
    headline: {
      fontSize: 24,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
      color: palette.text.primary,
      lineHeight: '32px',
    },
    title: {
      fontSize: 21,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      color: palette.text.primary,
    },
    subheading: {
      fontSize: 16,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    body2: {
      fontSize: 14,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    body1: {
      fontSize: 14,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      color: palette.text.primary,
    },
    caption: {
      fontSize: 12,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      color: palette.text.secondary,
    },
    materialIcon: {
      fontFamily: 'Material Icons',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontSize: 24,
      display: 'inline-block',
      lineHeight: 1,
      textTransform: 'none',
    },
  };
}
