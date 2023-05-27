import * as React from 'react';
import Box from '@mui/joy/Box';

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <Box
      component="main"
      className="MainContent"
      sx={(theme) => ({
        px: {
          xs: 2,
          md: 6,
        },
        pt: {
          xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
          sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
          md: 3,
        },
        pb: {
          xs: 2,
          sm: 2,
          md: 3,
        },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      })}
    >
      {children}
    </Box>
  );
}
