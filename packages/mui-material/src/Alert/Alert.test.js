import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper, { paperClasses } from '@mui/material/Paper';

describe('<Alert />', () => {
  const { render } = createRenderer();

  describeConformance(<Alert />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAlert',
    testVariantProps: { variant: 'standard', color: 'success' },
    testDeepOverrides: { slotName: 'message', slotClassName: classes.message },
    skip: ['componentsProp'],
  }));

  describe('prop: square', () => {
    it('should have rounded corners by default', () => {
      render(<Alert data-testid="root">Hello World</Alert>);

      expect(screen.getByTestId('root')).to.have.class(paperClasses.rounded);
    });

    it('should disable rounded corners with square prop', () => {
      render(
        <Alert data-testid="root" square>
          Hello World
        </Alert>,
      );

      expect(screen.getByTestId('root')).not.to.have.class(paperClasses.rounded);
    });
  });

  describe('prop: action', () => {
    it('using ownerState in styleOverrides should not throw', () => {
      const theme = createTheme({
        components: {
          MuiAlert: {
            styleOverrides: {
              root: (props) => {
                return {
                  ...(props.ownerState.variant === 'filled' && {
                    border: '1px red solid',
                  }),
                };
              },
            },
          },
        },
      });

      expect(() =>
        render(
          <ThemeProvider theme={theme}>
            <Alert action={<button>Action</button>}>Alert</Alert>
          </ThemeProvider>,
        ),
      ).not.to.throw();
    });
  });
});
