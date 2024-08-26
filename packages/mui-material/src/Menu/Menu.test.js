import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import {
  createRenderer,
  screen,
  fireEvent,
  strictModeDoubleLoggingSuppressed,
  reactMajor,
} from '@mui/internal-test-utils';
import Menu, { menuClasses as classes } from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import { paperClasses } from '../Paper';

describe('<Menu />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<Menu anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: Popover,
    render,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      paper: {
        expectedClassName: classes.paper,
      },
    },
    testDeepOverrides: { slotName: 'list', slotClassName: classes.list },
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'menu' },
    skip: [
      'rootClass', // portal, can't determine the root
      'componentProp',
      'componentsProp',
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', () => {
        const handleEnter = spy();
        const handleEntering = spy();
        render(
          <Menu
            anchorEl={document.createElement('div')}
            open
            TransitionProps={{
              onEnter: handleEnter,
              onEntering: handleEntering,
            }}
          />,
        );

        expect(handleEnter.callCount).to.equal(
          // onEnter is called on mount which is run twice with Strict Effects
          reactMajor >= 18 ? 2 : 1,
        );
        expect(handleEnter.args[0].length).to.equal(2);
        expect(handleEntering.callCount).to.equal(1);
        expect(handleEntering.args[0].length).to.equal(2);
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', () => {
        const handleExit = spy();
        const handleExiting = spy();

        const { setProps } = render(
          <Menu
            TransitionProps={{
              onExit: handleExit,
              onExiting: handleExiting,
            }}
            anchorEl={document.createElement('div')}
            open
          />,
        );

        setProps({
          open: false,
        });

        expect(handleExit.callCount).to.equal(1);
        expect(handleExit.args[0].length).to.equal(1);
        expect(handleExiting.callCount).to.equal(1);
        expect(handleExiting.args[0].length).to.equal(1);
      });
    });
  });

  it('should pass `classes.paper` to the Paper', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        PaperProps={{ 'data-testid': 'paper' }}
      />,
    );

    expect(screen.getByTestId('paper')).to.have.class(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
          PopoverClasses={{ paper: 'bar' }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class('bar');
    });

    it('should be able to change the Popover root element style when Menu classes prop is also provided', () => {
      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          data-testid="popover"
          classes={{ paper: 'bar' }}
          PopoverClasses={{ root: 'foo' }}
        />,
      );
      expect(screen.getByTestId('popover')).to.have.class('foo');
    });
  });

  describe('prop: PaperProps', () => {
    it('should be passed to the paper component', () => {
      const customElevation = 12;
      const customClasses = { rounded: 'custom-rounded' };

      render(
        <Menu
          anchorEl={document.createElement('div')}
          open
          PaperProps={{
            'data-testid': 'paper',
            elevation: customElevation,
            classes: customClasses,
          }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class(paperClasses.elevation12);
      expect(screen.getByTestId('paper')).to.have.class(customClasses.rounded);
    });
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(<Menu anchorEl={document.createElement('div')} open onClose={handleClose} />);

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  it('renders its children only when open', () => {
    const { setProps } = render(
      <Menu anchorEl={document.createElement('div')} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  describe('list node', () => {
    it('should render a menu inside the Popover', () => {
      render(<Menu anchorEl={document.createElement('div')} open data-testid="popover" />);

      expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
    });
  });

  it('should open during the initial mount', () => {
    function MenuItem(props) {
      const { autoFocus, children } = props;
      return (
        <div role="menuitem" tabIndex={-1} data-autofocus={autoFocus}>
          {children}
        </div>
      );
    }
    render(
      <Menu anchorEl={document.createElement('div')} open>
        <MenuItem>one</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole('menuitem')).to.have.attribute('data-autofocus', 'true');
  });

  it('should not focus list if autoFocus=false', () => {
    render(
      <Menu anchorEl={document.createElement('div')} autoFocus={false} open>
        <div tabIndex={-1} />
      </Menu>,
    );

    expect(screen.getByRole('menu')).not.toHaveFocus();
  });

  it('should call TransitionProps.onEntering', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call TransitionProps.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={document.createElement('div')}
        disableAutoFocusItem
        open
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call onClose on tab', () => {
    function MenuItem(props) {
      const { autoFocus, children } = props;

      const ref = React.useRef(null);
      React.useEffect(() => {
        if (autoFocus) {
          ref.current.focus();
        }
      }, [autoFocus]);

      return (
        <div ref={ref} role="menuitem" tabIndex={-1}>
          {children}
        </div>
      );
    }
    const onCloseSpy = spy();
    render(
      <Menu anchorEl={document.createElement('div')} open onClose={onCloseSpy}>
        <MenuItem>hello</MenuItem>
      </Menu>,
    );

    fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Tab' });

    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={document.createElement('div')} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  describe('warnings', () => {
    it('warns a Fragment is passed as a child', () => {
      expect(() => {
        render(
          <Menu anchorEl={document.createElement('div')} open={false}>
            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
            <React.Fragment />
          </Menu>,
        );
      }).toErrorDev([
        "MUI: The Menu component doesn't accept a Fragment as a child.",
        !strictModeDoubleLoggingSuppressed &&
          "MUI: The Menu component doesn't accept a Fragment as a child.",
      ]);
    });
  });

  describe('theme customization', () => {
    it('should override Menu Paper styles following correct precedence', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const menuPaperOverrides = { borderRadius: 4 };
      const popoverPaperOverrides = { borderRadius: 8, height: 100 };
      const rootPaperOverrides = { borderRadius: 16, height: 200, width: 200 };

      const theme = createTheme({
        components: {
          MuiMenu: { styleOverrides: { paper: menuPaperOverrides } },
          MuiPopover: { styleOverrides: { paper: popoverPaperOverrides } },
          MuiPaper: { styleOverrides: { root: rootPaperOverrides } },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <Menu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{
              'data-testid': 'paper',
            }}
          />
        </ThemeProvider>,
      );

      const paper = screen.getByTestId('paper');
      expect(paper).toHaveComputedStyle({
        borderTopLeftRadius: `${menuPaperOverrides.borderRadius}px`,
        borderBottomLeftRadius: `${menuPaperOverrides.borderRadius}px`,
        borderTopRightRadius: `${menuPaperOverrides.borderRadius}px`,
        borderBottomRightRadius: `${menuPaperOverrides.borderRadius}px`,
        height: `${popoverPaperOverrides.height}px`,
        width: `${rootPaperOverrides.width}px`,
      });
    });

    it('should override Menu Paper styles using styles in MuiPaper slot', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = createTheme({
        components: {
          MuiPaper: { styleOverrides: { rounded: { borderRadius: 90 } } },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <Menu
            anchorEl={document.createElement('div')}
            open
            PaperProps={{
              'data-testid': 'paper',
            }}
          />
        </ThemeProvider>,
      );

      const paper = screen.getByTestId('paper');
      expect(paper).toHaveComputedStyle({
        borderTopLeftRadius: '90px',
        borderBottomLeftRadius: '90px',
        borderTopRightRadius: '90px',
        borderBottomRightRadius: '90px',
      });
    });
  });

  describe('slots', () => {
    it('should merge slots with existing values', () => {
      render(
        <Menu
          slots={{ root: 'span' }}
          slotProps={{ paper: { 'data-testid': 'paper' } }}
          anchorEl={document.createElement('div')}
          open
        >
          <div />
        </Menu>,
      );

      expect(screen.getByTestId('paper')).to.have.length(1);
    });
  });
});
