import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';

export default function InjectFirst() {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Typography variant="h1">Hello MUI v6</Typography>
      <Typography>The background should be red</Typography>
      <GlobalStyles styles={() => ({ body: { backgroundColor: 'red' } })} />
    </StyledEngineProvider>
  );
}
