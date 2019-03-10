import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import FormGroup from '../FormGroup';
import Radio from '../Radio';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  function findRadio(wrapper, value) {
    return wrapper.find(`SwitchBase[value="${value}"]`).first();
  }

  it('should render a FormGroup with the radiogroup role', () => {
    const wrapper = mount(<RadioGroup value="" />);
    const formGroupWrapper = wrapper.find(FormGroup);
    assert.strictEqual(formGroupWrapper.length, 1);
    assert.strictEqual(formGroupWrapper.props().role, 'radiogroup');
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = mount(<RadioGroup value="" onBlur={handleBlur} />);
    const eventValue = { test: true };
    wrapper.simulate('blur', eventValue);
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.args[0][0].test, true);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = mount(<RadioGroup value="" onKeyDown={handleKeyDown} />);
    const eventValue = { test: true };
    wrapper.simulate('keyDown', eventValue);
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.args[0][0].test, true);
  });

  it('should accept invalid child', () => {
    mount(
      <RadioGroup value="">
        <Radio />
        {null}
      </RadioGroup>,
    );
  });

  it('should support uncontrolled mode', () => {
    const wrapper = mount(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    findRadio(wrapper, 'one')
      .find('input')
      .simulate('change', { target: { checked: true } });

    assert.strictEqual(findRadio(wrapper, 'one').props().checked, true);
  });

  it('should support default value in uncontrolled mode', () => {
    const wrapper = mount(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    assert.strictEqual(findRadio(wrapper, 'zero').props().checked, true);

    findRadio(wrapper, 'one')
      .find('input')
      .simulate('change');

    assert.strictEqual(findRadio(wrapper, 'one').props().checked, true);
  });

  describe('prop: onChange', () => {
    it('should fire onChange', () => {
      const handleChange = spy();
      const wrapper = mount(
        <RadioGroup value="" onChange={handleChange}>
          <Radio value="woofRadioGroup" />
          <Radio />
        </RadioGroup>,
      );

      findRadio(wrapper, 'woofRadioGroup')
        .find('input')
        .simulate('change');

      assert.strictEqual(handleChange.callCount, 1);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();
      const wrapper = mount(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      const firstRadio = findOutermostIntrinsic(wrapper.find(Radio).at(0));
      firstRadio.find('input').simulate('change');
      assert.strictEqual(handleChange1.callCount, 1);
      assert.strictEqual(handleChange2.callCount, 1);
    });
  });
});
