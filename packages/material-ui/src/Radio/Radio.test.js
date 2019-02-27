import React from 'react';
import { assert } from 'chai';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import {
  getClasses,
  createShallow,
  createMount,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import SwitchBase from '../internal/SwitchBase';
import Radio from './Radio';
import RadioGroup from '../RadioGroup';

describe('<Radio />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Radio />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  it('should be using SwitchBase', () => {
    const wrapper = shallow(<Radio />);
    assert.strictEqual(wrapper.type(), SwitchBase);
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

      let radio = wrapper.find(Radio);
      radio.simulate('change');
      radio = findOutermostIntrinsic(wrapper.find(Radio));
      assert.strictEqual(radio.hasClass(classes.checked), true);
    });

    it('should support default value in uncontrolled mode', () => {
      const wrapper = mount(
        <RadioGroup name="group" defaultValue="zero">
          <Radio value="zero" />
          <Radio value="one" />
        </RadioGroup>,
      );

      const firstRadio = findOutermostIntrinsic(wrapper.find(Radio).at(0));
      assert.strictEqual(firstRadio.hasClass(classes.checked), true);

      let secondRadio = wrapper.find(Radio).at(1);
      secondRadio.simulate('change');
      secondRadio = findOutermostIntrinsic(wrapper.find(Radio).at(1));
      assert.strictEqual(secondRadio.hasClass(classes.checked), true);
    });
  });
});
