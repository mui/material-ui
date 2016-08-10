/* eslint-env mocha */
import {assert} from 'chai';
import DateDisplay from './DateDisplay';

describe('<DateDisplay />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(DateDisplay.displayName, 'DateDisplay');
  });
});
