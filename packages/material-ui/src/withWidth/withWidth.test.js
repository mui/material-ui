import React from 'react';
import { act } from 'react-dom/test-utils';
import { assert } from 'chai';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';
import { testReset } from '../useMediaQuery/useMediaQuery';
import createMuiTheme from '../styles/createMuiTheme';

function createMatchMedia(width, ref) {
  return query => {
    const listeners = [];
    const instance = {
      matches: mediaQuery.match(query, {
        width,
      }),
      addListener: listener => {
        listeners.push(listener);
      },
      removeListener: listener => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      },
    };
    ref.push({
      instance,
      listeners,
    });
    return instance;
  };
}

const Empty = () => <div />;
const EmptyWithWidth = withWidth()(Empty);

describe('withWidth', () => {
  let matchMediaInstances;
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ disableLifecycleMethods: true });
    mount = createMount({ strict: true });
  });

  beforeEach(() => {
    matchMediaInstances = [];
    testReset();
    window.matchMedia = createMatchMedia(1200, matchMediaInstances);
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
      assert.strictEqual(wrapper.find(Empty).props().width, 'md');
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

  it('should observe the media queries', () => {
    const wrapper = mount(<EmptyWithWidth />);
    assert.strictEqual(wrapper.find(Empty).props().width, 'md');
    act(() => {
      matchMediaInstances[2].instance.matches = false;
      matchMediaInstances[0].instance.matches = true;
      matchMediaInstances[0].listeners[0]();
    });
    wrapper.update();
    assert.strictEqual(wrapper.find(Empty).props().width, 'xl');
  });

  describe('prop: initialWidth', () => {
    it('should work as expected', () => {
      const element = <EmptyWithWidth initialWidth="lg" />;

      // First mount on the server
      const wrapper1 = shallow(element);
      assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Empty).props().width, 'md');
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
      assert.strictEqual(wrapper2.find(Empty).props().width, 'md');
    });
  });

  describe('theme prop: MuiWithWidth.initialWidth', () => {
    it('should use theme prop', () => {
      const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'lg' } } });
      const element = <EmptyWithWidth theme={theme} />;
      // First mount on the server
      const wrapper1 = shallow(element);
      assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Empty).props().width, 'md');
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
      const wrapper = mount(<EmptyWithWidth2 />);
      assert.strictEqual(wrapper.find(Empty).props().width, 'md');
    });
  });
});
