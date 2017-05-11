/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import getMuiTheme from 'src/styles/getMuiTheme';
import MenuItem from './MenuItem';
import ListItem from '../List/ListItem';
import Popover from '../Popover/Popover';

describe('<MenuItem />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should have a min-height to allow display even within null <SelectItem /> option', () => {
    const wrapper = shallowWithContext(<MenuItem />);
    assert.strictEqual(wrapper.find(ListItem).props().style.minHeight, '48px');
  });

  it('should pass hoverColor from the theme to the <ListItem />', () => {
    const testColor = '#ededed';
    const muiThemeWithHoverColor = getMuiTheme({menuItem: {hoverColor: testColor}});
    const shallowWithHoverColor = (node) => shallow(node, {context: {muiTheme: muiThemeWithHoverColor}});

    const wrapper = shallowWithHoverColor(<MenuItem />);
    assert.strictEqual(wrapper.find(ListItem).prop('hoverColor'), testColor);
  });

  it('should pass anchorOrigin to the <Popover />', () => {
    const menuItems = [<MenuItem />, <MenuItem />];
    const anchorOrigin = {horizontal: 'middle', vertical: 'bottom'};
    const wrapper = shallowWithContext(
      <MenuItem menuItems={menuItems} anchorOrigin={anchorOrigin} />
    );
    const popoverWrapper = wrapper.find(ListItem).find(Popover);
    assert.strictEqual(popoverWrapper.prop('anchorOrigin'), anchorOrigin);
  });

  it('should pass targetOrigin to the <Popover />', () => {
    const menuItems = [<MenuItem />, <MenuItem />];
    const targetOrigin = {horizontal: 'middle', vertical: 'bottom'};
    const wrapper = shallowWithContext(
      <MenuItem menuItems={menuItems} targetOrigin={targetOrigin} />
    );
    const popoverWrapper = wrapper.find(ListItem).find(Popover);
    assert.strictEqual(popoverWrapper.prop('targetOrigin'), targetOrigin);
  });
});
