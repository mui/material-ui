import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';

class OverriddenAdapter extends DateFnsAdapter {
  getYearRange(start, end) {
    return super.getYearRange(start, end).reverse();
  }
}

export default function DateFnsLocalizationExample() {
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
