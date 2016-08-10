/* eslint-env mocha */
import {assert} from 'chai';
import DayButton from './DayButton';

describe('<DayButton />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(DayButton.displayName, 'DayButton');
  });
});
