// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallowWithContext } from 'test/utils';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
  });

  it('should render a FormGroup with the radiogroup role', () => {
    const wrapper = shallow(
      <RadioGroup />,
    );
    assert.strictEqual(
      wrapper.is('FormGroup[role="radiogroup"]'),
      true,
      'should be a FormGroup with the correct role',
    );
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = shallow(
      <RadioGroup onBlur={handleBlur} />,
    );
    const event = {};
    wrapper.simulate('blur', event);
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.args[0][0], event);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = shallow(
      <RadioGroup onKeyDown={handleKeyDown} />,
    );
    const event = {};
    wrapper.simulate('keyDown', event);
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.args[0][0], event);
  });

  describe('imperative focus()', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <RadioGroup />,
      );
    });

    it('should focus the first non-disabled radio', () => {
      const radios = [
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: false }, focus: spy() },
        { props: { disabled: false }, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[1].focus.callCount, 1);
    });

    it('should not focus any radios if all are disabled', () => {
      const radios = [
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: true }, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
    });

    it('should focus the selected radio', () => {
      const radios = [
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: false }, focus: spy() },
        { props: { disabled: false, checked: true }, focus: spy() },
        { props: { disabled: false }, focus: spy() },
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
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: true }, focus: spy() },
        { props: { disabled: true, checked: true }, focus: spy() },
        { props: { disabled: false }, focus: spy() },
      ];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
      assert.strictEqual(radios[3].focus.callCount, 1);
    });
  });
});
