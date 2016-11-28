import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * This example allows you to use keyboard to write date.
 *
 * Unfortunately by now it is only working with default locale (`en-US`).
 * In other cases `keyboardEnabled` prop will be ignored.
 * Also it will not work if it is controlled component or has disabled dates.
 */
const DatePickerExampleKeyboardInput = () => (
  <div>
    <DatePicker
      hintText="YYYY-MM-DD"
      keyboardEnabled={true}
    />
  </div>
);

export default DatePickerExampleKeyboardInput;
