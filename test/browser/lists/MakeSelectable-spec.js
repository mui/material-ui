import React from 'react';
import List from 'List/List';
import ListItem from 'List/ListItem';
import MakeSelectable from 'List/MakeSelectable';
import injectTheme from '../fixtures/inject-theme';
import TestUtils from 'react-addons-test-utils';

describe('MakeSelectable', () => {
  const testChildren = [
    <ListItem
      key={1}
      value={1}
      primaryText="Brendan Lim"
      nestedItems={[
        <ListItem
          value={2}
          primaryText="Grace Ng"
        />,
      ]}
    />,
    <ListItem
      key={3}
      value={3}
      primaryText="Kerem Suer"
    />,
  ];

  it('should display the children', () => {
    const SelectableList = injectTheme(MakeSelectable(List));

    const render = TestUtils.renderIntoDocument(
      <SelectableList>
        {testChildren}
      </SelectableList>
    );

    const nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    expect(nodeTree[0].innerText).to.equal('Brendan LimGrace NgKerem Suer');
  });
});
