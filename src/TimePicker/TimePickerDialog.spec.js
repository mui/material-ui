/* eslint-env mocha */
import {assert} from 'chai';
import TimePickerDialog from './TimePickerDialog';

describe('<TimePickerDialog />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TimePickerDialog.displayName, 'TimePickerDialog');
  });
});
