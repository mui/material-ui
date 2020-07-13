import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateRangePicker, DateRange, DateRangeDelimiter } from '@material-ui/pickers';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={value}
      onChange={newValue => setValue(newValue)}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps} />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField {...endProps} />
        </React.Fragment>
      )}
    />
  );
}
