import React from 'react';
import { assert } from 'chai';
import { useFakeTimers } from 'sinon';
import EventListener from 'react-event-listener';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';
import createBreakpoints from '../styles/createBreakpoints';
import createMuiTheme from '../styles/createMuiTheme';

const Empty = () => <div />;
const EmptyWithWidth = withWidth()(Empty);

const breakpoints = createBreakpoints({});
const TEST_ENV_WIDTH = window.innerWidth > breakpoints.values.md ? 'md' : 'sm';

describe('withWidth', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true, disableLifecycleMethods: true });
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      assert.strictEqual(wrapper.type(), null);
    });
  });

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = mount(<EmptyWithWidth width="xl" />);
      assert.strictEqual(wrapper.find(Empty).props().width, 'xl');
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = mount(<EmptyWithWidth />);
      assert.strictEqual(wrapper.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });

  describe('isWidthUp', () => {
    it('should work as default inclusive', () => {
      assert.strictEqual(isWidthUp('md', 'lg'), true, 'should accept larger size');
      assert.strictEqual(isWidthUp('md', 'md'), true, 'should be inclusive');
      assert.strictEqual(isWidthUp('md', 'sm'), false, 'should reject smaller size');
    });
    it('should work as exclusive', () => {
      assert.strictEqual(isWidthUp('md', 'lg', false), true, 'should accept larger size');
      assert.strictEqual(isWidthUp('md', 'md', false), false, 'should be exclusive');
      assert.strictEqual(isWidthUp('md', 'sm', false), false, 'should reject smaller size');
    });
  });

  describe('isWidthDown', () => {
    it('should work as default inclusive', () => {
      assert.strictEqual(isWidthDown('md', 'lg', true), false, 'should reject larger size');
      assert.strictEqual(isWidthDown('md', 'md', true), true, 'should be inclusive');
      assert.strictEqual(isWidthDown('md', 'sm', true), true, 'should accept smaller size');
    });
    it('should work as exclusive', () => {
      assert.strictEqual(isWidthDown('md', 'lg', false), false, 'should reject larger size');
      assert.strictEqual(isWidthDown('md', 'md', false), false, 'should be exclusive');
      assert.strictEqual(isWidthDown('md', 'sm', false), true, 'should accept smaller size');
    });
  });

  describe('width computation', () => {
    it('should work as expected', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      const instance = wrapper.instance();
      const getWidth = instance.getWidth.bind(instance);

      breakpoints.keys.forEach(key => {
        assert.strictEqual(
          getWidth(breakpoints.values[key]),
          key,
          'should return the matching width',
        );
      });
    });
  });

  describe('handle resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should handle resize event', () => {
      const wrapper = shallow(<EmptyWithWidth width="sm" />);
      assert.strictEqual(wrapper.state().width, undefined);
      wrapper.find(EventListener).simulate('resize');
      clock.tick(166);
      assert.strictEqual(wrapper.state().width, TEST_ENV_WIDTH);
    });
  });

  describe('prop: initialWidth', () => {
    it('should work as expected', () => {
      const element = <EmptyWithWidth initialWidth="lg" />;

      // First mount on the server
      const wrapper1 = shallow(element);
      assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });

  describe('option: initialWidth', () => {
    it('should work as expected', () => {
      const EmptyWithWidth2 = withWidth({ initialWidth: 'lg' })(Empty);
      const element = <EmptyWithWidth2 />;

      // First mount on the server
      const wrapper1 = shallow(element);
      assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });

  describe('theme prop: MuiWithWidth.initialWidth', () => {
    it('should use theme prop', () => {
      const EmptyWithWidth2 = withWidth()(Empty);
      const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'lg' } } });
      const element = <EmptyWithWidth2 theme={theme} />;
      // First mount on the server
      const wrapper1 = shallow(element);
      assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });

  describe('option: withTheme', () => {
    it('should inject the theme', () => {
      const EmptyWithWidth2 = withWidth({ withTheme: true })(Empty);
      const wrapper = mount(<EmptyWithWidth2 />);
      assert.strictEqual(typeof wrapper.find(Empty).props().theme, 'object');
    });

    it('should forward the theme', () => {
      const EmptyWithWidth2 = withWidth({ withTheme: true })(Empty);
      const theme = createMuiTheme();
      const wrapper = mount(<EmptyWithWidth2 theme={theme} />);
      assert.strictEqual(wrapper.find(Empty).props().theme, theme);
    });
  });

  describe('option: noSSR', () => {
    it('should work as expected', () => {
      const EmptyWithWidth2 = withWidth({ noSSR: true })(Empty);
      const wrapper = shallow(<EmptyWithWidth2 />);
      assert.strictEqual(wrapper.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });
});
