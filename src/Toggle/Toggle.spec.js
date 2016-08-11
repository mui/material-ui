/* eslint-env mocha */
import {assert} from 'chai';
import Toggle from './Toggle';

describe('<Toggle />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Toggle.displayName, 'Toggle');
  });
});
