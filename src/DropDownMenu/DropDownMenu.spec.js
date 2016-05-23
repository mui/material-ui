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

  it('should trigger change events correctly on menu item click', () => {
    const onDropDownValueChange = (event, index, value) => {},
        onDropDownValueChangeSpy = sinon.spy(onDropDownValueChange),
        render = TestUtils.renderIntoDocument(
          <ThemedDropdownMenu value={1} onChange={onDropDownValueChangeSpy}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
          </ThemedDropdownMenu>
        );

    const menuItems = TestUtils.scryRenderedComponentsWithType(render, MenuItem);

    expect(menuItems.length).to.be.ok;

    // find the DOM node for the second option: Every Night
    const menuItemDomElement = ReactDOM.findDOMNode(menuItems[1]);

    expect(menuItemDomElement).to.be.ok;

    // Simulate a click which should trigger change
    TestUtils.Simulate.click(menuItemDomElement);

    expect(onDropDownValueChange.calledOnce);
    // index
    expect(onDropDownValueChangeSpy.args[1]).to.equal(1);
    // value
    expect(onDropDownValueChangeSpy.args[2]).to.equal(2);
  });
});
