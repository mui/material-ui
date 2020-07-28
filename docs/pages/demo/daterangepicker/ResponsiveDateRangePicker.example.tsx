import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
  DesktopDateRangePicker,
  DateRange,
} from '@material-ui/pickers';

export default function ResponsiveDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <React.Fragment>
      <MobileDateRangePicker
        startText="Mobile start"
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
