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

  it('determines which BottomNavigationItem is selected', () => {
    const wrapper = shallowWithContext(
      <BottomNavigation selectedIndex={0}>
        <BottomNavigationItem />
        <BottomNavigationItem />
        <BottomNavigationItem />
      </BottomNavigation>
    );
    assert.strictEqual(wrapper.childAt(0).node.props.selected, true, 'index 0 should be selected');
    assert.notStrictEqual(wrapper.childAt(1).node.props.selected, true, 'index 1 should not be selected');
    assert.notStrictEqual(wrapper.childAt(2).node.props.selected, true, 'index 2 should not be selected');
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
    assert.notStrictEqual(wrapper.childAt(0).node.props.selected, true, 'index 0 should not be selected');
    assert.strictEqual(wrapper.childAt(1).node.props.selected, true, 'index 1 should be selected');
    assert.notStrictEqual(wrapper.childAt(2).node.props.selected, true, 'index 2 should not be selected');
  });
});
