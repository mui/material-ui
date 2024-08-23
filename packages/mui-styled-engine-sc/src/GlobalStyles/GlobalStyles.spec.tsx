import * as React from 'react';
import {
  GlobalStyles as SCGlobalStyles,
  GlobalStylesProps as SCGlobalStylesProps,
} from '@mui/styled-engine-sc';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: '#f00',
    secondary: '#ff00',
  },
};

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: SCGlobalStylesProps<Theme>['styles'];
}

function GlobalStyles(props: GlobalStylesProps): React.ReactElement<any> {
  return <SCGlobalStyles {...props} defaultTheme={defaultTheme} />;
}

function Test() {
  <GlobalStyles
    styles={(theme) => ({
      color: theme.colors.primary,
      // @ts-expect-error tertiary color doesn't exist
      backgroundColor: theme.colors.tertiary,
    })}
  />;
}
