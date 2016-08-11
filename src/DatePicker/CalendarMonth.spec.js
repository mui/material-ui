/* eslint-env mocha */
import {assert} from 'chai';
import CalendarMonth from './CalendarMonth';

describe('<CalendarMonth />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CalendarMonth.displayName, 'CalendarMonth');
  });
});
