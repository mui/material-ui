import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { StaticDateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

function StaticDateRangePickerExample() {
  const [selectedDate, handleDateChange] = React.useState<DateRange<Date>>([null, null]);

  return (
    <React.Fragment>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
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

      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
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
    </React.Fragment>
  );
}

export default StaticDateRangePickerExample;
