/* eslint-env mocha */
import {assert} from 'chai';
import CalendarActionButtons from './CalendarActionButtons';

describe('<CalendarActionButtons />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CalendarActionButtons.displayName, 'CalendarActionButtons');
  });
});
