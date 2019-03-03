import React from 'react';
import { assert } from 'chai';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import SwitchBase from '../internal/SwitchBase';
import Radio from './Radio';
import RadioGroup from '../RadioGroup';

describe('<Radio />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Radio />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  function findRadio(wrapper, value) {
    return wrapper.find(`SwitchBase[value="${value}"]`).first();
  }

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  it('should be using SwitchBase', () => {
    const wrapper = mount(<Radio />);
    assert.strictEqual(wrapper.find(SwitchBase).length, 1);
  });

  describe('prop: unchecked', () => {
    it('should render an unchecked icon', () => {
      const wrapper = mount(<Radio />);
      assert.strictEqual(wrapper.find(RadioButtonUncheckedIcon).length, 1);
    });
  });

  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      const wrapper = mount(<Radio checked />);
      assert.strictEqual(wrapper.find(RadioButtonCheckedIcon).length, 1);
    });
  });

  describe('RadioButtonGroup', () => {
    it('should support uncontrolled mode', () => {
      const wrapper = mount(
        <RadioGroup name="group">
          <Radio value="one" />
        </RadioGroup>,
      );

      findRadio(wrapper, 'one').simulate('change');
      assert.strictEqual(
        findRadio(wrapper, 'one')
          .childAt(0)
          .hasClass(classes.checked),
        true,
      );
    });

    it('should support default value in uncontrolled mode', () => {
      const wrapper = mount(
        <RadioGroup name="group" defaultValue="zero">
          <Radio value="zero" />
          <Radio value="one" />
        </RadioGroup>,
      );

      assert.strictEqual(
        findRadio(wrapper, 'zero')
          .childAt(0)
          .hasClass(classes.checked),
        true,
      );
      findRadio(wrapper, 'one').simulate('change');
      assert.strictEqual(
        findRadio(wrapper, 'one')
          .childAt(0)
          .hasClass(classes.checked),
        true,
      );
    });
  });
});
