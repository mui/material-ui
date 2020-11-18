import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangeDelimiter from '@material-ui/lab/DateRangeDelimiter';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@material-ui/lab/DesktopDateRangePicker';

export default function ResponsiveDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateRangePicker
        startText="Mobile start"
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
      <DesktopDateRangePicker
        startText="Desktop start"
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
