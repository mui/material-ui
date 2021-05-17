import * as React from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';

declare module '@material-ui/core/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    customCircularColor: true;
  }
}
declare module '@material-ui/core/LinearProgress' {
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
