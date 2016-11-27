/* eslint-env mocha */

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import getMuiTheme from 'src/styles/getMuiTheme';
import MenuItem from './MenuItem';
import ListItem from '../List/ListItem';

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
});
