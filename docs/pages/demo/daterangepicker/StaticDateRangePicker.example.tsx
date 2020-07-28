import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { StaticDateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';

export default function StaticDateRangePickerExample() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <React.Fragment>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
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
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
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
