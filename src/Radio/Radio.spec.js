// @flow

import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import Radio, { LabelRadio, styleSheet } from './Radio';

describe('<Radio />', () => {
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

  describe('default Radio export', () => {
    it('should be a SwitchBase with the displayName set for debugging', () => {
      assert.strictEqual(Radio.name, 'SwitchBase');
      assert.strictEqual(Radio.displayName, 'Radio');
    });
  });

  describe('named LabelRadio export', () => {
    it('should be Radio wrapped with SwitchLabel', () => {
      assert.strictEqual(LabelRadio.name, 'Style');
      assert.strictEqual(LabelRadio.displayName, 'withStyles(withSwitchLabel(Radio))');
    });
  });
});
