import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * This example allows you to clear a selected date using `clearSelection`
 */


const DatePickerExampleClear = () => (
  <div>
    <DatePicker hintText="Clear Date Date Picker" clearSelection={true} />
    <DatePicker hintText="Clear Date with Custom Label" clearSelection={true} cancelLabel="Custom Label" />
  </div>
);

export default DatePickerExampleClear;
