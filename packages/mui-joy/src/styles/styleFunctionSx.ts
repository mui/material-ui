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
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  palette,
  typographyVariant,
} from '@mui/system';
import { Theme, SxProps } from './types';

// The default system themeKey is shape
const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'radius',
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

// The default system themeKey is shadows
const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'shadow',
});

// The default system themeKey is typography
export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'fontFamily',
});

// The default system themeKey is typography
export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'fontSize',
});

// The default system themeKey is typography
export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'fontWeight',
});

// The default system themeKey is typography
export const letterSpacing = style({
  prop: 'letterSpacing',
  themeKey: 'letterSpacing',
});

export const lineHeight = style({
  prop: 'lineHeight',
  themeKey: 'lineHeight',
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
  return ({ theme }: { theme: Theme }) =>
    styleFunctionSx({ sx: styles, theme }) as Interpolation<{ theme: Theme }>;
};

export default styleFunctionSx;
