import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createShallow } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import mediaQuery from 'css-mediaquery';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';
import createMuiTheme from '../styles/createMuiTheme';

function createMatchMedia(width, ref) {
  return (query) => {
    const listeners = [];
    const instance = {
      matches: mediaQuery.match(query, {
        width,
      }),
      addListener: (listener) => {
        listeners.push(listener);
      },
      removeListener: (listener) => {
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
  const mount = createMount();

  before(() => {
    shallow = createShallow({ disableLifecycleMethods: true });
  });

  beforeEach(() => {
    matchMediaInstances = [];
    const fakeMatchMedia = createMatchMedia(1200, matchMediaInstances);
    // can't stub non-existent properties with sinon
    // jsdom does not implement window.matchMedia
    if (window.matchMedia === undefined) {
      window.matchMedia = fakeMatchMedia;
      window.matchMedia.restore = () => {
        delete window.matchMedia;
      };
    } else {
      stub(window, 'matchMedia').callsFake(fakeMatchMedia);
    }
  });

  afterEach(() => {
    window.matchMedia.restore();
  });

  describe('server-side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = mount(<EmptyWithWidth width="xl" />);
      expect(wrapper.find(Empty).props().width).to.equal('xl');
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = mount(<EmptyWithWidth />);
      expect(wrapper.find(Empty).props().width).to.equal('md');
    });
  });

  describe('isWidthUp', () => {
    it('should work as default inclusive', () => {
      expect(isWidthUp('md', 'lg')).to.equal(true);
      expect(isWidthUp('md', 'md')).to.equal(true);
      expect(isWidthUp('md', 'sm')).to.equal(false);
    });
    it('should work as exclusive', () => {
      expect(isWidthUp('md', 'lg', false)).to.equal(true);
      expect(isWidthUp('md', 'md', false)).to.equal(false);
      expect(isWidthUp('md', 'sm', false)).to.equal(false);
    });
  });

  describe('isWidthDown', () => {
    it('should work as default inclusive', () => {
      expect(isWidthDown('md', 'lg', true)).to.equal(false);
      expect(isWidthDown('md', 'md', true)).to.equal(true);
      expect(isWidthDown('md', 'sm', true)).to.equal(true);
    });
    it('should work as exclusive', () => {
      expect(isWidthDown('md', 'lg', false)).to.equal(false);
      expect(isWidthDown('md', 'md', false)).to.equal(false);
      expect(isWidthDown('md', 'sm', false)).to.equal(true);
    });
  });

  it('should observe the media queries', () => {
    const wrapper = mount(<EmptyWithWidth />);
    expect(wrapper.find(Empty).props().width).to.equal('md');
    act(() => {
      matchMediaInstances[2].instance.matches = false;
      matchMediaInstances[0].instance.matches = true;
      matchMediaInstances[0].listeners[0]();
    });
    wrapper.update();
    expect(wrapper.find(Empty).props().width).to.equal('xl');
  });

  describe('prop: initialWidth', () => {
    it('should work as expected', () => {
      const element = <EmptyWithWidth initialWidth="lg" />;

      // First mount on the server
      const wrapper1 = shallow(element);
      expect(wrapper1.find(Empty).props().width).to.equal('lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      expect(wrapper2.find(Empty).props().width).to.equal('md');
    });
  });

  describe('option: initialWidth', () => {
    it('should work as expected', () => {
      const EmptyWithWidth2 = withWidth({ initialWidth: 'lg' })(Empty);
      const element = <EmptyWithWidth2 />;

      // First mount on the server
      const wrapper1 = shallow(element);
      expect(wrapper1.find(Empty).props().width).to.equal('lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      expect(wrapper2.find(Empty).props().width).to.equal('md');
    });
  });

  describe('theme prop: MuiWithWidth.initialWidth', () => {
    it('should use theme prop', () => {
      const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'lg' } } });
      const element = <EmptyWithWidth theme={theme} />;
      // First mount on the server
      const wrapper1 = shallow(element);
      expect(wrapper1.find(Empty).props().width).to.equal('lg');

      // Second mount on the client
      const wrapper2 = mount(element);
      expect(wrapper2.find(Empty).props().width).to.equal('md');
    });
  });

  describe('option: withTheme', () => {
    it('should inject the theme', () => {
      const EmptyWithWidth2 = withWidth({ withTheme: true })(Empty);
      const wrapper = mount(<EmptyWithWidth2 />);
      expect(typeof wrapper.find(Empty).props().theme).to.equal('object');
    });

    it('should forward the theme', () => {
      const EmptyWithWidth2 = withWidth({ withTheme: true })(Empty);
      const theme = createMuiTheme();
      const wrapper = mount(<EmptyWithWidth2 theme={theme} />);
      expect(wrapper.find(Empty).props().theme).to.equal(theme);
    });
  });

  describe('option: noSSR', () => {
    it('should work as expected', () => {
      const EmptyWithWidth2 = withWidth({ noSSR: true })(Empty);
      const wrapper = mount(<EmptyWithWidth2 />);
      expect(wrapper.find(Empty).props().width).to.equal('md');
    });
  });
});
