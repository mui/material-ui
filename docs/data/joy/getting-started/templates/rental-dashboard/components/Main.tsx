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
      sx={{
        flex: 1,
      }}
    >
      {children}
    </Box>
  );
}
