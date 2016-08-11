/* eslint-env mocha */
import {assert} from 'chai';
import TableFooter from './TableFooter';

describe('<TableFooter />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableFooter.displayName, 'TableFooter');
  });
});
