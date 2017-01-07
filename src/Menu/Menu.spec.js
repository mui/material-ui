/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import Menu from './Menu';
import MenuItem from '../MenuItem';
import Subheader from '../Subheader';
import Divider from '../Divider';

describe('<Menu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('Child Items', () => {
    let wrapper;

    before(() => {
      wrapper = shallowWithContext(
        <Menu autoWidth={false}>
          <Subheader>A Header</Subheader>
          <MenuItem value={1} primaryText="Never" />
          <Divider />
          <MenuItem value={2} primaryText="Always" />
          <MenuItem value={3} primaryText="Maybe" />
          <MenuItem value={4} primaryText="No" />
        </Menu>
      );
    });

    it('renders the Subheader', () => {
      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).name(), 'Subheader');
      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).node, 'A Header');
    });

    it('renders the Divider', () => {
      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(2).name(), 'Divider');
    });

    it('renders the MenuItem', () => {
      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(1).name(), 'MenuItem');
      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(3).name(), 'MenuItem');
    });

    it('has the right MenuItem count', () => {
      const inst = wrapper.instance();
      const filteredChildren = inst.getFilteredChildren(wrapper.childAt(0).childAt(0).prop('children'));
      const menuItemCount = inst.getMenuItemCount(filteredChildren);
      assert.strictEqual(menuItemCount, 4);
    });

    it('uses keyboard tab to cycle through MenuItem, but stops at `menuItemCount` - 1 (3)', () => {
      assert.strictEqual(wrapper.state('focusIndex'), 0);
      wrapper.childAt(0).simulate('keyDown', {which: 9, preventDefault: () => {}});
      assert.strictEqual(wrapper.state('focusIndex'), 1);
      wrapper.childAt(0).simulate('keyDown', {which: 9, preventDefault: () => {}});
      assert.strictEqual(wrapper.state('focusIndex'), 2);
      wrapper.childAt(0).simulate('keyDown', {which: 9, preventDefault: () => {}});
      assert.strictEqual(wrapper.state('focusIndex'), 3);
      wrapper.childAt(0).simulate('keyDown', {which: 9, preventDefault: () => {}});
      assert.strictEqual(wrapper.state('focusIndex'), 3);
    });
  });
});
