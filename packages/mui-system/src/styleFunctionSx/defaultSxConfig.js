import { unstable_capitalize as capitalize } from '@mui/utils';
import { getValue } from '../style';
import { handleBreakpoints } from '../breakpoints';
import { paddingKeys, padding, marginKeys, margin } from '../spacing';
import { borderRadius, borderTransform } from '../borders';
import { gap, rowGap, columnGap } from '../cssGrid';
import { paletteTransform } from '../palette';
import { maxWidth, sizingTransform } from '../sizing';

const defaultSxConfig = {
  // borders
  border: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  borderTop: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  borderRight: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  borderBottom: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  borderLeft: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  borderColor: {
    themeKey: 'palette',
  },

  borderTopColor: {
    themeKey: 'palette',
  },

  borderRightColor: {
    themeKey: 'palette',
  },

  borderBottomColor: {
    themeKey: 'palette',
  },

  borderLeftColor: {
    themeKey: 'palette',
  },

  borderRadius: {
    themeKey: 'shape.borderRadius',
    style: borderRadius,
  },

  // palette
  color: {
    themeKey: 'palette',
    transform: paletteTransform,
  },
  bgcolor: {
    themeKey: 'palette',
    cssProperty: 'backgroundColor',
    transform: paletteTransform,
  },
  backgroundColor: {
    themeKey: 'palette',
    transform: paletteTransform,
  },

  // spacing
  ...paddingKeys.reduce((styleDefinitions, paddingKey) => {
    return {
      ...styleDefinitions,
      [paddingKey]: {
        style: padding,
      },
    };
  }, {}),

  ...marginKeys.reduce((styleDefinitions, marginKey) => {
    return {
      ...styleDefinitions,
      [marginKey]: {
        style: margin,
      },
    };
  }, {}),

  // display
  displayPrint: {
    cssProperty: false,
    transform: (value) => ({
      '@media print': {
        display: value,
      },
    }),
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},

  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},

  // grid
  gap: {
    style: gap,
  },
  rowGap: {
    style: rowGap,
  },
  columnGap: {
    style: columnGap,
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},

  // positions
  position: {},
  zIndex: {
    themeKey: 'zIndex',
  },
  top: {},
  right: {},
  bottom: {},
  left: {},

  // shadows
  boxShadow: {
    prop: 'boxShadow',
    themeKey: 'shadows',
  },

  // sizing
  width: {
    transform: sizingTransform,
  },
  maxWidth: {
    style: maxWidth,
  },
  minWidth: {
    transform: sizingTransform,
  },
  height: {
    transform: sizingTransform,
  },
  maxHeight: {
    transform: sizingTransform,
  },
  minHeight: {
    transform: sizingTransform,
  },
  size: {
    style: (props) => {
      const { size } = props;
      // no mapping
      const themeMapping = {};

      const styleFromPropValue = (propValueFinal) => {
        let value = getValue({ themeMapping }, sizingTransform, propValueFinal);

        if (propValueFinal === value && typeof propValueFinal === 'string') {
          // Haven't found value
          value = getValue(
            themeMapping,
            sizingTransform,
            `size${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
            propValueFinal,
          );
        }

        return {
          width: value,
          height: value,
        };
      };

      return handleBreakpoints(props, size, styleFromPropValue);
    },
  },
  boxSizing: {},

  // typography
  fontFamily: {
    themeKey: 'typography',
  },
  fontSize: {
    themeKey: 'typography',
  },
  fontStyle: {
    themeKey: 'typography',
  },
  fontWeight: {
    themeKey: 'typography',
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: false,
    themeKey: 'typography',
  },
};

export default defaultSxConfig;
