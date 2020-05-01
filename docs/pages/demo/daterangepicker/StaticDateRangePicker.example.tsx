import * as React from 'react';
import { TextField } from '@material-ui/core';
import { StaticDateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

function StaticDateRangePickerExample() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </>
        )}
      />

      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </>
        )}
      />
    </>
  );
}

export default StaticDateRangePickerExample;
