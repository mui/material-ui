import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import injectTheme from './fixtures/inject-theme';

import DropDownMenu from 'DropDownMenu';
import MenuItem from 'MenuItem';

describe('DropDownMenu', () => {
  let ThemedDropdownMenu;

  beforeEach(() => {
    ThemedDropdownMenu = injectTheme(DropDownMenu);
  });

  it('displays the text field of menuItems prop at index x when value prop is x', () => {
    const render = TestUtils.renderIntoDocument(
      <ThemedDropdownMenu value={1}>
        <MenuItem value={1} primaryText="Never" />
        <MenuItem value={2} primaryText="Every Night" />
        <MenuItem value={3} primaryText="Weeknights" />
      </ThemedDropdownMenu>
    );
    const divWithSelectedText = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div')[1];

    expect(divWithSelectedText.textContent).to.be.equal('Never');
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

    const menuItemDomElement = ReactDOM.findDOMNode(menuItems[1]);

    expect(menuItemDomElement).to.be.ok;

    TestUtils.Simulate.click(divWithSelectedText);

    expect(onDropDownValueChange.calledOnce);
    // index
    expect(onDropDownValueChangeSpy.args[1]).to.equal(1);
    // value
    expect(onDropDownValueChangeSpy.args[2]).to.equal(2);
  });
});
