/* eslint-env mocha */
import {assert} from 'chai';
import ExpandTransition from './ExpandTransition';

describe('<ExpandTransition />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ExpandTransition.displayName, 'ExpandTransition');
  });
});
