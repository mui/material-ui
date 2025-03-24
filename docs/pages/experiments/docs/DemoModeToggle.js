import * as React from 'react';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ColorModeSelect() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) => setMode(event.target.value)}
      MenuProps={{ disablePortal: true }}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    cssVarPrefix: 'demo',
    colorSchemeSelector: 'class',
  },
});

export default function DemoInDocs(props) {
  return (
    <ThemeProvider {...props} theme={theme}>
      <Paper
        component="form"
        sx={{
          p: 2,
          my: 2,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <ColorModeSelect />
        <Alert>This is an alert! Try changing the selection above</Alert>
      </Paper>
    </ThemeProvider>
  );
}
