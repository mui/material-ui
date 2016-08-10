/* eslint-env mocha */
import {assert} from 'chai';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableRow.displayName, 'TableRow');
  });
});
