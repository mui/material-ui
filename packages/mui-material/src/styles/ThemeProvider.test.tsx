import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import {
  ThemeProvider,
  createTheme,
  useTheme,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import Button from '@mui/material/Button';

describe('ThemeProvider', () => {
  const { render } = createRenderer();

  it('When theme is a function, it should not show warning', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={() => ({})} />
        </ThemeProvider>,
      ),
    ).not.toWarnDev();
  });

  it('should have `vars` as null for nested non-vars theme', () => {
    const upperTheme = extendTheme();
    const nestedTheme = createTheme({
      palette: {
        // @ts-ignore
        ochre: {
          main: '#E3D026',
          light: '#E9DB5D',
          dark: '#A29415',
          contrastText: '#242105',
        },
      },
    });
    let theme: any;
    function Component() {
      theme = useTheme();
      return <Button>Button</Button>;
    }
    render(
      <ThemeProvider theme={upperTheme}>
        <ThemeProvider theme={nestedTheme}>
          <Component />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(theme.vars).to.equal(null);
  });
});
