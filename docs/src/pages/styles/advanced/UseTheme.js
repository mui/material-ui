import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/styles';

function DeepChild() {
  const theme = useTheme();

  return <span>{`spacing ${theme.spacing}`}</span>;
}

export default function UseTheme() {
  return (
    <ThemeProvider
      theme={{
        spacing: '8px',
      }}
    >
      <DeepChild />
    </ThemeProvider>
  );
}
