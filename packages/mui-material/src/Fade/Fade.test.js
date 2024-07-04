import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { Transition } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Fade />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(<Fade {...defaultProps} />, () => ({
    render,
    classes: {},
    inheritComponent: Transition,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
    ],
  }));

  describe('transition lifecycle', () => {
    clock.withFakeTimers();

    it('calls the appropriate callbacks for each transition', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();

      const { container, setProps } = render(
        <Fade
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div id="test" />
        </Fade>,
      );
      const child = container.querySelector('#test');

      setProps({ in: true });

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child);
      expect(handleEnter.args[0][0].style.transition).to.match(
        /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      clock.tick(1000);

      expect(handleEntered.callCount).to.equal(1);
      expect(handleEntered.args[0][0]).to.equal(child);

      setProps({ in: false });

      expect(handleExit.callCount).to.equal(1);
      expect(handleExit.args[0][0]).to.equal(child);

      expect(handleExit.args[0][0].style.transition).to.match(
        /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child);

      clock.tick(1000);

      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child);
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden, appear=true', () => {
      const { container } = render(
        <Fade in={false} appear>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });

    it('should work when initially hidden, appear=false', () => {
      const { container } = render(
        <Fade in={false} appear={false}>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });
  });

  describe('prop: timeout', () => {
    it('should render the default theme values by default', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
      const { getByTestId } = render(
        <Fade in appear>
          <div data-testid="child">Foo</div>
        </Fade>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({
        transitionDuration: `${enteringScreenDurationInSeconds}s`,
      });
    });

    it('should render the custom theme values', function test() {
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
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <Fade in appear>
            <div data-testid="child">Foo</div>
          </Fade>
        </ThemeProvider>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });

    it('should render the values provided via prop', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByTestId } = render(
        <Fade in appear timeout={{ enter: 1 }}>
          <div data-testid="child">Foo</div>
        </Fade>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });
  });
});
