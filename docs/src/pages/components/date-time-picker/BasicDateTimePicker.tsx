import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';

export default function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date(),
  );

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DateTimePicker
        renderInput={(props) => <TextField variant="outlined" {...props} />}
        label="DateTimePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
