import { padding, margin } from '../spacing';
import { borderRadius, borderTransform } from '../borders';
import { gap, rowGap, columnGap } from '../cssGrid';
import { paletteTransform } from '../palette';
import { maxWidth, sizingTransform } from '../sizing';

const border = { themeKey: 'borders', transform: borderTransform };
const palette = { themeKey: 'palette' };
const pad = { style: padding };
const mar = { style: margin };
const sizing = { transform: sizingTransform };
const typography = { themeKey: 'typography' };
const empty = {};

const defaultSxConfig = {
  // borders
  border,
  borderTop: border,
  borderRight: border,
  borderBottom: border,
  borderLeft: border,
  outline: border,
  borderColor: palette,
  borderTopColor: palette,
  borderRightColor: palette,
  borderBottomColor: palette,
  borderLeftColor: palette,
  outlineColor: palette,

  borderRadius: {
    themeKey: 'shape.borderRadius',
    style: borderRadius,
  },

  // palette
  color: { themeKey: 'palette', transform: paletteTransform },
  bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: paletteTransform },
  backgroundColor: { themeKey: 'palette', transform: paletteTransform },

  // spacing
  p: pad,
  pt: pad,
  pr: pad,
  pb: pad,
  pl: pad,
  px: pad,
  py: pad,
  padding: pad,
  paddingTop: pad,
  paddingRight: pad,
  paddingBottom: pad,
  paddingLeft: pad,
  paddingX: pad,
  paddingY: pad,
  paddingInline: pad,
  paddingInlineStart: pad,
  paddingInlineEnd: pad,
  paddingBlock: pad,
  paddingBlockStart: pad,
  paddingBlockEnd: pad,

  m: mar,
  mt: mar,
  mr: mar,
  mb: mar,
  ml: mar,
  mx: mar,
  my: mar,
  margin: mar,
  marginTop: mar,
  marginRight: mar,
  marginBottom: mar,
  marginLeft: mar,
  marginX: mar,
  marginY: mar,
  marginInline: mar,
  marginInlineStart: mar,
  marginInlineEnd: mar,
  marginBlock: mar,
  marginBlockStart: mar,
  marginBlockEnd: mar,

  // display
  displayPrint: {
    cssProperty: false,
    transform: (value) => ({
      '@media print': {
        display: value,
      },
    }),
  },
  display: empty,
  overflow: empty,
  textOverflow: empty,
  visibility: empty,
  whiteSpace: empty,

  // flexbox
  flexBasis: empty,
  flexDirection: empty,
  flexWrap: empty,
  justifyContent: empty,
  alignItems: empty,
  alignContent: empty,
  order: empty,
  flex: empty,
  flexGrow: empty,
  flexShrink: empty,
  alignSelf: empty,
  justifyItems: empty,
  justifySelf: empty,

  // grid
  gap: { style: gap },
  rowGap: { style: rowGap },
  columnGap: { style: columnGap },
  gridColumn: empty,
  gridRow: empty,
  gridAutoFlow: empty,
  gridAutoColumns: empty,
  gridAutoRows: empty,
  gridTemplateColumns: empty,
  gridTemplateRows: empty,
  gridTemplateAreas: empty,
  gridArea: empty,

  // positions
  position: empty,
  zIndex: { themeKey: 'zIndex' },
  top: empty,
  right: empty,
  bottom: empty,
  left: empty,

  // shadows
  boxShadow: { themeKey: 'shadows' },

  // sizing
  width: sizing,
  minWidth: sizing,
  height: sizing,
  maxHeight: sizing,
  minHeight: sizing,
  maxWidth: { style: maxWidth },
  boxSizing: empty,

  // typography
  font: { themeKey: 'font' },
  fontFamily: typography,
  fontSize: typography,
  fontStyle: typography,
  fontWeight: typography,
  letterSpacing: empty,
  textTransform: empty,
  lineHeight: empty,
  textAlign: empty,
  typography: { cssProperty: false, themeKey: 'typography' },
};

export default defaultSxConfig;
