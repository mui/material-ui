import * as React from 'react';
import addWeeks from 'date-fns/addWeeks';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker, { DateRange } from '@material-ui/lab/DateRangePicker';
import DateRangeDelimiter from '@material-ui/lab/DateRangeDelimiter';

function getWeeksAfter(date: Date | null, amount: number) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function MinMaxDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <DateRangePicker
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
