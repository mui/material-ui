/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Divider from 'src/Divider';
import Menu from 'src/Menu';
import MenuItem from 'src/MenuItem';
import getMuiTheme from 'src/styles/getMuiTheme';

describe('<Menu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});


  it('should render MenuItem and Divider children', () => {
    const wrapper = shallowWithContext(
      <Menu>
        <MenuItem primaryText="item 1" />
        <Divider />
        <MenuItem primaryText="item 2" />
      </Menu>
    );

    const menuItemsAndDividers = wrapper.children().children().children();
    assert.strictEqual(menuItemsAndDividers.length, 3, 'there should be three children');
    assert.strictEqual(menuItemsAndDividers.get(0).type, MenuItem, 'first child should be a MenuItem');
    assert.strictEqual(menuItemsAndDividers.get(1).type, Divider, 'second child should be a Divider');
    assert.strictEqual(menuItemsAndDividers.get(2).type, MenuItem, 'third child should be a MenuItem');

    assert.deepEqual(menuItemsAndDividers.get(1).props.style,
                     {marginTop: 7, marginBottom: 8},
                     'the Divider gets default styles');
  });

  it("should merge the Divider's styles over the Menu's default divider styles", () => {
    const style = {color: 'red', marginTop: '999px'};
    const wrapper = shallowWithContext(
      <Menu>
        <Divider style={style} />
      </Menu>
    );

    const divider = wrapper.find('Divider');
    assert.strictEqual(divider.length, 1, 'there should be one divider child');

    const expectedMergedStyle = Object.assign({}, style, {marginBottom: 8});
    assert.deepEqual(divider.props().style,
                     expectedMergedStyle,
                     "existing styles should be merged over Menu's styles");
  });
});
