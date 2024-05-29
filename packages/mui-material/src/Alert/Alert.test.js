import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper, { paperClasses } from '@mui/material/Paper';
import { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';
import describeConformance from '../../test/describeConformance';
import capitalize from '../utils/capitalize';

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
      closeButton: {
        expectedClassName: classes.closeButton,
      },
      closeIcon: {
        expectedClassName: classes.closeIcon,
      },
    },
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

    it('should render the action provided into the Alert', () => {
      render(<Alert action={<button data-testid="action">Action</button>}>Hello World</Alert>);

      expect(screen.getByTestId('action')).toBeVisible();
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

  describe('prop: icon', () => {
    it('should render the icon provided into the Alert', () => {
      render(<Alert icon={<div data-testid="icon" />}>Hello World</Alert>);

      expect(screen.getByTestId('icon')).toBeVisible();
    });

    it('should not render any icon if false is provided', () => {
      render(
        <Alert
          icon={false}
          severity="success"
          iconMapping={{ success: <div data-testid="success-icon" /> }}
        >
          Hello World
        </Alert>,
      );

      expect(screen.queryByTestId('success-icon')).to.eq(null);
    });
  });

  describe('prop: iconMapping', () => {
    const severities = ['success', 'info', 'warning', 'error'];
    const iconMapping = severities.reduce((acc, severity) => {
      acc[severity] = <div data-testid={`${severity}-icon`} />;
      return acc;
    }, {});

    severities.forEach((severity) => {
      it(`should render the icon provided into the Alert for severity ${severity}`, () => {
        render(
          <Alert severity={severity} iconMapping={iconMapping}>
            Hello World
          </Alert>,
        );

        expect(screen.getByTestId(`${severity}-icon`)).toBeVisible();
      });
    });
  });

  describe('classes', () => {
    it('should apply default color class to the root', () => {
      render(<Alert data-testid="alert" />);

      expect(screen.getByTestId('alert')).to.have.class(classes.colorSuccess);
    });

    ['success', 'info', 'warning', 'error'].forEach((color) => {
      it('should apply color classes to the root', () => {
        render(<Alert data-testid="alert" color={color} />);

        expect(screen.getByTestId('alert')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });
});
