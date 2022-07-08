import * as React from 'react';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';

interface SelectionProps extends BoxProps {
  bg?: 'white' | 'comfort' | 'dim' | 'gradient';
}

export default function Section(props: SelectionProps) {
  const { bg = 'white', children, sx, ...other } = props;

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
        ...sx,
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
}
