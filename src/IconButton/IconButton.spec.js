/* eslint-env mocha */
import {assert} from 'chai';
import IconButton from './IconButton';

describe('<IconButton />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(IconButton.displayName, 'IconButton');
  });
});
