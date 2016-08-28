import React from 'react';
import {DateRangePicker} from 'material-ui/DatePicker';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function disableRandomDates() {
  return Math.random() > 0.7;
}
/**
 * `DateRangePicker` can disable specific dates based on the return value of a callback.
 */
const DateRangePickerExampleDisableDates = () => (
  <div>
    <DateRangePicker hintText="Weekends Disabled" shouldDisableDate={disableWeekends} />
    <DateRangePicker hintText="Random Dates Disabled" shouldDisableDate={disableRandomDates} />
  </div>
);

export default DateRangePickerExampleDisableDates;
