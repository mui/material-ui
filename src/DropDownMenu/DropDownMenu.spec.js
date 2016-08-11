/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import DropDownMenu from './DropDownMenu';
import getMuiTheme from '../styles/getMuiTheme';

describe('<DropDownMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have the correct displayName', () => {
    assert.strictEqual(DropDownMenu.displayName, 'DropDownMenu');
  });

  it('displays the text field of menuItems prop at index x when value prop is x', () => {
    const wrapper = shallowWithContext(
      <DropDownMenu value={1}>
        <div value={1} primaryText="Never" />
        <div value={2} primaryText="Every Night" />
        <div value={3} primaryText="Weeknights" />
      </DropDownMenu>
    );

    assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).node, 'Never');
  });
});
