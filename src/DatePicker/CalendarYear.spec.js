/* eslint-env mocha */
import {assert} from 'chai';
import CalendarYear from './CalendarYear';

describe('<CalendarYear />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CalendarYear.displayName, 'CalendarYear');
  });
});
