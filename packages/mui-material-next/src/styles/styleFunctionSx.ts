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
  getValue,
  createUnaryUnit,
  handleBreakpoints,
  typography,
} from '@mui/system';
import responsivePropType from '@mui/system/responsivePropType';
import { SxProps, Theme } from './Theme.types';

// Palette values should reference the color tokens
export const color = style({
  prop: 'color',
  themeKey: 'sys.color',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'sys.color',
});

export const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'sys.color',
});

const palette = compose(color, bgcolor, backgroundColor);

// Border radius should mapa to md3.shape
export const borderRadius = (props: any) => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'md3.shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = (propValue: any) => ({
      // @ts-ignore
      borderRadius: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};

borderRadius.propTypes =
  process.env.NODE_ENV !== 'production' ? { borderRadius: responsivePropType } : {};

borderRadius.filterProps = ['borderRadius'];
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

const styleFunctionMapping = {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
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
