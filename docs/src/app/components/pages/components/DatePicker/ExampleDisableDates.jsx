import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

const disabledDates = [];
for (let i = 0; i < 32; i++) {
  disabledDates.push(Math.random() > 0.7);
}

function disableRandomDates(date) {
  return disabledDates[date.getDate()];
}

const DatePickerExampleDisableDates = () => (
  <div>
    <DatePicker hintText="Weekends Disabled" shouldDisableDate={disableWeekends} />
    <DatePicker hintText="Random Dates Disabled" shouldDisableDate={disableRandomDates} />
  </div>
);

export default DatePickerExampleDisableDates;
