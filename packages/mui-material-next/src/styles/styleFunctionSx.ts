import {
  Interpolation,
  unstable_createStyleFunctionSx,
  compose,
  getPath,
  getStyleValue as getValue,
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
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  createUnaryUnit,
  handleBreakpoints,
  responsivePropType,
  typography,
} from '@mui/system';
import { SxProps, Theme } from './Theme.types';

interface PaletteStyleOptions {
  prop: string;
  cssProperty?: string | boolean;
}

function paletteStyle(options: PaletteStyleOptions = { prop: 'color' }) {
  const { prop, cssProperty = options.prop } = options;

  const fn = (props: Record<string, any>) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue: any = props[prop];
    const theme = props.theme;
    const colorThemeMapping = getPath(theme, 'sys.color') || {};
    const paletteThemeMapping = getPath(theme, 'ref.palette') || {};

    const styleFromPropValue = (propValueFinal: any) => {
      // check the value in the color mapping first
      let value = getValue(colorThemeMapping, undefined, propValueFinal);

      if (propValueFinal === value) {
        // haven't found value in colors mapping, so we are checking in the palette mapping
        value = getValue(paletteThemeMapping, undefined, propValueFinal);
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty as string]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          [prop]: responsivePropType,
        }
      : {};

  fn.filterProps = [prop];

  return fn;
}

// Palette values should reference the color tokens
export const color = paletteStyle({
  prop: 'color',
});

export const bgcolor = paletteStyle({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
});

export const backgroundColor = paletteStyle({
  prop: 'backgroundColor',
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

const borderColor = paletteStyle({
  prop: 'borderColor',
});

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
