/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import AutoComplete from 'src/AutoComplete';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<AutoComplete />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  describe('Popover', () => {
    it('should open the Popover when we start typing keys', () => {
      const wrapper = mountWithContext(
        <AutoComplete id="search" dataSource={['foo', 'bar']} />
      );

      wrapper.find('input').simulate('change', {target: {value: 'f'}});

      assert.strictEqual(wrapper.state().open, true);
    });
  });
});
