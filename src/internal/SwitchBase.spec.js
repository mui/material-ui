// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from 'src/test-utils';
import createSwitch, { styleSheet } from './SwitchBase';
import Icon from '../Icon';

function assertIsChecked(classes, wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    true,
    'should have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.node.checked, true, 'the DOM node should be checked');

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(icon.is('pure(CheckBox)'), true, 'should be the CheckBox icon');
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

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(icon.is('pure(CheckBoxOutlineBlank)'), true,
    'should be the CheckBoxOutlineBlank icon');
}

describe('<SwitchBase />', () => {
  let shallow;
  let classes;
  let mount;
  let SwitchBase;

  before(() => {
    SwitchBase = createSwitch();
    shallow = createShallow();
    mount = createMount();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render an IconButton', () => {
    const wrapper = shallow(
      <SwitchBase />,
    );
    assert.strictEqual(wrapper.name(), 'withStyles(IconButton)');
  });

  it('should render an icon and input inside the button by default', () => {
    const wrapper = shallow(
      <SwitchBase />,
    );
    assert.strictEqual(wrapper.childAt(0).is('pure(CheckBoxOutlineBlank)'), true,
      'should be an SVG icon');
    assert.strictEqual(wrapper.childAt(1).is('input[type="checkbox"]'), true,
      'should be a checkbox input');
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(
      <SwitchBase />,
    );
    assert.strictEqual(wrapper.props().disableRipple, false, 'should set disableRipple to false');
  });

  it('should pass disableRipple={true} to IconButton', () => {
    const wrapper = shallow(
      <SwitchBase disableRipple />,
    );
    assert.strictEqual(wrapper.props().disableRipple, true, 'should set disableRipple to true');
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
    assert.strictEqual(input.props().tabIndex, '-1');
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
    assert.strictEqual(wrapper.props().disabled, true, 'should disable the root node');
    assert.strictEqual(wrapper.childAt(1).prop('disabled'), true, 'should disable the input node');
  });

  it('should apply the custom disabled className when disabled', () => {
    const disabledClassName = 'foo';
    const wrapperA = shallow(<SwitchBase disabled disabledClassName={disabledClassName} />);


    assert.strictEqual(wrapperA.hasClass(disabledClassName), true,
      'should have the custom disabled class');

    wrapperA.setProps({ disabled: false });
    wrapperA.setProps({ checked: true });

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
      assert.strictEqual(wrapper.instance().isControlled, true,
        'should set instance.isControlled to true');
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
      assert.strictEqual(wrapper.instance().isControlled, false,
        'should set instance.isControlled to false');
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

  describe('prop: icon', () => {
    it('should accept a string and use Icon', () => {
      const wrapper = shallow(<SwitchBase icon="heart" />);
      assert.strictEqual(wrapper.childAt(0).is(Icon), true);
    });
  });

  describe('handleInputChange()', () => {
    let wrapper;
    let instance;
    let event;
    let onChangeSpy;

    before(() => {
      event = 'woof';
      onChangeSpy = spy();
      wrapper = mount(<SwitchBase />);
      wrapper.setProps({ onChange: onChangeSpy });
      instance = wrapper.instance();
    });

    it('should call onChange exactly once with event', () => {
      instance.handleInputChange(event);

      assert.strictEqual(onChangeSpy.callCount, 1);
      assert.strictEqual(onChangeSpy.calledWith(event), true);

      onChangeSpy.reset();
    });

    describe('controlled', () => {
      let checked;

      before(() => {
        checked = true;
        wrapper.setProps({ checked });
        instance = wrapper.instance();
        instance.isControlled = true;
        instance.handleInputChange(event);
      });

      after(() => {
        onChangeSpy.reset();
      });

      it('should call onChange once', () => {
        assert.strictEqual(onChangeSpy.callCount, 1);
      });

      it('should call onChange with event and !props.checked', () => {
        assert.strictEqual(onChangeSpy.calledWith(event, !checked), true);
      });
    });

    describe('not controlled no input', () => {
      let checkedMock;

      before(() => {
        checkedMock = true;
        instance = wrapper.instance();
        instance.isControlled = false;
        wrapper.setState({ checked: checkedMock });
        instance.handleInputChange(event);
      });

      after(() => {
        onChangeSpy.reset();
      });

      it('should call onChange exactly once', () => {
        assert.strictEqual(onChangeSpy.callCount, 1);
      });

      it('should call onChange with right params', () => {
        assert.strictEqual(onChangeSpy.calledWith(event, !checkedMock), true);
      });

      it('should change state.checked !checkedMock', () => {
        assert.strictEqual(wrapper.state('checked'), !checkedMock);
      });
    });
  });
});
