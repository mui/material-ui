import React from 'react';
import { assert } from 'chai';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import { getClasses, createMount, describeConformance } from '@material-ui/core/test-utils';
import Radio from './Radio';

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

  describeConformance(<Radio />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: false,
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
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
});
