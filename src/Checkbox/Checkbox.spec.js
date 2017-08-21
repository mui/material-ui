// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Checkbox />);
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
});
