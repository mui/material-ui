import { getPath, handleBreakpoints, SxConfig, unstable_defaultSxConfig } from '@mui/system';

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
};

export default sxConfig;
