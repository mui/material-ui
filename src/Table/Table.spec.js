/* eslint-env mocha */
import {assert} from 'chai';
import Table from './Table';

describe('<Table />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Table.displayName, 'Table');
  });
});
