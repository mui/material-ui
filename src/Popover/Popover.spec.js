/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import Popover from './Popover';
import PopoverAnimationDefault from './PopoverAnimationDefault';
import Paper from '../Paper';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Popover />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  describe('state: closing', () => {
    it('should not create new timeout when popover is already closing', () => {
      const wrapper = shallowWithContext(<Popover open={true} />);

      wrapper.setProps({open: false});
      const timeout = wrapper.instance().timeout;

      wrapper.setProps({open: false});
      const nextTimeout = wrapper.instance().timeout;

      assert.strictEqual(timeout, nextTimeout);
    });
  });

  describe('unmounting', () => {
    it('should stop listening correctly', (done) => {
      const wrapper = mountWithContext(<Popover open={true} />);

      wrapper.instance().handleScroll();
      wrapper.instance().handleScroll();
      wrapper.unmount();

      setTimeout(() => {
         // Wait for the end of the throttle. Makes sure we don't crash.
        done();
      }, 100);
    });
  });

  describe('prop: animated', () => {
    it('should use a Paper when animated if false', () => {
      const wrapper = shallowWithContext(<Popover open={true} animated={false} />);
      const Layer = () => wrapper.instance().renderLayer();
      const layerWrapper = shallowWithContext(<Layer />);

      assert.strictEqual(layerWrapper.find(Paper).length, 1);
    });

    it('should use an animation when animated if true', () => {
      const wrapper = shallowWithContext(<Popover open={true} animated={true} />);
      const Layer = () => wrapper.instance().renderLayer();
      const layerWrapper = shallowWithContext(<Layer />);

      assert.strictEqual(layerWrapper.find(PopoverAnimationDefault).length, 1);
    });
  });
});
