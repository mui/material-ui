import * as React from 'react';
import { AppBar } from '@material-ui/core';

declare module '@material-ui/core/AppBar' {
  interface AppBarPropsColorOverrides {
    customAppBarColor: true;
  }
}

<AppBar color="customAppBarColor" />;

// @ts-expect-error unknown color
<AppBar color="foo" />;
