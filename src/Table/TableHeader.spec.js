/* eslint-env mocha */
import {assert} from 'chai';
import TableHeader from './TableHeader';

describe('<TableHeader />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TableHeader.displayName, 'TableHeader');
  });
});
