import React from 'react';
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
});
