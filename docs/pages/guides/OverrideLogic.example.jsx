import React, { useState } from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';
class OverriddenAdapter extends DateFnsAdapter {
  getYearRange(start, end) {
    return super.getYearRange(start, end).reverse();
  }
}

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={OverriddenAdapter}>
      <DatePicker
        renderInput={props => <TextField {...props} />}
        openTo="year"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
