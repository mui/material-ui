// @flow

import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Radio, { styleSheet } from './Radio';

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
});
