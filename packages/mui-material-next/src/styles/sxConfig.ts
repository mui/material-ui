import {
  getPath,
  handleBreakpoints,
  SxConfig,
  unstable_defaultSxConfig,
  createUnaryUnit,
  getValue,
} from '@mui/system';

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

    const styleFromPropValue = (propValueFinal: any) => {
      const value =
        getPath(theme, `sys.color.${propValueFinal}`, true) ||
        getPath(theme, `ref.palette.${propValueFinal}`, true) ||
        getPath(theme, `palette.${propValueFinal}`, true) ||
        propValueFinal;

      return {
        [cssProperty as string]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  return fn;
}

// eslint-disable-next-line no-restricted-globals
const isNumber = (value: string | number) => typeof value === 'number' || !isNaN(parseFloat(value));

const createBorderRadiusStyle = (props: Record<string, any>) => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const numberTransformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = (propValue: string | number) => ({
      borderRadius: isNumber(propValue)
        ? getValue(numberTransformer, propValue)
        : getPath(props.theme, `sys.shape.corner.${propValue}`, true),
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
    style: createBorderRadiusStyle,
  },
};

export default sxConfig;
