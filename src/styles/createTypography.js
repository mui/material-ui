// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

export default function createTypography(palette: Object, typography: Object | Function) {
  const {
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    htmlFontSize = 16, // Assuming browser default, typically `16px`
    ...other
  } =
    typeof typography === 'function' ? typography(palette) : typography;

  return deepmerge(
    {
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      display4: {
        fontSize: `${112 / htmlFontSize}rem`,
        fontWeight: fontWeightLight,
        fontFamily,
        letterSpacing: '-.04em',
        lineHeight: `${round(128 / 112)}em`,
        marginLeft: '-.06em',
        color: palette.text.secondary,
      },
      display3: {
        fontSize: `${56 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        letterSpacing: '-.02em',
        lineHeight: `${round(73 / 56)}em`,
        marginLeft: '-.04em',
        color: palette.text.secondary,
      },
      display2: {
        fontSize: `${45 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(48 / 45)}em`,
        marginLeft: '-.04em',
        color: palette.text.secondary,
      },
      display1: {
        fontSize: `${34 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(41 / 34)}em`,
        marginLeft: '-.04em',
        color: palette.text.secondary,
      },
      headline: {
        fontSize: `${24 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(32.5 / 24)}em`,
        color: palette.text.primary,
      },
      title: {
        fontSize: `${21 / htmlFontSize}rem`,
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24.5 / 21)}em`,
        color: palette.text.primary,
      },
      subheading: {
        fontSize: `${16 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(24 / 16)}em`,
        color: palette.text.primary,
      },
      body2: {
        fontSize: `${14 / htmlFontSize}rem`,
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24 / 14)}em`,
        color: palette.text.primary,
      },
      body1: {
        fontSize: `${14 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(20.5 / 14)}em`,
        color: palette.text.primary,
      },
      caption: {
        fontSize: `${12 / htmlFontSize}rem`,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(16.5 / 12)}em`,
        color: palette.text.secondary,
      },
      button: {
        fontSize,
        textTransform: 'uppercase',
        fontWeight: fontWeightMedium,
        fontFamily,
      },
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );
}
