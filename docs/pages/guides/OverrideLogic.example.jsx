import React, { useState } from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';

// Simple example, in some cases it can be helpful to reverse year order (from future to past).
// Here we are simply override called by pickers function and reversing the result
class OverriddenAdapter extends DateFnsAdapter {
  getYearRange(start, end) {
    return super.getYearRange(start, end).reverse();
  }
}

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={OverriddenAdapter}>
      <DatePicker openTo="year" value={selectedDate} onChange={handleDateChange} />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
