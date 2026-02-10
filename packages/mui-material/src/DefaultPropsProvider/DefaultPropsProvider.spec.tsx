import * as React from 'react';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

function CustomComponent() {
  return null;
}

<DefaultPropsProvider
  value={{
    MuiSelect: {
      IconComponent: CustomComponent,
    },
  }}
/>;

<DefaultPropsProvider
  value={{
    // @ts-expect-error
    Random: {},
  }}
/>;
