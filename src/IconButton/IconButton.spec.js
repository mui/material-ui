// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Icon from '../Icon';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<IconButton />);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<IconButton>book</IconButton>);
    assert.strictEqual(wrapper.name(), 'withStyles(ButtonBase)');
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
    assert.strictEqual(wrapper.props().disableRipple, false);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<IconButton disableRipple>book</IconButton>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should spread props on ButtonBase', () => {
    const wrapper = shallow(
      <IconButton data-test="hello" disableRipple>
        book
      </IconButton>,
    );
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<IconButton className="woofIconButton">book</IconButton>);
    assert.strictEqual(wrapper.hasClass('woofIconButton'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
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
