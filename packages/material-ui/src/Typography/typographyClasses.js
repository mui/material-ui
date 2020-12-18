export function getTypographyUtilityClass(name) {
  return `MuiTypography-${name}`;
}

const typographyClasses = {
  root: getTypographyUtilityClass('root'),
  h1: getTypographyUtilityClass('h1'),
  h2: getTypographyUtilityClass('h2'),
  h3: getTypographyUtilityClass('h3'),
  h4: getTypographyUtilityClass('h4'),
  h5: getTypographyUtilityClass('h5'),
  h6: getTypographyUtilityClass('h6'),
  subtitle1: getTypographyUtilityClass('subtitle1'),
  subtitle2: getTypographyUtilityClass('subtitle2'),
  body1: getTypographyUtilityClass('body1'),
  body2: getTypographyUtilityClass('body2'),
  inherit: getTypographyUtilityClass('inherit'),
  button: getTypographyUtilityClass('button'),
  caption: getTypographyUtilityClass('caption'),
  overline: getTypographyUtilityClass('overline'),
  alignLeft: getTypographyUtilityClass('alignLeft'),
  alignRight: getTypographyUtilityClass('alignRight'),
  alignCenter: getTypographyUtilityClass('alignCenter'),
  alignJustify: getTypographyUtilityClass('alignJustify'),
  noWrap: getTypographyUtilityClass('noWrap'),
  gutterBottom: getTypographyUtilityClass('gutterBottom'),
  paragraph: getTypographyUtilityClass('paragraph'),
  colorInherit: getTypographyUtilityClass('colorInherit'),
  colorPrimary: getTypographyUtilityClass('colorPrimary'),
  colorSecondary: getTypographyUtilityClass('colorSecondary'),
  colorTextPrimary: getTypographyUtilityClass('colorTextPrimary'),
  colorTextSecondary: getTypographyUtilityClass('colorTextSecondary'),
  colorError: getTypographyUtilityClass('colorError'),
  displayInline: getTypographyUtilityClass('displayInline'),
  displayBlock: getTypographyUtilityClass('displayBlock'),
};

export default typographyClasses;
