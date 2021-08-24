import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box, { BoxProps } from '@material-ui/core/Box';

export default function Section({
  bg = 'white',
  ...props
}: { bg?: 'white' | 'comfort' | 'dim' | 'gradient' } & BoxProps) {
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
      {...props}
      sx={{
        ...(bg === 'gradient'
          ? {
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                  : `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, #FFFFFF 100%)`,
            }
          : {
              bgcolor: (theme) => map[bg][theme.palette.mode],
            }),
        py: { xs: 4, sm: 6, md: 8 },
        overflow: 'hidden',
        ...props.sx,
      }}
    >
      <Container>{props.children}</Container>
    </Box>
  );
}
