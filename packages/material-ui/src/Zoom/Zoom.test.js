import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import {
  unstable_createMuiStrictModeTheme as createMuiStrictModeTheme,
  ThemeProvider,
} from '../styles';
import { Transition } from 'react-transition-group';
import Zoom from './Zoom';

describe('<Zoom />', () => {
  // StrictModeViolation: uses react-transition-group
  const mount = createMount({ strict: false });

  describeConformance(
    <Zoom in>
      <div />
    </Zoom>,
    () => ({
      classes: {},
      inheritComponent: Transition,
      mount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describe('transition lifecycle', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('tests', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();
      const wrapper = mount(
        <Zoom
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
      const child = wrapper.find('#test');

      wrapper.setProps({ in: true });

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child.instance());

      expect(handleEnter.args[0][0].style.transition).to.match(
        /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);
      expect(handleEntered.args[0][0]).to.equal(child.instance());

      wrapper.setProps({ in: false });

      expect(handleExit.callCount).to.equal(1);
      expect(handleExit.args[0][0]).to.equal(child.instance());

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child.instance());

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child.instance());
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden: appear=true', () => {
      const wrapper = mount(
        <Zoom in={false} appear>
          <div>Foo</div>
        </Zoom>,
      );
      expect(wrapper.find('div').props().style).to.deep.equal({
        transform: 'scale(0)',
        visibility: 'hidden',
      });
    });

    it('should work when initially hidden: appear=false', () => {
      const wrapper = mount(
        <Zoom in={false} appear={false}>
          <div>Foo</div>
        </Zoom>,
      );
      expect(wrapper.find('div').props().style).to.deep.equal({
        transform: 'scale(0)',
        visibility: 'hidden',
      });
    });
  });

  it('has no StrictMode warnings in a StrictMode theme', () => {
    mount(
      <React.StrictMode>
        <ThemeProvider theme={createMuiStrictModeTheme()}>
          <Zoom appear in>
            <div />
          </Zoom>
        </ThemeProvider>
      </React.StrictMode>,
    );
  });

  it('can fallback to findDOMNode in a StrictMode theme', () => {
    const Div = () => <div />;
    mount(
      <ThemeProvider theme={createMuiStrictModeTheme()}>
        <Zoom appear in disableStrictModeCompat>
          <Div />
        </Zoom>
      </ThemeProvider>,
    );
  });
});
