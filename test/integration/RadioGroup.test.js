// @flow weak
/* eslint-env mocha */

import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy } from 'sinon';
import RadioGroup from 'src/Radio/RadioGroup';
import Radio from 'src/Radio';
import { createMountWithContext } from 'test/utils';

function assertRadioSelected(wrapper, selectedIndex) {
  const radios = wrapper.find('Radio');

  radios.forEach((radio, index) => {
    if (index === selectedIndex) {
      assert.strictEqual(radio.prop('checked'), true, 'selected radio should be checked');
      assert.strictEqual(radio.find('[role="radio"]').prop('aria-checked'), true,
        'radio should be aria-checked');
      assert.strictEqual(radio.find('input').prop('checked'), true, 'selected radio should be checked');
    } else {
      assert.strictEqual(radio.prop('checked'), false, 'radio should not be checked');
      assert.strictEqual(radio.find('[role="radio"]').prop('aria-checked'), false,
        'radio should not be aria-checked');
      assert.strictEqual(radio.find('input').prop('checked'), false, 'radio should not be checked');
    }
  });
}

function assertRadioTabIndexed(wrapper, tabIndexed) {
  const radios = wrapper.find('Radio');

  radios.forEach((radio, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(radio.prop('tabIndex'), '0', 'selected radio should have the tab index');
    } else {
      assert.strictEqual(radio.prop('tabIndex'), '-1', `radio at index ${index} should not be tab focusable`);
    }
  });
}

function assertRadioFocused(wrapper, tabIndexed) {
  const radios = wrapper.find('Radio');

  radios.forEach((radio, index) => {
    if (index === tabIndexed) {
      assert.strictEqual(radio.find('[role="radio"]').get(0), document.activeElement, 'should be focused');
    }
  });
}

