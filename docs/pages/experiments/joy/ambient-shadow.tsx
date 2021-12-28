import * as React from 'react';
import Box from '@mui/joy/Box';
import { CssVarsProvider, styled, VariantProp, ColorPaletteProp } from '@mui/joy/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ambientShadow(channel?: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return () => ({
    // needs target children to make nested ambient shadow works
    '& > *': {
      '--joy-shadowChannel': channel as React.CSSProperties,
    },
  });
}

const Background = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'color',
})<{
  variant?: VariantProp;
  color?: ColorPaletteProp;
}>(({ theme, variant = 'light', color = 'neutral' }) => [
  theme.variants[variant][color],
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '100px',
    height: '60vh',
  },
]);

export default function RealisticShadow() {
  const boxStyle = {
    width: 200,
    height: 200,
    borderRadius: 2,
  };
  return (
    <CssVarsProvider>
      <Background>
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-background-body'),
            boxShadow: theme.getThemeVar('shadow-xl'),
          })}
        />
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-background-body'),
            boxShadow: theme.getThemeVar('shadow-xl'),
          })}
        />
      </Background>
      <Background color="primary" sx={[ambientShadow('177 195 219')]}>
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-primary-100'),
            boxShadow: theme.getThemeVar('shadow-xl'), // DOES NOT WORK, can't override global var from parent!
          })}
        />
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-primary-100'),
            boxShadow: theme.shadow.xl, // This works, the variable must not be referenced.
          })}
        />
      </Background>
      <Background
        color="success"
        sx={[
          // 2 options
          // - calculated by algorithm
          // - handpicked and query from theme
          ambientShadow('171 196 176'),
        ]}
      >
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-success-100'),
            boxShadow: theme.getThemeVar('shadow-xl'),
          })}
        />
        <Box
          sx={(theme) => ({
            ...boxStyle,
            bgcolor: theme.getThemeVar('palette-success-100'),
            boxShadow: theme.shadow.xl,
          })}
        />
      </Background>
      <Background
        color="danger"
        variant="contained"
        sx={[
          // 2 options
          // - calculated by algorithm
          // - handpicked and query from theme
          ambientShadow('126 41 7'),
        ]}
      >
        <Background
          color="info"
          sx={[
            (theme) => ({
              borderRadius: 2,
              width: '80%',
              height: '70%',
              boxShadow: theme.shadow.xl,
            }),
            ambientShadow('160 189 197'),
          ]}
        >
          <Box
            sx={(theme) => ({
              ...boxStyle,
              bgcolor: theme.getThemeVar('palette-background-body'),
              boxShadow: theme.getThemeVar('shadow-xl'),
            })}
          />
          <Box
            sx={(theme) => ({
              ...boxStyle,
              bgcolor: theme.getThemeVar('palette-background-body'),
              boxShadow: theme.shadow.xl,
            })}
          />
        </Background>
      </Background>
    </CssVarsProvider>
  );
}
