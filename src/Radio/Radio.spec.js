// @flow

import { assert } from 'chai';
import { getClasses } from '../test-utils';
import Radio, { styleSheet } from './Radio';

describe('<Radio />', () => {
  let classes;

  before(() => {
    classes = getClasses(styleSheet);
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
      assert.strictEqual(Radio.displayName, 'Radio');
    });
  });
});
