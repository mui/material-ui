import {
  getPath,
  getStyleValue as getValue,
  createUnaryUnit,
  handleBreakpoints,
} from '@mui/system';
import { SxConfig, unstable_defaultSxConfig } from '@mui/system';

interface PaletteStyleOptions {
  prop: string;
  cssProperty?: string | boolean;
}

function createPaletteStyle(options: PaletteStyleOptions = { prop: 'color' }) {
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
      let value = getValue(colorThemeMapping, null, propValueFinal);

      if (propValueFinal === value) {
        // haven't found value in colors mapping, so we are checking in the palette mapping
        value = getValue(paletteThemeMapping, null, propValueFinal);
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
  return fn;
}

// Border radius should mapa to md3.shape
export const borderRadiusStyle = (props: any) => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'md3.shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = (propValue: any) => ({
      // @ts-ignore
      borderRadius: transformer(propValue),
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};

const sxConfig: SxConfig = {
  ...unstable_defaultSxConfig,
  color: {
    style: createPaletteStyle({ prop: 'color' }),
  },
  bgcolor: {
    style: createPaletteStyle({ prop: 'bgcolor', cssProperty: 'backgroundColor' }),
  },
  backgroundColor: {
    style: createPaletteStyle({ prop: 'backgroundColor', cssProperty: 'backgroundColor' }),
  },
  borderColor: {
    style: createPaletteStyle({ prop: 'borderColor' }),
  },
  borderTopColor: {
    style: createPaletteStyle({ prop: 'borderTopColor' }),
  },
  borderBottomColor: {
    style: createPaletteStyle({ prop: 'borderBottomColor' }),
  },
  borderLeftColor: {
    style: createPaletteStyle({ prop: 'borderLeftColor' }),
  },
  borderRightColor: {
    style: createPaletteStyle({ prop: 'borderRightColor' }),
  },
  borderRadius: {
    style: borderRadiusStyle,
  },
};

export default sxConfig;
