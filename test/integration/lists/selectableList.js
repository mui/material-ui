import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import List from 'src/List/List';
import ListItem from 'src/List/ListItem';
import MakeSelectable from 'src/List/MakeSelectable';
import injectTheme from '../fixtures/inject-theme';
import getMuiTheme from 'src/styles/getMuiTheme';
import TestUtils from 'react-addons-test-utils';

describe('MakeSelectable', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

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
    const SelectableList = MakeSelectable(List);

    const wrapper = shallowWithContext(
      <SelectableList>
        {testChildren}
      </SelectableList>
    );

    const brendan = wrapper.childAt(0);
    const kerem = wrapper.childAt(1);

    assert.ok(brendan.length);
    assert.ok(kerem.length);
  });

  it('should select the right item', () => {
    const SelectableList = injectTheme(MakeSelectable(List));

    const render = TestUtils.renderIntoDocument(
      <SelectableList value={2}>
        {testChildren}
      </SelectableList>
    );

    const nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    assert.equal(
      nodeTree[0].firstChild.lastChild.querySelector('span').style.backgroundColor,
      'rgba(0, 0, 0, 0.2)',
      'Change the backgroundColor of the selected item'
    );
  });
});
