// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import SwitchBase from './SwitchBase';
import IconButton from '../IconButton';
import Icon from '../Icon';

function assertIsChecked(wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    true,
    'should have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.instance().checked, true, 'the DOM node should be checked');

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(icon.is('pure(CheckBox)'), true, 'should be the CheckBox icon');
}

function assertIsNotChecked(wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    false,
    'should not have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.instance().checked, false, 'the DOM node should not be checked');

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(
    icon.is('pure(CheckBoxOutlineBlank)'),
    true,
    'should be the CheckBoxOutlineBlank icon',
  );
}

describe('<SwitchBase />', () => {
  let shallow;
  let mount;
  let classes;
  let SwitchBaseNaked;

  before(() => {
    SwitchBaseNaked = unwrap(SwitchBase);
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<SwitchBase />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render an IconButton', () => {
    const wrapper = shallow(<SwitchBase />);
    assert.strictEqual(wrapper.type(), IconButton);
  });

  it('should render an icon and input inside the button by default', () => {
    const wrapper = shallow(<SwitchBase />);
    assert.strictEqual(
      wrapper.childAt(0).is('pure(CheckBoxOutlineBlank)'),
      true,
      'should be an SVG icon',
    );
    assert.strictEqual(
      wrapper.childAt(1).is('input[type="checkbox"]'),
      true,
      'should be a checkbox input',
    );
  });

  it('should have a ripple by default', () => {
    const wrapper = shallow(<SwitchBase />);
    assert.strictEqual(wrapper.props().disableRipple, false, 'should set disableRipple to false');
  });

  it('should pass disableRipple={true} to IconButton', () => {
    const wrapper = shallow(<SwitchBase disableRipple />);
    assert.strictEqual(wrapper.props().disableRipple, true, 'should set disableRipple to true');
  });

  // className is put on the root node, this is a special case!
  it('should render with the user and root classes', () => {
    const wrapper = shallow(<SwitchBase className="woofSwitchBase" />);
    assert.strictEqual(wrapper.hasClass('woofSwitchBase'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<SwitchBase data-my-prop="woofSwitchBase" />);
    assert.strictEqual(
      wrapper.props()['data-my-prop'],
      'woofSwitchBase',
      'custom prop should be woofSwitchBase',
    );
  });

  it('should pass tabIndex to the input so it can be taken out of focus rotation', () => {
    const wrapper = shallow(<SwitchBase tabIndex={-1} />);
    const input = wrapper.find('input');
    assert.strictEqual(input.props().tabIndex, -1);
  });

  it('should pass value, disabled, checked, and name to the input', () => {
    const props = { name: 'gender', disabled: true, value: 'male' };

    const wrapper = shallow(<SwitchBase {...props} />);
    const input = wrapper.find('input');

    Object.keys(props).forEach(n => {
      assert.strictEqual(input.props()[n], props[n]);
    });
  });

  it('should disable the components, and render the IconButton with the disabled className', () => {
    const wrapper = shallow(<SwitchBase disabled />);
    assert.strictEqual(wrapper.props().disabled, true, 'should disable the root node');
    assert.strictEqual(wrapper.childAt(1).props().disabled, true, 'should disable the input node');
  });

  it('should apply the custom disabled className when disabled', () => {
    const disabledClassName = 'foo';
    const wrapperA = shallow(<SwitchBase disabled classes={{ disabled: disabledClassName }} />);

    assert.strictEqual(
      wrapperA.hasClass(disabledClassName),
      true,
      'should have the custom disabled class',
    );

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
        <SwitchBaseNaked
          classes={{
            checked: 'test-class-checked',
          }}
          className="test-class"
          checked={false}
        />,
      );
    });

    it('should recognize a controlled input', () => {
      assert.strictEqual(
        wrapper.instance().isControlled,
        true,
        'should set instance.isControlled to true',
      );
      assertIsNotChecked(wrapper);
    });

    it('should check the checkbox', () => {
      wrapper.setProps({ checked: true });
      assertIsChecked(wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper.setProps({ checked: true });
      wrapper.setProps({ checked: false });
      assertIsNotChecked(wrapper);
    });
  });

  describe('uncontrolled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwitchBaseNaked
          classes={{
            checked: 'test-class-checked',
          }}
          className="test-class"
        />,
      );
    });

    it('should recognize an uncontrolled input', () => {
      assert.strictEqual(wrapper.instance().isControlled, false);
      assertIsNotChecked(wrapper);
    });

    it('should check the checkbox', () => {
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper.update();
      assertIsChecked(wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper.update();
      assertIsNotChecked(wrapper);
    });
  });

  describe('prop: icon', () => {
    it('should accept a string and use Icon', () => {
      const wrapper = shallow(<SwitchBase icon="heart" />);
      assert.strictEqual(wrapper.childAt(0).is(Icon), true);
    });
  });

  describe('handleInputChange()', () => {
    const event = {
      target: {
        checked: false,
      },
    };

    it('should call onChange exactly once with event', () => {
      const onChangeSpy = spy();
      const wrapper = mount(<SwitchBaseNaked classes={{}} onChange={onChangeSpy} />);
      const instance = wrapper.instance();
      instance.handleInputChange(event);

      assert.strictEqual(onChangeSpy.callCount, 1);
      assert.strictEqual(onChangeSpy.calledWith(event), true);

      onChangeSpy.resetHistory();
    });

    describe('controlled', () => {
      it('should call onChange once', () => {
        const checked = true;
        const onChangeSpy = spy();
        const wrapper = mount(
          <SwitchBaseNaked classes={{}} checked={checked} onChange={onChangeSpy} />,
        );
        const instance = wrapper.instance();
        instance.handleInputChange(event);

        assert.strictEqual(onChangeSpy.callCount, 1);
        assert.strictEqual(
          onChangeSpy.calledWith(event, !checked),
          true,
          'call onChange with event and !props.checked',
        );
      });
    });

    describe('not controlled no input', () => {
      let checkedMock;
      let wrapper;
      let onChangeSpy;

      before(() => {
        onChangeSpy = spy();
        wrapper = mount(<SwitchBaseNaked classes={{}} onChange={onChangeSpy} />);
        checkedMock = true;
        const instance = wrapper.instance();
        wrapper.setState({ checked: checkedMock });
        instance.handleInputChange(event);
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

    describe('prop: inputProps', () => {
      it('should be able to add aria', () => {
        const wrapper2 = shallow(<SwitchBase inputProps={{ 'aria-label': 'foo' }} />);
        assert.strictEqual(wrapper2.find('input').props()['aria-label'], 'foo');
      });
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({ ...wrapper.context(), muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<SwitchBase />);
    });

    describe('enabled', () => {
      beforeEach(() => {
        setFormControlContext({});
      });

      it('should not have the disabled class', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), false);
        wrapper.setProps({ disabled: true });
        assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      });
    });

    describe('disabled', () => {
      beforeEach(() => {
        setFormControlContext({ disabled: true });
      });

      it('should have the disabled class', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      });

      it('should honor props', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), true);
        wrapper.setProps({ disabled: false });
        assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });
    });
  });
});
