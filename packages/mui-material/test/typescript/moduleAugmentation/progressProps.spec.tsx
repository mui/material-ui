import * as React from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    customCircularColor: true;
  }
}
declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    customLinearColor: true;
  }
}

<CircularProgress color="customCircularColor" />;

// @ts-expect-error unknown color
<CircularProgress color="foo" />;

<LinearProgress color="customLinearColor" />;

// @ts-expect-error unknown color
<LinearProgress color="foo" />;
