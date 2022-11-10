import * as React from 'react';
import {
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
import { CssVarsProvider, styled, extendTheme } from '@mui/joy/styles';
import Container from '@mui/joy/Container';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

// The default system themeKey is shape
const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'radius',
});

const radius = style({
  prop: 'radius',
  themeKey: 'radius',
  cssProperty: 'borderRadius',
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

const shadow = style({
  prop: 'shadow',
  themeKey: 'shadow',
  cssProperty: 'boxShadow',
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
  shadow,
  typography,
  radius,
};

const styleFunctionSx = unstable_createStyleFunctionSx(styleFunctionMapping);

styleFunctionSx.filterProps = ['sx'];

const Div = styled('div')(({ theme }) =>
  theme.sx({
    my: 3,
    width: 100,
    height: 100,
    bgcolor: 'background.surface',
    border: '1px solid',
    borderColor: 'neutral.500',
  }),
);

const customTheme = extendTheme({
  sx(styles) {
    return styleFunctionSx({ sx: styles, theme: this });
  },
});

// console.log(
//   customTheme.sx({
//     my: 3,
//     width: 100,
//     height: 100,
//     bgcolor: 'background.surface',
//     border: '1px solid',
//     borderColor: 'neutral.500',
//     radius: 'sm',
//     shadow: 'md',
//   }),
// );

export default function ThemeSx() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Container>
        <CssBaseline />
        <Box
          // radius="sm"
          sx={(theme) =>
            theme.sx({
              my: 3,
              width: 100,
              height: 100,
              bgcolor: 'background.surface',
              border: '1px solid',
              borderColor: 'neutral.500',
              radius: 'sm',
              shadow: 'md',
            })
          }
        />
        <Div
          sx={{
            radius: 'sm',
            shadow: 'md',
          }}
        />
      </Container>
    </CssVarsProvider>
  );
}
