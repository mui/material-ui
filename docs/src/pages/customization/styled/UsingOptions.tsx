import * as React from 'react';
import {
  styled,
  createTheme,
  ThemeProvider,
  ComponentsVariants,
  ComponentsOverrides,
} from '@material-ui/core/styles';

interface MyThemeComponentProps {
  color?: 'primary' | 'secondary';
  variant?: 'normal' | 'dashed';
}

interface CustomComponentNameToClassKey {
  MyThemeComponent: 'root' | 'primary' | 'secondary';
}

interface CustomComponentsPropsList {
  MyThemeComponent?: MyThemeComponentProps;
}

interface CustomComponents {
  MyThemeComponent?: {
    styleOverrides?: ComponentsOverrides['MyThemeComponent'];
    variants?: ComponentsVariants['MyThemeComponent'];
  };
}

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends CustomComponentNameToClassKey {}
}

declare module '@material-ui/core/styles/props' {
  interface ComponentsPropsList extends CustomComponentsPropsList {}
}

declare module '@material-ui/core/styles/components' {
  interface Components extends CustomComponents {}
}

const customTheme = createTheme({
  components: {
    MyThemeComponent: {
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

const MyThemeComponent = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'variant',
  name: 'MyThemeComponent',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => ({
    ...styles.root,
    ...(props.color === 'primary' && styles.primary),
    ...(props.color === 'secondary' && styles.secondary),
  }),
})<MyThemeComponentProps>(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1),
}));

export default function UsingOptions() {
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent sx={{ m: 1 }} color="primary" variant="dashed">
        Primary
      </MyThemeComponent>
      <MyThemeComponent sx={{ m: 1 }} color="secondary">
        Secondary
      </MyThemeComponent>
    </ThemeProvider>
  );
}
