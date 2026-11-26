import * as React from 'react';
import { spy } from 'sinon';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, getContrastRatio } from '@mui/material/styles';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper, { paperClasses } from '@mui/material/Paper';
import { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';
import AlarmIcon from '@mui/icons-material/Alarm';
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
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      icon: {
        expectedClassName: classes.icon,
      },
      message: {
        expectedClassName: classes.message,
      },
      action: {
        expectedClassName: classes.action,
      },
      closeButton: {
        expectedClassName: classes.closeButton,
      },
      closeIcon: {
        expectedClassName: classes.closeIcon,
      },
    },
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

  describe('slots.closeButton and slots.closeIcon', () => {
    it('should override the default icon used in the close action', () => {
      function MyCloseIcon() {
        return <div data-testid="closeIcon">X</div>;
      }

      render(
        <Alert onClose={() => {}} slots={{ closeIcon: MyCloseIcon }}>
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
        <Alert onClose={() => {}} slots={{ closeButton: MyCloseButton }}>
          Hello World
        </Alert>,
      );

      expect(screen.getByTestId('closeButton')).toBeVisible();
    });
  });

  describe('slotProps.closeButton and slotProps.closeIcon', () => {
    it('should apply the props on the close IconButton component', () => {
      render(
        <Alert
          onClose={() => {}}
          slotProps={{
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
          slotProps={{
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

    // https://github.com/mui/material-ui/pull/47460#issuecomment-3744629811
    it('should apply the default icons to the different severity alerts if overriding one of the severity icon in theme', () => {
      const theme = createTheme({
        components: {
          MuiAlert: {
            defaultProps: {
              iconMapping: {
                warning: <AlarmIcon fontSize="inherit" />,
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <Alert severity="success">This is a success Alert.</Alert>
          <Alert severity="info">This is an info Alert.</Alert>
          <Alert severity="warning">This is a warning Alert.</Alert>
          <Alert severity="error">This is an error Alert.</Alert>
        </ThemeProvider>,
      );

      expect(screen.queryByTestId('SuccessOutlinedIcon')).not.to.equal(null);
      expect(screen.queryByTestId('InfoOutlinedIcon')).not.to.equal(null);
      // overridden icon in theme
      expect(screen.queryByTestId('AlarmIcon')).not.to.equal(null);
      expect(screen.queryByTestId('ErrorOutlineIcon')).not.to.equal(null);
      // default warning icon
      expect(screen.queryByTestId('ReportProblemOutlinedIcon')).to.equal(null);
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

  // Deterministic checks for the WCAG success criteria the report rates as
  // automatable. See packages/mui-material/src/Alert/accessibility.md.
  describe('WCAG 2.2 conformance', () => {
    describe('1.1.1 Non-text Content', () => {
      it('hides the severity icon from assistive technology', () => {
        render(<Alert severity="error">Your session has expired.</Alert>);

        expect(screen.getByTestId('ErrorOutlineIcon')).to.have.attribute('aria-hidden', 'true');
        expect(screen.getByRole('alert')).to.have.text('Your session has expired.');
      });

      it('exposes a custom icon that the author names with titleAccess', () => {
        render(
          <Alert icon={<AlarmIcon titleAccess="Warning" />} severity="warning">
            Storage is almost full.
          </Alert>,
        );

        expect(screen.getByRole('img', { name: 'Warning' })).not.to.equal(null);
      });
    });

    describe('1.4.3 Contrast (Minimum)', () => {
      const severities = ['error', 'warning', 'info', 'success'];

      it('keeps the standard and outlined text at least 4.5:1 for every severity', () => {
        const below = [];
        ['light', 'dark'].forEach((mode) => {
          const theme = createTheme({ palette: { mode } });
          const getColor = mode === 'light' ? theme.darken : theme.lighten;
          const getBackgroundColor = mode === 'light' ? theme.lighten : theme.darken;
          severities.forEach((severity) => {
            const text = getColor(theme.palette[severity].light, 0.6);
            const standardBackground = getBackgroundColor(theme.palette[severity].light, 0.9);
            if (getContrastRatio(text, standardBackground) < 4.5) {
              below.push(`standard ${severity} ${mode}`);
            }
            if (getContrastRatio(text, theme.palette.background.default) < 4.5) {
              below.push(`outlined ${severity} ${mode}`);
            }
          });
        });

        expect(below).to.deep.equal([]);
      });

      it('pins the filled text colors below 4.5:1', () => {
        const below = [];
        ['light', 'dark'].forEach((mode) => {
          const { palette } = createTheme({ palette: { mode } });
          severities.forEach((severity) => {
            const background = mode === 'dark' ? palette[severity].dark : palette[severity].main;
            const text = palette.getContrastText(palette[severity].main);
            if (getContrastRatio(text, background) < 4.5) {
              below.push(`filled ${severity} ${mode}`);
            }
          });
        });

        // The filled text is 14px at weight 500, so it needs 4.5:1. Update the
        // report's 1.4.3 gap when this list changes.
        expect(below).to.deep.equal(['filled warning light', 'filled info light']);
      });
    });

    describe('close button', () => {
      it('2.1.1 Keyboard: activates with Enter and Space', async () => {
        const handleClose = spy();
        const { user } = render(<Alert onClose={handleClose}>Message</Alert>);

        await user.tab();
        expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(handleClose.callCount).to.equal(1);

        await user.keyboard(' ');
        expect(handleClose.callCount).to.equal(2);
      });

      it('2.1.2 No Keyboard Trap: focus can enter and leave the close button', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">Before</button>
            <Alert onClose={() => {}}>Message</Alert>
            <button type="button">After</button>
          </React.Fragment>,
        );

        await user.tab();
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();

        await user.tab();
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
      });

      it('2.4.3 Focus Order: the alert itself is not a tab stop, and only the close button is', () => {
        render(
          <Alert onClose={() => {}} data-testid="alert">
            Message
          </Alert>,
        );

        expect(screen.getByTestId('alert')).not.to.have.attribute('tabindex');
        expect(screen.getByRole('button', { name: 'Close' })).to.have.property('tabIndex', 0);
      });

      it('2.5.2 Pointer Cancellation: closes on click, but not when released off the target', async () => {
        const handleClose = spy();
        const { user } = render(
          <React.Fragment>
            <Alert onClose={handleClose}>Message</Alert>
            <div data-testid="outside" />
          </React.Fragment>,
        );
        const button = screen.getByRole('button', { name: 'Close' });

        await user.pointer([
          { keys: '[MouseLeft>]', target: button },
          { target: screen.getByTestId('outside') },
          { keys: '[/MouseLeft]' },
        ]);
        expect(handleClose.callCount).to.equal(0);

        await user.click(button);
        expect(handleClose.callCount).to.equal(1);
      });

      it('3.2.1 On Focus: moving focus to the close button does not close the alert', async () => {
        const handleClose = spy();
        const { user } = render(<Alert onClose={handleClose}>Message</Alert>);

        await user.tab();
        expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
        expect(handleClose.callCount).to.equal(0);
      });
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('names the close button "Close" by default and takes closeText', () => {
        const { setProps } = render(<Alert onClose={() => {}}>Message</Alert>);

        expect(screen.getByRole('button', { name: 'Close' })).not.to.equal(null);

        setProps({ closeText: 'Dismiss' });
        expect(screen.getByRole('button', { name: 'Dismiss' })).not.to.equal(null);
      });

      it('renders no close button without onClose', () => {
        render(<Alert>Message</Alert>);

        expect(screen.queryByRole('button')).to.equal(null);
      });
    });

    describe('4.1.3 Status Messages', () => {
      it('renders role="alert", an assertive live region, by default', () => {
        render(<Alert>Message</Alert>);

        expect(screen.getByRole('alert')).to.have.text('Message');
      });

      it('lets the author swap the role for a polite status', () => {
        render(<Alert role="status">Message</Alert>);

        expect(screen.getByRole('status')).to.have.text('Message');
        expect(screen.queryByRole('alert')).to.equal(null);
      });
    });
  });
});
