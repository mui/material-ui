// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import ListItem, { styleSheet } from './ListItem';

/**
 * An item that goes in lists.
 */
describe('<ListItem>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <ListItem />
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
  });

  it('should render a li', () => {
    const wrapper = shallow(
      <ListItem component="li" />
    );
    assert.strictEqual(wrapper.is('li'), true, 'should be a li');
  });

  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(<ListItem className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.gutters), true, 'should have the gutters class');
  });

  it('should disable the gutters', () => {
    const wrapper = shallow(<ListItem gutters={false} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
});
