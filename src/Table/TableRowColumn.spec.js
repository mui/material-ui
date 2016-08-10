/* eslint-env mocha */
import {assert} from 'chai';
import TableRowColumn from './TableRowColumn';

describe('<TableRowColumn />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableRowColumn.displayName, 'TableRowColumn');
  });
});
