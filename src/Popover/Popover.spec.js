/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import Popover from './Popover';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Popover />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('state: closing', () => {
    it('should not create new timeout when popover is already closing', () => {
      const wrapper = shallowWithContext(<Popover open={true} />);

      wrapper.setProps({open: false});
      const timeout = wrapper.instance().timeout;

      wrapper.setProps({open: false});
      const nextTimeout = wrapper.instance().timeout;

      assert.equal(timeout, nextTimeout);
    });
  });
});
