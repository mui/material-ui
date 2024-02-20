import * as React from 'react';
import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ZIndex {
    appbar: number;
  }
}

const theme = extendTheme({
  zIndex: {
    appbar: 1000,
  },
});

function App() {
  return <div style={{ zIndex: theme.zIndex.appbar }}>{`My zIndex is ${theme.zIndex.appbar}`}</div>;
}
