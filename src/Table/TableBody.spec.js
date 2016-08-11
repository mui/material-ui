/* eslint-env mocha */
import {assert} from 'chai';
import TableBody from './TableBody';

describe('<TableBody />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableBody.displayName, 'TableBody');
  });
});
