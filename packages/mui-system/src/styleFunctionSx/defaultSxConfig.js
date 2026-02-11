import { padding, margin } from '../spacing';
import { borderRadius, borderTransform } from '../borders';
import { gap, rowGap, columnGap } from '../cssGrid';
import { paletteTransform } from '../palette';
import { maxWidth, sizingTransform } from '../sizing';

const defaultStyles = {
  padding: {
    style: padding,
  },
  margin: {
    style: margin,
  },
};

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

  outline: {
    themeKey: 'borders',
    transform: borderTransform,
  },

  outlineColor: {
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
  p: {
    style: padding,
  },
  pt: {
    style: padding,
  },
  pr: {
    style: padding,
  },
  pb: {
    style: padding,
  },
  pl: {
    style: padding,
  },
  px: {
    style: padding,
  },
  py: {
    style: padding,
  },
  padding: {
    style: padding,
  },
  paddingTop: {
    style: padding,
  },
  paddingRight: {
    style: padding,
  },
  paddingBottom: {
    style: padding,
  },
  paddingLeft: {
    style: padding,
  },
  paddingX: {
    style: padding,
  },
  paddingY: {
    style: padding,
  },
  paddingInline: {
    style: padding,
  },
  paddingInlineStart: {
    style: padding,
  },
  paddingInlineEnd: {
    style: padding,
  },
  paddingBlock: {
    style: padding,
  },
  paddingBlockStart: {
    style: padding,
  },
  paddingBlockEnd: {
    style: padding,
  },

  m: defaultStyles.margin,
  mt: defaultStyles.margin,
  mr: defaultStyles.margin,
  mb: defaultStyles.margin,
  ml: defaultStyles.margin,
  mx: defaultStyles.margin,
  my: defaultStyles.margin,
  margin: defaultStyles.margin,
  marginTop: defaultStyles.margin,
  marginRight: defaultStyles.margin,
  marginBottom: defaultStyles.margin,
  marginLeft: defaultStyles.margin,
  marginX: defaultStyles.margin,
  marginY: defaultStyles.margin,
  marginInline: defaultStyles.margin,
  marginInlineStart: defaultStyles.margin,
  marginInlineEnd: defaultStyles.margin,
  marginBlock: defaultStyles.margin,
  marginBlockStart: defaultStyles.margin,
  marginBlockEnd: defaultStyles.margin,

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
  boxSizing: {},

  // typography
  font: {
    themeKey: 'font',
  },
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
