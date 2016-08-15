/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import BottomNavigation from './BottomNavigation';
import BottomNavigationItem from './BottomNavigationItem';
import getMuiTheme from '../styles/getMuiTheme';

describe('<BottomNavigation />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('prop: selectedIndex', () => {
    it('determines which BottomNavigationItem is selected', () => {
      const wrapper = shallowWithContext(
        <BottomNavigation selectedIndex={0}>
          <BottomNavigationItem />
          <BottomNavigationItem />
          <BottomNavigationItem />
        </BottomNavigation>
      );

      const bottomNavigationItems = wrapper.find(BottomNavigationItem);

      assert.strictEqual(bottomNavigationItems.at(0).props().selected, true,
        'index 0 should be selected'
      );
      assert.notStrictEqual(bottomNavigationItems.at(1).props().selected, true,
        'index 1 should not be selected'
      );
      assert.notStrictEqual(bottomNavigationItems.at(2).props().selected, true,
        'index 2 should not be selected'
      );
    });

    it('changes the selected BottomNavigationItem', () => {
      const wrapper = shallowWithContext(
        <BottomNavigation selectedIndex={0}>
          <BottomNavigationItem />
          <BottomNavigationItem />
          <BottomNavigationItem />
        </BottomNavigation>
      );

      wrapper.setProps({selectedIndex: 1});

      const bottomNavigationItems = wrapper.find(BottomNavigationItem);
      assert.notStrictEqual(bottomNavigationItems.at(0).props().selected, true,
        'index 0 should not be selected'
      );
      assert.strictEqual(bottomNavigationItems.at(1).props().selected, true,
        'index 1 should be selected'
      );
      assert.notStrictEqual(bottomNavigationItems.at(2).props().selected, true,
        'index 2 should not be selected'
      );
    });
  });
});
