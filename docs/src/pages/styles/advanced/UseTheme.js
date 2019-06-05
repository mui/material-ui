import React from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';

function DeepChild() {
  const theme = useTheme();

  return <span>{`spacing ${theme.spacing}`}</span>;
}

function UseTheme() {
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

export default UseTheme;
