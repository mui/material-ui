// @flow weak

const defaultConstants = {
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
};

export default function createTypography(palette, constants = defaultConstants) {
  return {
    ...constants,
    display4: {
      fontSize: 112,
      fontWeight: constants.fontWeightLight,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
    },
    display3: {
      fontSize: 56,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
    },
    display2: {
      fontSize: 45,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
    },
    display1: {
      fontSize: 34,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
    },
    headline: {
      fontSize: 24,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
      margin: '0.1em 0 0.2em',
    },
    title: {
      fontSize: 20,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
    },
    subheading: {
      fontSize: 16,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    body2: {
      fontSize: 14,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
    },
    body1: {
      fontSize: 14,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    caption: {
      fontSize: 12,
      fontWeight: constants.fontWeightNormal,
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
