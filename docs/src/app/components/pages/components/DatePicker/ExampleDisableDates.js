import React from 'react';
import DatePicker from 'material-ui/DatePicker';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function disableRandomDates() {
  return Math.random() > 0.7;
}
/**
 * `DatePicker` can disable specific dates based on the return value of a callback.
 */
const DatePickerExampleDisableDates = () => (
  <div>
    <DatePicker hintText="Weekends Disabled" shouldDisableDate={disableWeekends} />
    <DatePicker hintText="Random Dates Disabled" shouldDisableDate={disableRandomDates} />
  </div>
);

export default DatePickerExampleDisableDates;
