import PropsProvider from '@mui/material/PropsProvider';

function CustomComponent() {
  return null;
}

<PropsProvider
  value={{
    MuiSelect: {
      defaultProps: {
        IconComponent: CustomComponent,
      },
    },
  }}
/>;

<PropsProvider
  value={{
    // @ts-expect-error
    Random: {},
  }}
/>;
