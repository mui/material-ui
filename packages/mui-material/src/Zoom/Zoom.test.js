import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { Transition } from 'react-transition-group';
import Zoom from '@mui/material/Zoom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Zoom />', () => {
  const { clock, render } = createRenderer();

  describeConformance(
    <Zoom in>
      <div />
    </Zoom>,
    () => ({
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
    }),
  );

  describe('transition lifecycle', () => {
    clock.withFakeTimers();

    it('tests', () => {
      const handleAddEndListener = spy();
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();
      const { container, setProps } = render(
        <Zoom
          addEndListener={handleAddEndListener}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div id="test" />
        </Zoom>,
      );
      const child = container.querySelector('#test');

      setProps({ in: true });

      expect(handleAddEndListener.callCount).to.equal(1);
      expect(handleAddEndListener.args[0][0]).to.equal(child);
      expect(typeof handleAddEndListener.args[0][1]).to.equal('function');

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child);

      expect(handleEnter.args[0][0].style.transition).to.match(
        /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
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
        /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child);
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden: appear=true', () => {
      const { container } = render(
        <Zoom in={false} appear>
          <div>Foo</div>
        </Zoom>,
      );

      const element = container.querySelector('div');

      expect(element.style).to.have.property('transform', 'scale(0)');
      expect(element.style).to.have.property('visibility', 'hidden');
    });

    it('should work when initially hidden: appear=false', () => {
      const { container } = render(
        <Zoom in={false} appear={false}>
          <div>Foo</div>
        </Zoom>,
      );
      const element = container.querySelector('div');

      expect(element.style).to.have.property('transform', 'scale(0)');
      expect(element.style).to.have.property('visibility', 'hidden');
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
        <Zoom in appear>
          <div data-testid="child">Foo</div>
        </Zoom>,
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
          <Zoom in appear>
            <div data-testid="child">Foo</div>
          </Zoom>
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
        <Zoom in appear timeout={{ enter: 1 }}>
          <div data-testid="child">Foo</div>
        </Zoom>,
      );

      const child = getByTestId('child');
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });
  });
});
