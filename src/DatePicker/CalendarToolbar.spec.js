/* eslint-env mocha */
import {assert} from 'chai';
import CalendarToolbar from './CalendarToolbar';

describe('<CalendarToolbar />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CalendarToolbar.displayName, 'CalendarToolbar');
  });
});
