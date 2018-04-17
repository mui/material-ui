// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

export default function createTypography(palette: Object, typography: Object | Function) {
  const {
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    ...other
  } =
    typeof typography === 'function' ? typography(palette) : typography;

  const coef = fontSize / 14;
  function pxToRem(value) {
    return `${value / htmlFontSize * coef}rem`;
  }

  return deepmerge(
    {
      pxToRem,
      round,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      display4: {
        fontSize: pxToRem(112),
        fontWeight: fontWeightLight,
        fontFamily,
        letterSpacing: '-.04em',
        lineHeight: `${round(128 / 112)}em`,
        marginLeft: '-.04em',
        color: palette.text.secondary,
      },
      display3: {
        fontSize: pxToRem(56),
        fontWeight: fontWeightRegular,
        fontFamily,
        letterSpacing: '-.02em',
        lineHeight: `${round(73 / 56)}em`,
        marginLeft: '-.02em',
        color: palette.text.secondary,
      },
      display2: {
        fontSize: pxToRem(45),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(48 / 45)}em`,
        marginLeft: '-.02em',
        color: palette.text.secondary,
      },
      display1: {
        fontSize: pxToRem(34),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(41 / 34)}em`,
        color: palette.text.secondary,
      },
      headline: {
        fontSize: pxToRem(24),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(32.5 / 24)}em`,
        color: palette.text.primary,
      },
      title: {
        fontSize: pxToRem(21),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24.5 / 21)}em`,
        color: palette.text.primary,
      },
      subheading: {
        fontSize: pxToRem(16),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(24 / 16)}em`,
        color: palette.text.primary,
      },
      body2: {
        fontSize: pxToRem(14),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24 / 14)}em`,
        color: palette.text.primary,
      },
      body1: {
        fontSize: pxToRem(14),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(20.5 / 14)}em`,
        color: palette.text.primary,
      },
      caption: {
        fontSize: pxToRem(12),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(16.5 / 12)}em`,
        color: palette.text.secondary,
      },
      button: {
        fontSize: pxToRem(14),
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
