import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import FormGroup from '../FormGroup';
import Radio from '../Radio';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render a FormGroup with the radiogroup role', () => {
    const wrapper = shallow(<RadioGroup value="" />);
    assert.strictEqual(wrapper.type(), FormGroup);
    assert.strictEqual(wrapper.props().role, 'radiogroup');
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = shallow(<RadioGroup value="" onBlur={handleBlur} />);
    const event = {};
    wrapper.simulate('blur', event);
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.args[0][0], event);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = shallow(<RadioGroup value="" onKeyDown={handleKeyDown} />);
    const event = {};
    wrapper.simulate('keyDown', event);
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.args[0][0], event);
  });

  it('should support uncontrolled mode', () => {
    const wrapper = shallow(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    const radio = wrapper.children().first();
    const event = { target: { value: 'one' } };
    radio.simulate('change', event, true);
    assert.strictEqual(
      wrapper
        .children()
        .first()
        .props().checked,
      true,
    );
  });

  it('should support default value in uncontrolled mode', () => {
    const wrapper = shallow(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    assert.strictEqual(
      wrapper
        .children()
        .first()
        .props().checked,
      true,
    );

    const radio = wrapper.children().last();
    const event = { target: { value: 'one' } };
    radio.simulate('change', event, true);

    assert.strictEqual(
      wrapper
        .children()
        .last()
        .props().checked,
      true,
    );
  });

  describe('imperative focus()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RadioGroup value="" />);
    });

    it('should focus the first non-disabled radio', () => {
      const radios = [
        { disabled: true, focus: spy() },
        { disabled: false, focus: spy() },
        { disabled: false, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[1].focus.callCount, 1);
    });

    it('should not focus any radios if all are disabled', () => {
      const radios = [
        { disabled: true, focus: spy() },
        { disabled: true, focus: spy() },
        { disabled: true, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
    });

    it('should focus the selected radio', () => {
      const radios = [
        { disabled: true, focus: spy() },
        { disabled: false, focus: spy() },
        { disabled: false, checked: true, focus: spy() },
        { disabled: false, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 1);
      assert.strictEqual(radios[3].focus.callCount, 0);
    });

    it('should focus the non-disabled radio rather than the disabled selected radio', () => {
      const radios = [
        { disabled: true, focus: spy() },
        { disabled: true, focus: spy() },
        { disabled: true, checked: true, focus: spy() },
        { disabled: false, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
      assert.strictEqual(radios[3].focus.callCount, 1);
    });

    it('should be able to focus with no radios', () => {
      wrapper.instance().radios = [];
      wrapper.instance().focus();
    });
  });

  it('should accept invalid child', () => {
    shallow(
      <RadioGroup value="">
        <Radio />
        {null}
      </RadioGroup>,
    );
  });

  describe('prop: onChange', () => {
    it('should fire onChange', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <RadioGroup value="" onChange={handleChange}>
          <Radio />
          <Radio />
        </RadioGroup>,
      );

      const internalRadio = wrapper.children().first();
      const event = { target: { value: 'woofRadioGroup' } };
      internalRadio.simulate('change', event, true);
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWith(event), true);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();
      const wrapper = shallow(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      const internalRadio = wrapper.children().first();
      internalRadio.simulate('change', { target: { value: 'woofRadioGroup' } }, true);
      assert.strictEqual(handleChange1.callCount, 1);
      assert.strictEqual(handleChange2.callCount, 1);
    });
  });

  describe('register internal radios to this.radio', () => {
    let mount;

    before(() => {
      mount = createMount();
    });

    after(() => {
      mount.cleanUp();
    });

    it('should add a child', () => {
      const wrapper = mount(
        <RadioGroup value="">
          <Radio />
        </RadioGroup>,
      );
      assert.strictEqual(wrapper.instance().radios.length, 1);
    });

    it('should keep radios empty', () => {
      const wrapper = mount(<RadioGroup value="" />);
      assert.strictEqual(wrapper.instance().radios.length, 0);
    });
  });
});
