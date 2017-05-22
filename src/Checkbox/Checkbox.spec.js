// @flow

import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Checkbox, { LabelCheckbox, styleSheet } from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.default, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  describe('default Checkbox export', () => {
    it('should be a SwitchBase with the displayName set for debugging', () => {
      assert.strictEqual(Checkbox.name, 'SwitchBase');
      assert.strictEqual(Checkbox.displayName, 'Checkbox');
    });
  });

  describe('named LabelCheckbox export', () => {
    it('should be Checkbox wrapped with SwitchLabel', () => {
      assert.strictEqual(LabelCheckbox.name, 'Style');
      assert.strictEqual(LabelCheckbox.displayName, 'withStyles(withSwitchLabel(Checkbox))');
    });
  });
});
