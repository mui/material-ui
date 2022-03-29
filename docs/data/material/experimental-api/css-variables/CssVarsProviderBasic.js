import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useTheme,
} from '@mui/material/styles';

function ThemeConsumer() {
  const theme = useTheme();
  return (
    <div>
      <Typography>Regular theme token: </Typography>
      <code style={{ color: theme.palette.primary.main }}>
        theme.palette.primary.main = {theme.palette.primary.main}
      </code>
      <Typography sx={{ mt: 2 }}>Theme CSS variable token: </Typography>
      <code style={{ color: theme.vars.palette.primary.main }}>
        theme.vars.palette.primary.main = {theme.vars.palette.primary.main}
      </code>
    </div>
  );
}

export default function App() {
  return (
    <CssVarsProvider>
      <ThemeConsumer />
    </CssVarsProvider>
  );
}
