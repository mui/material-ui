/* eslint-env mocha */
import {assert} from 'chai';
import YearButton from './YearButton';

describe('<YearButton />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(YearButton.displayName, 'YearButton');
  });
});
