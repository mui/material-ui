import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Drawer, { drawerClasses as classes } from '@mui/material/Drawer';
import { modalClasses } from '@mui/material/Modal';
import { getAnchor, isHorizontal } from './Drawer';
import describeConformance from '../../test/describeConformance';

describe('<Drawer />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  const CustomPaper = React.forwardRef(
    ({ className, children, ownerState, square, ...props }, ref) => (
      <i className={className} ref={ref} {...props} data-testid="custom">
        {children}
      </i>
    ),
  );

  const CustomBackdrop = React.forwardRef(({ transitionDuration, ownerState, ...props }, ref) => (
    <i ref={ref} data-testid="custom" {...props} />
  ));

  const CustomTransition = React.forwardRef(
    ({ onEnter, onExit, onExited, appear, in: inProp, ownerState, ...props }, ref) => (
      <i ref={ref} data-testid="custom" {...props} />
    ),
  );

  describeConformance(
    <Drawer open disablePortal>
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiDrawer',
      testDeepOverrides: { slotName: 'paper', slotClassName: classes.paper },
      refInstanceof: window.HTMLDivElement,
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: null,
          testWithElement: null,
        },
        paper: {
          expectedClassName: classes.paper,
          testWithComponent: CustomPaper,
          testWithElement: null, // already tested with CustomPaper
        },
        backdrop: { expectedClassName: modalClasses.backdrop, testWithElement: CustomBackdrop },
        transition: {
          expectedClassName: null,
          testWithComponent: CustomTransition,
          testWithElement: CustomTransition,
        },
      },
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );

  // For `permanent` variant, the root is a div instead of a Modal.
  describeConformance(
    <Drawer variant="permanent">
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiDrawer',
      testVariantProps: { variant: 'persistent' },
      refInstanceof: window.HTMLDivElement,
      slots: {
        docked: {
          expectedClassName: classes.docked,
        },
      },
      skip: ['componentProp', 'componentsProp'],
    }),
  );

  describe('prop: variant=temporary', () => {
    describe('transitionDuration property', () => {
      const transitionDuration = {
        enter: 854,
        exit: 2967,
      };

      it('should delay the slide transition to complete using default theme values by default', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }
        const theme = createTheme();
        const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
        render(
          <Drawer open>
            <div />
          </Drawer>,
        );

        const container = document.querySelector(`.${classes.root}`);
        const backdropRoot = container.firstChild;
        expect(backdropRoot).toHaveComputedStyle({
          transitionDuration: `${enteringScreenDurationInSeconds}s`,
        });
      });

      it('should delay the slide transition to complete using custom theme values', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          this.skip();
        }
        const theme = createTheme({
          transitions: {
            duration: {
              enteringScreen: 1,
            },
          },
        });
        render(
          <ThemeProvider theme={theme}>
            <Drawer open>
              <div />
            </Drawer>
          </ThemeProvider>,
        );

        const container = document.querySelector(`.${classes.root}`);
        const backdropRoot = container.firstChild;
        expect(backdropRoot).toHaveComputedStyle({ transitionDuration: '0.001s' });
      });

      it('delay the slide transition to complete using values provided via prop', () => {
        const handleEntered = spy();
        const { setProps } = render(
          <Drawer
            open={false}
            transitionDuration={transitionDuration}
            SlideProps={{ onEntered: handleEntered }}
          >
            <div />
          </Drawer>,
        );

        setProps({ open: true });

        expect(handleEntered.callCount).to.equal(0);

        clock.tick(transitionDuration.enter);

        expect(handleEntered.callCount).to.equal(1);
      });
    });

    it('should set the custom className for Modal when variant is temporary', () => {
      render(
        <Drawer className="woofDrawer" open variant="temporary">
          <div />
        </Drawer>,
      );

      expect(document.querySelector(`.${classes.modal}`)).to.have.class('woofDrawer');
    });

    it('should set the Paper className', () => {
      render(
        <Drawer classes={{ paper: 'woofDrawer' }} open>
          <div />
        </Drawer>,
      );

      expect(document.querySelector(`.${classes.paper}`)).to.have.class('woofDrawer');
    });

    it('should be closed by default', () => {
      render(
        <Drawer>
          <div data-testid="child" />
        </Drawer>,
      );

      expect(screen.queryByTestId('child')).to.equal(null);
    });

    describe('opening and closing', () => {
      const transitionDuration = 123;
      const drawerElement = (
        <Drawer transitionDuration={transitionDuration}>
          <div data-testid="child" />
        </Drawer>
      );

      it('should open and close', () => {
        const { setProps } = render(drawerElement);

        setProps({ open: true });

        expect(screen.getByTestId('child')).not.to.equal(null);

        setProps({ open: false });
        clock.tick(transitionDuration);

        expect(screen.queryByTestId('child')).to.equal(null);
      });
    });
  });

  describe('prop: variant=persistent', () => {
    it('should render a div instead of a Modal when persistent', () => {
      const { container } = render(
        <Drawer variant="persistent">
          <div />
        </Drawer>,
      );

      expect(container.firstChild).to.have.tagName('div');
      expect(container.firstChild).to.have.class(classes.docked);
    });

    it('should render Slide > Paper inside the div', () => {
      const transitionDuration = 123;
      const handleEntered = spy();
      const { container, setProps } = render(
        <Drawer
          open={false}
          transitionDuration={transitionDuration}
          SlideProps={{ onEntered: handleEntered }}
          variant="persistent"
        >
          <div />
        </Drawer>,
      );

      setProps({ open: true });

      expect(handleEntered.callCount).to.equal(0);

      clock.tick(transitionDuration);

      expect(handleEntered.callCount).to.equal(1);
      expect(container.firstChild.firstChild).to.have.class(classes.paper);
    });
  });

  describe('prop: variant=permanent', () => {
    const drawerElement = (
      <Drawer variant="permanent">
        <div />
      </Drawer>
    );

    it('should render a div instead of a Modal when permanent', () => {
      const { container } = render(drawerElement);
      const root = container.querySelector(`.${classes.root}`);

      expect(root).not.to.equal(null);
      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.docked);
    });
  });

  describe('prop: PaperProps', () => {
    it('should merge class names', () => {
      const { container } = render(
        <Drawer PaperProps={{ className: 'my-class' }} variant="permanent">
          <div />
        </Drawer>,
      );
      expect(container.querySelector(`.${classes.paper}`)).to.have.class('my-class');
    });
  });

  describe('slide direction', () => {
    it('should return the opposing slide direction', () => {
      const MockedSlide = React.forwardRef(function MockedSlide(props, ref) {
        const { children, in: inProp, direction } = props;

        if (!inProp) {
          return null;
        }

        return (
          <div data-direction={direction} data-testid="slide" ref={ref} tabIndex={-1}>
            {children}
          </div>
        );
      });

      const { setProps } = render(
        <Drawer open TransitionComponent={MockedSlide}>
          <div />
        </Drawer>,
      );

      setProps({ anchor: 'left' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'right');

      setProps({ anchor: 'right' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'left');

      setProps({ anchor: 'top' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'down');

      setProps({ anchor: 'bottom' });
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'up');
    });
  });

  describe('Right To Left', () => {
    it('should switch left and right anchor when theme is right-to-left', () => {
      const MockedSlide = React.forwardRef(function MockedSlide(props, ref) {
        const { children, in: inProp, direction } = props;

        if (!inProp) {
          return null;
        }

        return (
          <div data-direction={direction} data-testid="slide" ref={ref} tabIndex={-1}>
            {children}
          </div>
        );
      });
      const theme = createTheme({
        direction: 'rtl',
      });
      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="left" TransitionComponent={MockedSlide}>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for left is right, if left is switched to right, we should get left
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'left');

      rerender(
        <ThemeProvider theme={theme}>
          <Drawer open anchor="right" TransitionComponent={MockedSlide}>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      // slide direction for right is left, if right is switched to left, we should get right
      expect(screen.getByTestId('slide')).to.have.attribute('data-direction', 'right');
    });
  });

  describe('isHorizontal', () => {
    it('should recognize left and right as horizontal swiping directions', () => {
      expect(isHorizontal('left')).to.equal(true);
      expect(isHorizontal('right')).to.equal(true);
      expect(isHorizontal('top')).to.equal(false);
      expect(isHorizontal('bottom')).to.equal(false);
    });
  });

  describe('getAnchor', () => {
    it('should return the anchor', () => {
      const theme = { direction: 'ltr' };

      expect(getAnchor(theme, 'left')).to.equal('left');
      expect(getAnchor(theme, 'right')).to.equal('right');
      expect(getAnchor(theme, 'top')).to.equal('top');
      expect(getAnchor(theme, 'bottom')).to.equal('bottom');
    });

    it('should switch left/right if RTL is enabled', () => {
      const theme = { direction: 'rtl' };

      expect(getAnchor(theme, 'left')).to.equal('right');
      expect(getAnchor(theme, 'right')).to.equal('left');
    });
  });

  describe('zIndex', () => {
    it('should set correct zIndex on the root element', () => {
      const theme = createTheme();
      render(
        <ThemeProvider theme={theme}>
          <Drawer open>
            <div />
          </Drawer>
        </ThemeProvider>,
      );
      expect(document.querySelector(`.${classes.root}`)).toHaveComputedStyle({
        zIndex: String(theme.zIndex.drawer),
      });
    });
  });

  describe('prop: anchor', () => {
    it('should set correct class name on the root element', () => {
      const { setProps } = render(
        <Drawer open anchor="left">
          <div />
        </Drawer>,
      );

      expect(document.querySelector(`.${classes.root}`)).to.have.class(classes.anchorLeft);

      setProps({ anchor: 'right' });
      expect(document.querySelector(`.${classes.root}`)).to.have.class(classes.anchorRight);

      setProps({ anchor: 'top' });
      expect(document.querySelector(`.${classes.root}`)).to.have.class(classes.anchorTop);

      setProps({ anchor: 'bottom' });
      expect(document.querySelector(`.${classes.root}`)).to.have.class(classes.anchorBottom);
    });
  });
});