describe('<RadioGroup> integration', () => {
  let mount;

  before(() => mount = createMountWithContext());
  after(() => mount.cleanUp());

  describe('controlled radio interaction', () => {
    let handleChange;
    let wrapper;

    before(() => {
      handleChange = spy();
      wrapper = mount(
        <RadioGroup
          aria-label="Cheese"
          selectedValue=""
          onChange={handleChange}
        >
          <Radio value="0x" label="No Cheese" />
          <Radio value="1x" label="Cheese" />
          <Radio value="2x" label="Double Cheese" />
          <Radio value="3x" label="Triple Cheese" />
        </RadioGroup>
      );
    });

    it('should detect controlled use', () => {
      assert.strictEqual(wrapper.instance().isControlled, true);
    });

    it('should mark up the root node with role and our supplied aria-label', () => {
      const rootDiv = wrapper.find('[data-mui-test="RadioGroup"]');
      assert.strictEqual(rootDiv.length, 1, 'should exist');
      assert.strictEqual(rootDiv.prop('aria-label'), 'Cheese', true);
      assert.strictEqual(rootDiv.prop('role'), 'radiogroup', true);
    });

    it('should have radios inside the group', () => {
      const radios = wrapper.find('[role="radio"]');
      assert.strictEqual(radios.length, 4, 'should have 4 radios');
    });

    it('should have nothing selected but the first item tabIndexed', () => {
      assertRadioSelected(wrapper, -1);
      assertRadioTabIndexed(wrapper, 0);
    });

    it('should focus the second value', () => {
      wrapper.find('[role="radio"]').first().get(0).focus();
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertRadioTabIndexed(wrapper, 1);
      assertRadioFocused(wrapper, 1);
    });

    it('should reset the tabIndex to the first item after blur', (done) => {
      document.activeElement.blur();
      setTimeout(() => {
        assertRadioTabIndexed(wrapper, 0);
        done();
      }, 60);
    });

    it('should select/choose the first value', () => {
      wrapper.find('[role="radio"]').first().simulate('click');
      wrapper.find('[role="radio"]').first().get(0).focus();
      assert.strictEqual(handleChange.callCount, 1, 'should have called handleChange');
      assert.strictEqual(handleChange.args[0][1], '0x', 'should pass 0x as the 2nd arg');

      // controlled!
      // this is our pseudo managed state in action
      wrapper.setProps({ selectedValue: '0x' });
      assertRadioSelected(wrapper, 0);
      assertRadioTabIndexed(wrapper, 0);
    });

    it('should focus the second value', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertRadioTabIndexed(wrapper, 1);
      assertRadioFocused(wrapper, 1);
    });

    it('should focus the third value', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertRadioTabIndexed(wrapper, 2);
      assertRadioFocused(wrapper, 2);
    });

    it('should select the third value', () => {
      wrapper.find('[role="radio"]').at(2).simulate('click');
      assert.strictEqual(handleChange.callCount, 2, 'should have called handleChange');
      assert.strictEqual(handleChange.args[1][1], '2x', 'should pass 2x as the 2nd arg');
    });

    it('should focus the fourth value', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertRadioTabIndexed(wrapper, 3);
      assertRadioFocused(wrapper, 3);
    });

    it('should focus the second value', () => {
      wrapper.simulate('keyDown', { which: keycode('up') });
      wrapper.simulate('keyDown', { which: keycode('up') });
      assertRadioTabIndexed(wrapper, 1);
      assertRadioFocused(wrapper, 1);
    });

    it('should select the second value', () => {
      wrapper.find('[role="radio"]').at(1).simulate('click');
      assert.strictEqual(handleChange.callCount, 3, 'should have called handleChange');
      assert.strictEqual(handleChange.args[2][1], '1x', 'should pass 1x as the 2nd arg');
    });
  });

  describe('initially selected value', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <RadioGroup
          aria-label="Cheese"
          selectedValue="2x"
        >
          <Radio value="0x" label="No Cheese" />
          <Radio value="1x" label="Cheese" />
          <Radio value="2x" label="Double Cheese" />
          <Radio value="3x" label="Triple Cheese" />
        </RadioGroup>
      );
    });

    it('should set the tabIndex to the third radio', () => {
      assertRadioTabIndexed(wrapper, 2);
    });

    it('should set focus and tabIndex to the second radio', () => {
      wrapper.find('[role="radio"]').at(2).get(0).focus();
      wrapper.simulate('keyDown', { which: keycode('up') });
      assertRadioTabIndexed(wrapper, 1);
      assertRadioFocused(wrapper, 1);
    });

    it('should reset the tabIndex to the selected item after blur', (done) => {
      document.activeElement.blur();
      setTimeout(() => {
        assertRadioTabIndexed(wrapper, 2);
        done();
      }, 60);
    });
  });

  describe('uncontrolled interaction', () => {
    let handleChange;
    let wrapper;

    before(() => {
      handleChange = spy();
      wrapper = mount(
        <RadioGroup
          aria-label="Cheese"
          onChange={handleChange}
        >
          <Radio value="0x" label="No Cheese" />
          <Radio value="1x" label="Cheese" />
          <Radio value="2x" label="Double Cheese" />
          <Radio value="3x" label="Triple Cheese" />
        </RadioGroup>
      );
    });

    it('should detect uncontrolled use', () => {
      assert.strictEqual(wrapper.instance().isControlled, false);
    });

    it('should have nothing selected but the first item tabIndexed', () => {
      assertRadioSelected(wrapper, -1);
      assertRadioTabIndexed(wrapper, 0);
    });

    it('should select/choose the first value', () => {
      wrapper.find('[role="radio"]').first().simulate('click');
      wrapper.find('[role="radio"]').first().get(0).focus();
      assert.strictEqual(handleChange.callCount, 1, 'should have called handleChange');
      assert.strictEqual(handleChange.args[0][1], '0x', 'should pass 0x as the 2nd arg');
      assertRadioSelected(wrapper, 0);
      assertRadioTabIndexed(wrapper, 0);
    });

    it('should select/choose the third value', () => {
      wrapper.find('[role="radio"]').at(2).simulate('click');
      wrapper.find('[role="radio"]').at(2).get(0).focus();
      assert.strictEqual(handleChange.callCount, 2, 'should have called handleChange');
      assert.strictEqual(handleChange.args[1][1], '2x', 'should pass 0x as the 2nd arg');
      assertRadioSelected(wrapper, 2);
      assertRadioTabIndexed(wrapper, 2);
    });

    it('should set focus and tabIndex to the fourth radio', () => {
      wrapper.simulate('keyDown', { which: keycode('right') });
      assertRadioTabIndexed(wrapper, 3);
      assertRadioFocused(wrapper, 3);
    });

    it('should set focus and tabIndex to the first radio', () => {
      wrapper.simulate('keyDown', { which: keycode('down') });
      assertRadioTabIndexed(wrapper, 0);
      assertRadioFocused(wrapper, 0);
    });

    it('should set focus and tabIndex to the fourth radio', () => {
      wrapper.simulate('keyDown', { which: keycode('left') });
      assertRadioTabIndexed(wrapper, 3);
      assertRadioFocused(wrapper, 3);
    });

    it('should set focus and tabIndex to the third radio', () => {
      wrapper.simulate('keyDown', { which: keycode('up') });
      assertRadioTabIndexed(wrapper, 2);
      assertRadioFocused(wrapper, 2);
    });
  });
});
