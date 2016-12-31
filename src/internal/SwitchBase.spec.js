// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext, createMountWithContext } from 'test/utils';
import { createSwitch, styleSheet } from './SwitchBase';

describe('<SwitchBase />', () => {
  let shallow;
  let classes;
  let mount;
  let SwitchBase;

  before(() => {
    SwitchBase = createSwitch();
    shallow = createShallowWithContext();
    mount = createMountWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });
  after(() => mount.cleanUp());

  it('should render an IconButton', () => {
    const wrapper = shallow(
      <SwitchBase />,
    );
    assert.strictEqual(wrapper.is('IconButton'), true, 'should be an IconButton');
  });

  it('should render an icon and input inside the button by default', () => {
    const wrapper = shallow(
      <SwitchBase />,
    );
    console.log(wrapper.childAt(0).debug());
    assert.strictEqual(wrapper.childAt(0).is('CheckBoxOutlineBlank'), true, 'should be an SVG icon');
    assert.strictEqual(wrapper.childAt(1).is('input[type="checkbox"]'), true, 'should be a checkbox input');
  });

  // IT SHOULD RENDER
  // WITH A CUSTOM ICON!!!

  // className is put on the root node, this is a special case!
  it('should render with the user and root classes', () => {
    const wrapper = shallow(<SwitchBase className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<SwitchBase data-my-prop="woof" />);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
  });

  it('should pass tabIndex to the input so it can be taken out of focus rotation', () => {
    const wrapper = shallow(<SwitchBase tabIndex="-1" />);
    const input = wrapper.find('input');
    assert.strictEqual(input.prop('tabIndex'), '-1');
  });

  it('should pass value, disabled, checked, and name to the input', () => {
    const props = {
      name: 'gender',
      disabled: true,
      value: 'male',
    };

    const wrapper = shallow(<SwitchBase {...props} />);
    const input = wrapper.find('input');

    Object.keys(props).forEach((n) => {
      assert.strictEqual(input.prop(n), props[n]);
    });
  });

  it('should set the icon to aria-hidden="true" to avoid being read by screen readers', () => {
    const wrapper = shallow(<SwitchBase />);
    assert.strictEqual(wrapper.childAt(0).prop('aria-hidden'), 'true');
  });

  it('should disable the components, and render the IconButton with the disabled className', () => {
    const wrapper = shallow(<SwitchBase disabled />);
    assert.strictEqual(wrapper.prop('disabled'), true, 'should disable the root node');
    assert.strictEqual(wrapper.childAt(1).prop('disabled'), true, 'should disable the input node');
  });

  it('should apply the custom disabled className when disabled', () => {
    const disabledClassName = 'foo';
    const wrapperA = shallow(<SwitchBase disabled disabledClassName={disabledClassName} />);

    assert.strictEqual(wrapperA.hasClass(disabledClassName), true, 'should have the custom disabled class');

    wrapperA.setProps({ disabled: false });

    assert.strictEqual(
      wrapperA.hasClass(disabledClassName),
      false,
      'should not have the custom disabled class',
    );
  });

  describe('controlled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwitchBase
          className="test-class"
          checkedClassName="test-class-checked"
          checked={false}
        />,
      );
    });

    it('should recognize a controlled input', () => {
      assert.strictEqual(wrapper.instance().isControlled, true, 'should set instance.isControlled to true');
    });

    it('should not not be checked', () => {
      assertIsNotChecked(classes, wrapper);
    });

    it('should check the checkbox', () => {
      wrapper.setProps({ checked: true });
      assertIsChecked(classes, wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper.setProps({ checked: true });
      wrapper.setProps({ checked: false });
      assertIsNotChecked(classes, wrapper);
    });
  });

  describe('uncontrolled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwitchBase
          className="test-class"
          checkedClassName="test-class-checked"
        />,
      );
    });

    it('should recognize an uncontrolled input', () => {
      assert.strictEqual(wrapper.instance().isControlled, false, 'should set instance.isControlled to false');
    });

    it('should not not be checked', () => {
      assertIsNotChecked(classes, wrapper);
    });

    it('should check the checkbox', () => {
      wrapper.find('input').node.click();
      assertIsChecked(classes, wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper.find('input').node.click();
      wrapper.find('input').node.click();
      assertIsNotChecked(classes, wrapper);
    });
  });
});

function assertIsChecked(classes, wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    true,
    'should have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.node.checked, true, 'the DOM node should be checked');

  const icon = wrapper.find('span.material-icons');
  assert.strictEqual(icon.text(), 'check_box', 'should be the check_box icon');
}

function assertIsNotChecked(classes, wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    false,
    'should not have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.node.checked, false, 'the DOM node should not be checked');

  const icon = wrapper.find('span.material-icons');
  assert.strictEqual(icon.text(), 'check_box_outline_blank', 'should be the check_box_outline_blank icon');
}
