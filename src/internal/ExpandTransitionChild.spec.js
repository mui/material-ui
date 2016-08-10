/* eslint-env mocha */
import {assert} from 'chai';
import ExpandTransitionChild from './ExpandTransitionChild';

describe('<ExpandTransitionChild />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ExpandTransitionChild.displayName, 'ExpandTransitionChild');
  });
});
