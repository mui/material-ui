/* eslint-env mocha */
import {assert} from 'chai';
import ScaleInChild from './ScaleInChild';

describe('<ScaleInChild />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ScaleInChild.displayName, 'ScaleInChild');
  });
});
