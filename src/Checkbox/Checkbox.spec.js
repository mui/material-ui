/* eslint-env mocha */
import React from 'react';
import { assert } from 'chai';
import Checkbox, { styleSheet } from './Checkbox';
import { createShallowWithContext } from 'test/utils';

describe('<Checkbox>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render an IconButton', () => {
    const wrapper = shallow(
      <Checkbox />
    );
    assert.strictEqual(wrapper.is('IconButton'), true, 'should be an IconButton');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<Checkbox data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<Checkbox className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
});
