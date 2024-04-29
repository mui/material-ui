import { padding, margin } from '../spacing';
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

  m: {
    style: margin,
  },
  mt: {
    style: margin,
  },
  mr: {
    style: margin,
  },
  mb: {
    style: margin,
  },
  ml: {
    style: margin,
  },
  mx: {
    style: margin,
  },
  my: {
    style: margin,
  },
  margin: {
    style: margin,
  },
  marginTop: {
    style: margin,
  },
  marginRight: {
    style: margin,
  },
  marginBottom: {
    style: margin,
  },
  marginLeft: {
    style: margin,
  },
  marginX: {
    style: margin,
  },
  marginY: {
    style: margin,
  },
  marginInline: {
    style: margin,
  },
  marginInlineStart: {
    style: margin,
  },
  marginInlineEnd: {
    style: margin,
  },
  marginBlock: {
    style: margin,
  },
  marginBlockStart: {
    style: margin,
  },
  marginBlockEnd: {
    style: margin,
  },

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
