/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import BottomNavigationItem from './BottomNavigationItem';
import FontIcon from '../FontIcon/FontIcon';
import getMuiTheme from '../styles/getMuiTheme';

describe('<BottomNavigationItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have the correct displayName', () => {
    assert.strictEqual(BottomNavigationItem.displayName, 'BottomNavigationItem');
  });

  describe('prop: icon', () => {
    it('should be able to customize the icon', () => {
      const wrapper = shallowWithContext(
        <BottomNavigationItem
          icon={<FontIcon color="#ddd" />}
          label="foo"
        />
      );
      assert.strictEqual(wrapper.find(FontIcon).props().color, '#ddd');
    });
  });
});
