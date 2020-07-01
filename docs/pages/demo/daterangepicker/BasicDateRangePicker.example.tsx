import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateRangePicker, DateRange, DateRangeDelimiter } from '@material-ui/pickers';

function BasicDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
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

export default BasicDateRangePicker;
