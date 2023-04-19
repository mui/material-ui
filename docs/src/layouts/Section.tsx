import * as React from 'react';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';

interface SelectionProps extends BoxProps {
  bg?: 'white' | 'comfort' | 'dim' | 'gradient';
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
                background: `linear-gradient(180deg, #FFF 0%, ${
                  (theme.vars || theme).palette.grey[50]
                } 100%)`,
                ...theme.applyDarkStyles({
                  background: `linear-gradient(180deg, ${
                    (theme.vars || theme).palette.primaryDark[800]
                  } 0%, ${(theme.vars || theme).palette.primaryDark[700]} 100%)`,
                }),
              }
            : {
                bgcolor: map[bg].light,
                ...theme.applyDarkStyles({
                  bgcolor: map[bg].dark,
                }),
              }),
          py: cozy ? { xs: 6, sm: 10, md: 12 } : { xs: 4, sm: 12, md: 16 },
          overflow: 'hidden',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container>{children}</Container>
    </Box>
  );
}
