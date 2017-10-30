// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses, createMount } from '../test-utils';
import Checkbox from './Checkbox';
import IndeterminateCheckBoxIcon from '../svg-icons/IndeterminateCheckBox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Checkbox />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('styleSheet', () => {
    it('should have the classes required for Checkbox', () => {
      assert.strictEqual(typeof classes.default, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  it('should render a div with a SwitchBase', () => {
    const wrapper = shallow(<Checkbox />);
    assert.strictEqual(wrapper.name(), 'withStyles(SwitchBase)');
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const wrapper = mount(<Checkbox indeterminate />);
      assert.strictEqual(wrapper.find(IndeterminateCheckBoxIcon).length, 1);
    });
  });
});
