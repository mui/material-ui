import React from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MobileDatePicker } from '@material-ui/pickers';

export default function YearDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <DatePicker
        views={['year']}
        label="Year only"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <MobileDatePicker
        views={['year', 'month']}
        label="Year and Month"
        minDate={new Date('2012-03-01')}
        maxDate={new Date('2023-06-01')}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} helperText="With min and max" />}
      />
      <DatePicker
        openTo="year"
        views={['year', 'month']}
        label="Year and Month"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} helperText="Start from year selection" />}
      />
    </React.Fragment>
  );
}
