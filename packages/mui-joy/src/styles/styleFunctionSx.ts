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
  enableThemeVars: true,
});

const borderTopColor = style({
  prop: 'borderTopColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const borderRightColor = style({
  prop: 'borderRightColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const borderBottomColor = style({
  prop: 'borderBottomColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const borderLeftColor = style({
  prop: 'borderLeftColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'radius',
  enableThemeVars: true,
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
  enableThemeVars: true,
});

const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  enableThemeVars: true,
});

const palette = compose(color, bgcolor, backgroundColor);

const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'shadow',
  enableThemeVars: true,
});

export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'fontFamily',
  enableThemeVars: true,
});

export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'fontSize',
  enableThemeVars: true,
});

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'fontWeight',
  enableThemeVars: true,
});

export const letterSpacing = style({
  prop: 'letterSpacing',
  themeKey: 'letterSpacing',
  enableThemeVars: true,
});

export const lineHeight = style({
  prop: 'lineHeight',
  themeKey: 'lineHeight',
  enableThemeVars: true,
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
