import React from 'react';
import DatePicker from 'material-ui/DatePicker';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function disableRandomDates() {
  return Math.random() > 0.7;
}

const DatePickerExampleDisableDates = () => (
  <div>
    <DatePicker hintText="Weekends Disabled" shouldDisableDate={disableWeekends} />
    <DatePicker hintText="Random Dates Disabled" shouldDisableDate={disableRandomDates} />
  </div>
);

export default DatePickerExampleDisableDates;
