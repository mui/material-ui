import * as React from 'react';
import {
  experimentalStyled as styled,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

// You need to use module augmentation for the Theme type
const theme = createTheme({
  components: {
    // @ts-ignore
    MuiTest: {
      styleOverrides: {
        root: {
          color: 'darkslategray',
        },
        primary: {
          color: 'darkblue',
        },
        secondary: {
          color: 'darkred',
          backgroundColor: 'pink',
        },
      },
      variants: [
        {
          props: { variant: 'dashed', color: 'primary' },
          style: {
            border: '1px dashed darkblue',
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: '1px dashed darkred',
          },
        },
      ],
    },
  },
});

const MyThemeComponent = styled(
  'div',
  {},
  {
    name: 'MuiTest',
    slot: 'Root',
    // you are specifying here how the styleOverrides are being applied based on props
    overridesResolver: (props, styles) => ({
      ...styles.root,
      ...(props.color === 'primary' && styles.primary),
      ...(props.color === 'secondary' && styles.secondary),
    }),
  },
)(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));

export default function StyledComponents() {
  return (
    <ThemeProvider theme={theme}>
      <MyThemeComponent sx={{ m: 1 }} color="primary" variant="dashed">
        Primary
      </MyThemeComponent>
      <MyThemeComponent sx={{ m: 1 }} color="secondary">
        Secondary
      </MyThemeComponent>
    </ThemeProvider>
  );
}
