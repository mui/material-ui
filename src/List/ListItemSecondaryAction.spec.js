// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import ListItemSecondaryAction, { styleSheet } from './ListItemSecondaryAction';

describe('<ListItemSecondaryAction />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<ListItemSecondaryAction />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<ListItemSecondaryAction className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
