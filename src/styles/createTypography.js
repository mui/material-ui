// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

export default function createTypography(palette: Object, typography: Object | Function) {
  const {
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
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
        fontSize: 112,
        fontWeight: fontWeightLight,
        fontFamily,
        letterSpacing: '-.04em',
        lineHeight: 1,
        color: palette.text.secondary,
      },
      display3: {
        fontSize: 56,
        fontWeight: fontWeightRegular,
        fontFamily,
        letterSpacing: '-.02em',
        lineHeight: 1.35,
        color: palette.text.secondary,
      },
      display2: {
        fontSize: 45,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: '48px',
        color: palette.text.secondary,
      },
      display1: {
        fontSize: 34,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: '40px',
        color: palette.text.secondary,
      },
      headline: {
        fontSize: 24,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: '32px',
        color: palette.text.primary,
      },
      title: {
        fontSize: 21,
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: 1,
        color: palette.text.primary,
      },
      subheading: {
        fontSize: 16,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: '24px',
        color: palette.text.primary,
      },
      body2: {
        fontSize: 14,
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: '24px',
        color: palette.text.primary,
      },
      body1: {
        fontSize: 14,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: '20px',
        color: palette.text.primary,
      },
      caption: {
        fontSize: 12,
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: 1,
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
  );
}
