import * as React from 'react';
import Box from '@mui/joy/Box';
import {
  CssVarsProvider,
  styled,
  VariantProp,
  ColorPaletteProp,
  ShadowProp,
  JoyTheme,
} from '@mui/joy/styles';
import { SystemStyleObject } from '@mui/system';

/**
 * ambientShadow.set(): create ambient context by looking at the parent --variant-shadowChannel
 *
 * ambientShadow.apply($scale): apply --shadowChannel with the ambient variable that connect to the nearest ambient context
 *  - $scale: shadow scale 'xs', ..., 'xl'
 */

const ambientShadow = {
  set(channel?: string) {
    return {
      '--ambient-shadowChannel': channel || 'var(--variant-shadowChannel)',
    };
  },
  apply(scale: ShadowProp) {
    return (theme: JoyTheme): SystemStyleObject<JoyTheme> => ({
      '--joy-shadowChannel': 'var(--ambient-shadowChannel)',
      boxShadow: theme.shadow[scale],
    });
  },
};

const Background = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'color' && prop !== 'sx',
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
  const enableAmbientShadow = true;
  return (
    // @ts-ignore
    <CssVarsProvider
      {...(enableAmbientShadow && {
        theme: {
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  shadowChannel: '177 195 219',
                },
                danger: {
                  shadowChannel: '126 41 7',
                },
              },
            },
          },
          variants: {
            contained: {
              primary: {
                '--variant-shadowChannel': 'var(--joy-palette-primary-shadowChannel)',
              },
              danger: {
                '--variant-shadowChannel': 'var(--joy-palette-danger-shadowChannel)',
              },
            },
            light: {
              primary: {
                '--variant-shadowChannel': 'var(--joy-palette-primary-shadowChannel)',
              },
              danger: {
                '--variant-shadowChannel': 'var(--joy-palette-danger-shadowChannel)',
              },
            },
          },
        },
      })}
    >
      <Background color="primary" sx={ambientShadow.set()}>
        <Box
          sx={{
            ...boxStyle,
            bgcolor: 'primary.100',
            boxShadow: 'xl', // DOES NOT WORK, can't override global var from parent!
          }}
        />
        <Background variant="light" color="primary" sx={[boxStyle, ambientShadow.apply('xl')]} />
      </Background>
      <Background color="danger" variant="contained" sx={ambientShadow.set()}>
        <Background
          color="info"
          sx={[
            {
              borderRadius: 2,
              width: '80%',
              height: '70%',
            },
            ambientShadow.apply('xl'),
          ]}
        >
          <Box sx={[ambientShadow.set('160 189 197'), { display: 'flex', gap: '100px' }]}>
            <Box
              sx={{
                ...boxStyle,
                bgcolor: 'background.body',
                boxShadow: 'xl',
              }}
            />
            <Box
              sx={[
                {
                  ...boxStyle,
                  bgcolor: 'background.body',
                },
                ambientShadow.apply('xl'),
              ]}
            />
          </Box>
        </Background>
      </Background>
    </CssVarsProvider>
  );
}
