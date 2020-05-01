import * as React from 'react';
import { TextField } from '@material-ui/core';
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
  DesktopDateRangePicker,
  DateRange,
} from '@material-ui/pickers';

function ResponsiveDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <>
      <MobileDateRangePicker
        startText="Mobile start"
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

      <DesktopDateRangePicker
        startText="Desktop start"
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

export default ResponsiveDateRangePicker;
