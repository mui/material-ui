/* eslint-env mocha */
import {assert} from 'chai';
import CircularProgress from './CircularProgress';

describe('<CircularProgress />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CircularProgress.displayName, 'CircularProgress');
  });
});
