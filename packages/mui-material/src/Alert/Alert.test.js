import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper, { paperClasses } from '@mui/material/Paper';
import { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';

describe('<Alert />', () => {
  const { render } = createRenderer();

  describeConformance(<Alert onClose={() => {}} />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAlert',
    testVariantProps: { variant: 'standard', color: 'success' },
    testDeepOverrides: { slotName: 'message', slotClassName: classes.message },
    testLegacyComponentsProp: true,
    slots: {
      closeButton: {},
      closeIcon: {},
    },
    skip: [
      'componentsProp',
      'slotPropsCallback', // not supported yet
    ],
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

  describe('prop: components', () => {
    it('should override the default icon used in the close action', () => {
      function MyCloseIcon() {
        return <div data-testid="closeIcon">X</div>;
      }

      render(
        <Alert onClose={() => {}} components={{ CloseIcon: MyCloseIcon }}>
          Hello World
        </Alert>,
      );

      expect(screen.getByTestId('closeIcon')).toBeVisible();
    });

    it('should override the default button used in the close action', () => {
      function MyCloseButton() {
        return <button data-testid="closeButton">X</button>;
      }

      render(
        <Alert onClose={() => {}} components={{ CloseButton: MyCloseButton }}>
          Hello World
        </Alert>,
      );

      expect(screen.getByTestId('closeButton')).toBeVisible();
    });
  });

  describe('prop: componentsProps', () => {
    it('should apply the props on the close IconButton component', () => {
      render(
        <Alert
          onClose={() => {}}
          componentsProps={{
            closeButton: {
              'data-testid': 'closeButton',
              size: 'large',
              className: 'my-class',
            },
          }}
        >
          Hello World
        </Alert>,
      );

      const closeIcon = screen.getByTestId('closeButton');
      expect(closeIcon).to.have.class(iconButtonClasses.sizeLarge);
      expect(closeIcon).to.have.class('my-class');
    });

    it('should apply the props on the close SvgIcon component', () => {
      render(
        <Alert
          onClose={() => {}}
          componentsProps={{
            closeIcon: {
              'data-testid': 'closeIcon',
              fontSize: 'large',
              className: 'my-class',
            },
          }}
        >
          Hello World
        </Alert>,
      );

      const closeIcon = screen.getByTestId('closeIcon');
      expect(closeIcon).to.have.class(svgIconClasses.fontSizeLarge);
      expect(closeIcon).to.have.class('my-class');
    });
  });
});
