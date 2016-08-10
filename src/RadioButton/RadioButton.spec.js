/* eslint-env mocha */
import {assert} from 'chai';
import RadioButton from './RadioButton';

describe('<RadioButton />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(RadioButton.displayName, 'RadioButton');
  });
});
