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
  themeKey: 'vars.palette',
});

const borderTopColor = style({
  prop: 'borderTopColor',
  themeKey: 'vars.palette',
});

const borderRightColor = style({
  prop: 'borderRightColor',
  themeKey: 'vars.palette',
});

const borderBottomColor = style({
  prop: 'borderBottomColor',
  themeKey: 'vars.palette',
});

const borderLeftColor = style({
  prop: 'borderLeftColor',
  themeKey: 'vars.palette',
});

const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'vars.radius',
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
  themeKey: 'vars.palette',
});

const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'vars.palette',
});

const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'vars.palette',
});

const palette = compose(color, bgcolor, backgroundColor);

const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'vars.shadow',
});

export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'vars.fontFamily',
});

export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'vars.fontSize',
});

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'vars.fontWeight',
});

export const letterSpacing = style({
  prop: 'letterSpacing',
  themeKey: 'vars.letterSpacing',
});

export const lineHeight = style({
  prop: 'lineHeight',
  themeKey: 'vars.lineHeight',
});

const typography = compose(
  typographyVariant,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
);

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

const styleFunctionSx = unstable_createStyleFunctionSx(styleFunctionMapping);

styleFunctionSx.filterProps = ['sx'];

export const sx = (styles: SxProps) => {
  return ({ theme }: { theme: JoyTheme }) =>
    styleFunctionSx({ sx: styles, theme }) as Interpolation<{ theme: JoyTheme }>;
};

export default styleFunctionSx;
