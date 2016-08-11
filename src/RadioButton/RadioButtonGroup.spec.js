/* eslint-env mocha */
import {assert} from 'chai';
import RadioButtonGroup from './RadioButtonGroup';

describe('<RadioButtonGroup />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(RadioButtonGroup.displayName, 'RadioButtonGroup');
  });
});
