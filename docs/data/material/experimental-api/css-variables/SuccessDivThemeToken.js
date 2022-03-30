import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useTheme,
} from '@mui/material/styles';

function SuccessDiv() {
  const theme = useTheme();
  return <div style={{ color: theme.palette.success.main }}>Success div</div>;
}

export default function App() {
  return (
    <CssVarsProvider>
      <SuccessDiv />
    </CssVarsProvider>
  );
}
