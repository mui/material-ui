/* eslint-env mocha */
import {assert} from 'chai';
import ScaleIn from './ScaleIn';

describe('<ScaleIn />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ScaleIn.displayName, 'ScaleIn');
  });
});
