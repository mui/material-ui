import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

export default function Highlighter({
  children,
  disableBorder = false,
  selected = false,
  selectedBg = 'white',
  onClick,
  sx,
}: {
  disableBorder?: boolean;
  selectedBg?: 'white' | 'comfort';
  children: React.ReactNode;
  selected?: boolean;
  onClick?: BoxProps['onClick'];
  sx?: BoxProps['sx'];
}) {
  const lightSelectedBg = {
    white: '#fff',
    comfort: 'grey.50',
  };
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        borderRadius: 1,
        height: '100%',
        border: '1px solid transparent',
        ...((!disableBorder || selected) && {
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
        }),
        ...(selected && {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : lightSelectedBg[selectedBg],
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.300' : 'grey.200'),
        }),
        ...(!selected && {
          '&:hover': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
