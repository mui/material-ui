// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import DialogTitle, { styleSheet } from './DialogTitle';

describe('<DialogTitle />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<DialogTitle />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<DialogTitle data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<DialogTitle className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render JSX children', () => {
    const children = <p className="test">Hello</p>;
    const wrapper = shallow(<DialogTitle disableTypography>{children}</DialogTitle>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const wrapper = shallow(<DialogTitle>{children}</DialogTitle>);
    assert.strictEqual(wrapper.childAt(0).props().children, children);
  });
});
