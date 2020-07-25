import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
  DesktopDateRangePicker,
  DateRange,
} from '@material-ui/pickers';

export default function ResponsiveDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange<Date>>([null, null]);

  return (
    <React.Fragment>
      <MobileDateRangePicker
        startText="Mobile start"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />

      <DesktopDateRangePicker
        startText="Desktop start"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
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
