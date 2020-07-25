import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';

class OverriddenAdapter extends DateFnsAdapter {
  getYearRange(start: Date, end: Date) {
    return super.getYearRange(start, end).reverse();
  }
}

export default function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={OverriddenAdapter}>
      <DatePicker
        openTo="year"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}
