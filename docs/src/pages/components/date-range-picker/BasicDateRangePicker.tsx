import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker, { DateRange } from '@material-ui/lab/DateRangePicker';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangeDelimiter from '@material-ui/lab/DateRangeDelimiter';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} variant="standard" />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} variant="standard" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
