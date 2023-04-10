import * as React from 'react';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';

interface SelectionProps extends BoxProps {
  bg?: 'white' | 'comfort' | 'dim' | 'gradient' | 'gradient-reverse';
  /**
   * More spacing
   */
  cozy?: boolean;
}

export default function Section(props: SelectionProps) {
  const { bg = 'white', children, sx, cozy = false, ...other } = props;

  const map = {
    white: {
      light: 'common.white',
      dark: 'primaryDark.800',
    },
    comfort: {
      light: 'grey.50',
      dark: 'primaryDark.900',
    },
    dim: {
      light: 'primaryDark.700',
      dark: 'primaryDark.700',
    },
  };

  return (
    <Box
      {...other}
      sx={[
        (theme) => ({
          ...(bg === 'gradient'
            ? {
                background: `linear-gradient(180deg, ${
                  (theme.vars || theme).palette.grey[50]
                } 0%, #FFFFFF 100%)`,
                ...theme.applyDarkStyles({
                  background: `linear-gradient(180deg, ${
                    (theme.vars || theme).palette.primaryDark[900]
                  } 0%, #001E3C 100%)`,
                }),
              }
            : {}),
          ...(bg === 'gradient-reverse'
            ? {
                background: `linear-gradient(180deg, #FFFFFF, ${
                  (theme.vars || theme).palette.grey[50]
                })`,
                ...theme.applyDarkStyles({
                  background: `linear-gradient(180deg, #001E3C, ${
                    (theme.vars || theme).palette.primaryDark[900]
                  })`,
                }),
              }
            : {}),
          ...((bg === 'white' || bg === 'comfort' || bg === 'dim') && {
            bgcolor: map[bg].light,
            ...theme.applyDarkStyles({
              bgcolor: map[bg].dark,
            }),
          }),
          py: cozy ? { xs: 6, sm: 10, md: 12 } : { xs: 4, sm: 6, md: 8 },
          overflow: 'hidden',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container>{children}</Container>
    </Box>
  );
}
