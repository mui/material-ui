/* eslint-env mocha */
import {assert} from 'chai';
import TableHeaderColumn from './TableHeaderColumn';

describe('<TableHeaderColumn />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableHeaderColumn.displayName, 'TableHeaderColumn');
  });
});
