import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MobileDatePicker } from '@material-ui/pickers';

export default function YearDatePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <DatePicker
        views={['year']}
        label="Year only"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <MobileDatePicker
        views={['year', 'month']}
        label="Year and Month"
        minDate={new Date('2012-03-01')}
        maxDate={new Date('2023-06-01')}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} helperText="With min and max" />}
      />

      <DatePicker
        openTo="year"
        views={['year', 'month']}
        label="Year and Month"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} helperText="Start from year selection" />}
      />
    </React.Fragment>
  );
}
