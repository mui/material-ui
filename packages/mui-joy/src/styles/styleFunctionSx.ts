import {
  Interpolation,
  unstable_createStyleFunctionSx,
  compose,
  style,
  display,
  flexbox,
  grid,
  positions,
  sizing,
  spacing,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  typographyVariant,
} from '@mui/system';
import { JoyTheme, SxProps } from './defaultTheme';

const borderColor = style({
  prop: 'borderColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const borderTopColor = style({
  prop: 'borderTopColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const borderRightColor = style({
  prop: 'borderRightColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const borderBottomColor = style({
  prop: 'borderBottomColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const borderLeftColor = style({
  prop: 'borderLeftColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'radius',
  internal_designTokensKey: 'vars',
});

const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadius,
);

const color = style({
  prop: 'color',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  internal_designTokensKey: 'vars',
});

const palette = compose(color, bgcolor, backgroundColor);

const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'shadow',
  internal_designTokensKey: 'vars',
});

export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'fontFamily',
  internal_designTokensKey: 'vars',
});

export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'fontSize',
  internal_designTokensKey: 'vars',
});

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'fontWeight',
  internal_designTokensKey: 'vars',
});

export const letterSpacing = style({
  prop: 'letterSpacing',
  themeKey: 'letterSpacing',
  internal_designTokensKey: 'vars',
});

export const lineHeight = style({
  prop: 'lineHeight',
  themeKey: 'lineHeight',
  internal_designTokensKey: 'vars',
});

const typography = compose(
  typographyVariant,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
);

const filterPropsMapping = {
  borders: borders.filterProps,
  display: display.filterProps,
  flexbox: flexbox.filterProps,
  grid: grid.filterProps,
  positions: positions.filterProps,
  palette: palette.filterProps,
  boxShadow: boxShadow.filterProps,
  sizing: sizing.filterProps,
  spacing: spacing.filterProps,
  typography: typography.filterProps,
};

const styleFunctionMapping = {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
  boxShadow,
  sizing,
  spacing,
  typography,
};

const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  // @ts-ignore private function
  filterPropsMapping[styleFnName].forEach((propName) => {
    // @ts-ignore private function
    acc[propName] = styleFunctionMapping[styleFnName];
  });

  return acc;
}, {});

function getThemeValue(prop: string, value: string | number | object, theme: object) {
  const inputProps = {
    [prop]: value,
    theme,
  };

  // @ts-ignore private function
  const styleFunction = propToStyleFunction[prop];
  return (styleFunction ? styleFunction(inputProps) : { [prop]: value }) as object;
}

const styleFunctionSx = unstable_createStyleFunctionSx({
  getThemeValue,
  propToStyleFunction,
});

styleFunctionSx.filterProps = ['sx'];

export const sx = (styles: SxProps) => {
  return ({ theme }: { theme: JoyTheme }) =>
    styleFunctionSx({ sx: styles, theme }) as Interpolation<{ theme: JoyTheme }>;
};

export default styleFunctionSx;
