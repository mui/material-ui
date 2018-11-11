import React from 'react';
import { assert } from 'chai';
import { createShallow, createRender, getClasses } from '../test-utils';
import FAB from './FAB';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

describe('<FAB />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<FAB>FAB</FAB>);
  });

  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(<FAB>FAB</FAB>);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(wrapper.props().type, 'button');
  });

  it('should render with the root class but no others', () => {
    const wrapper = shallow(<FAB>FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
    assert.strictEqual(wrapper.hasClass(classes.extended), false);
    assert.strictEqual(wrapper.hasClass(classes.focusVisible), false);
    assert.strictEqual(wrapper.hasClass(classes.disabled), false);
    assert.strictEqual(wrapper.hasClass(classes.colorInherit), false);
    assert.strictEqual(wrapper.hasClass(classes.mini), false);
    assert.strictEqual(wrapper.hasClass(classes.fullWidth), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), false);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(<FAB className="test-class-name">FAB</FAB>);
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render an extended floating action button', () => {
    const wrapper = shallow(<FAB variant="extended">FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.extended), true);
  });

  it('should render a primary floating action button', () => {
    const wrapper = shallow(<FAB color="primary">FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), true);
    assert.strictEqual(wrapper.hasClass(classes.secondary), false);
  });

  it('should render a secondary floating action button', () => {
    const wrapper = shallow(<FAB color="secondary">FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.primary), false);
    assert.strictEqual(wrapper.hasClass(classes.secondary), true);
  });

  it('should render a small floating action button', () => {
    const wrapper = shallow(<FAB size="small">FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), false);
  });

  it('should render a medium floating action button', () => {
    const wrapper = shallow(<FAB size="medium">FAB</FAB>);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.sizeSmall), false);
    assert.strictEqual(wrapper.hasClass(classes.sizeMedium), true);
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<FAB>FAB</FAB>);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });

  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(<FAB disableRipple>FAB</FAB>);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });

  it('should have a focusRipple by default', () => {
    const wrapper = shallow(<FAB>FAB</FAB>);
    assert.strictEqual(wrapper.props().focusRipple, true);
  });

  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(<FAB disableFocusRipple>FAB</FAB>);
    assert.strictEqual(wrapper.props().focusRipple, false);
  });

  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = <Icon className={childClassName} />;
    const wrapper = shallow(<FAB>{iconChild}</FAB>);
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true);
  });

  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(<FAB>FAB</FAB>);
      assert.strictEqual(markup.text(), 'FAB');
    });
  });
});
