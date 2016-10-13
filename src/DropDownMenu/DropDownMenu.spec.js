/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import DropDownMenu from './DropDownMenu';
import getMuiTheme from '../styles/getMuiTheme';

describe('<DropDownMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

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

  it('passes expected props through to the underlying Menu', () => {
    const props = {
      listStyle: {color: 'black'},
      maxHeight: 10,
      menuStyle: {color: 'white'},
      menuItemStyle: {fontWeight: 'bold'},
      menuItemSelectedStyle: {color: 'blue'},
      value: 1,
    };

    const wrapper = shallowWithContext(
      <DropDownMenu
        {...props}
      >
        <div value={1} primaryText="Never" />
        <div value={2} primaryText="Every Night" />
        <div value={3} primaryText="Weeknights" />
      </DropDownMenu>
    );

    const menu = wrapper.childAt(1).childAt(0);
    assert.include(menu.props(), {
      desktop: true,
      listStyle: props.listStyle,
      maxHeight: props.maxHeight,
      menuItemStyle: props.menuItemStyle,
      menuItemSelectedStyle: props.menuItemSelectedStyle,
      style: props.menuStyle,
      value: props.value,
    });
  });
});
