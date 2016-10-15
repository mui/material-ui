/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import DropDownMenu from './DropDownMenu';
import getMuiTheme from '../styles/getMuiTheme';
import MenuItem from '../MenuItem';

describe('<DropDownMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('prop: value', () => {
    it('should display the right selected value text', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
        </DropDownMenu>
      );

      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).node, 'Never');
    });
  });

  describe('prop: children', () => {
    it('should work with null child', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Never" />
          {null}
        </DropDownMenu>
      );

      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).node, 'Never');
    });
  });
});
