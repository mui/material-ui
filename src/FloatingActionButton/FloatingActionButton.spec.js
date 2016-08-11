/* eslint-env mocha */
import {assert} from 'chai';
import FloatingActionButton from './FloatingActionButton';

describe('<FloatingActionButton />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(FloatingActionButton.displayName, 'FloatingActionButton');
  });
});
