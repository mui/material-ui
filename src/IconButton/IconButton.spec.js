// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import IconButton, { styleSheet } from './IconButton';
import Icon from '../Icon';

describe('<IconButton />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.name(), 'ButtonBase');
  });

  it('should render an inner label span (bloody safari)', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');
    assert.strictEqual(label.is('span'), true, 'should be a span');
  });

  it('should render a font icon if a string is provided', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.is(Icon), true, 'should be an Icon');
  });

  it('should render the child normally inside the label span', () => {
    const child = <p>H</p>;
    const wrapper = shallow(<IconButton>{child}</IconButton>);
    const label = wrapper.childAt(0);
    const icon = label.childAt(0);
    assert.strictEqual(icon.equals(child), true, 'should be the child');
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const buttonClassName = 'button-woof';
    const wrapper = shallow(
      <IconButton classes={{ icon: buttonClassName }}>{iconChild}</IconButton>,
    );
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.is(Icon), true, 'child should be icon');
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
    assert.strictEqual(renderedIconChild.hasClass(buttonClassName), true, 'child should be icon');
    assert.strictEqual(renderedIconChild.hasClass(classes.icon), true, 'child should be icon');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().ripple, true, 'should set ripple to true');
  });

  it('should pass ripple={false} to ButtonBase', () => {
    const wrapper = shallow(<IconButton disableRipple>book</IconButton>);
    assert.strictEqual(wrapper.props().ripple, false, 'should set ripple to false');
  });

  it('should spread props on ButtonBase', () => {
    const wrapper = shallow(<IconButton data-test="hello" ripple={false}>book</IconButton>);
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
    assert.strictEqual(wrapper.props().ripple, false, 'should disable the ButtonBase ripple');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<IconButton className="woof">book</IconButton>);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should pass centerRipple={true} to ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.props().centerRipple, true, 'should set centerRipple to true');
  });

  describe('prop: disabled', () => {
    it('should disable the component', () => {
      const wrapper = shallow(<IconButton disabled>book</IconButton>);
      assert.strictEqual(wrapper.props().disabled, true, 'should pass the property down the tree');
      assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should add the disabled class');
    });
  });
});
