/* eslint-env mocha */
import {assert} from 'chai';
import DatePickerDialog from './DatePickerDialog';

describe('<DatePickerDialog />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(DatePickerDialog.displayName, 'DatePickerDialog');
  });
});
