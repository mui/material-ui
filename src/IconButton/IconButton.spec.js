// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import IconButton, { styleSheet } from './IconButton';

describe('<IconButton>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.is('ButtonBase'), true, 'should be a ButtonBase');
  });

  it('should render an inner label span (bloody safari)', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
    assert.strictEqual(label.is('span'), true, 'should be a span');
  });

  it('should render a font icon if a string is passed', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.is('span'), true, 'should be a span');
    assert.strictEqual(
      icon.hasClass('material-icons'),
      true,
      'should have the material icons class'
    );
  });

  it('should render the child normally inside the label span', () => {
    const child = <p>H</p>;
    const wrapper = shallow(<IconButton>{child}</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.equals(child), true, 'should be the child');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.prop('ripple'), true, 'should set ripple to true');
  });

  it('should spread props on ButtonBase', () => {
    const wrapper = shallow(
      <IconButton data-test="hello" ripple={false}>book</IconButton>
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
    assert.strictEqual(wrapper.prop('ripple'), false, 'should disable the ButtonBase ripple');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<IconButton className="woof">book</IconButton>);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should pass centerRipple={true} to ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.prop('centerRipple'), true, 'should set centerRipple to true');
  });
});
