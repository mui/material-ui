/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import Popover from './Popover';
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
});
