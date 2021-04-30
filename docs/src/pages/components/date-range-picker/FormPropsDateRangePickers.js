import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';

export default function FormPropsDateRangePickers() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: 300 }}>
        <DateRangePicker
          disabled
          startText="disabled start"
          endText="disabled end"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} variant="standard" />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} variant="standard" />
            </React.Fragment>
          )}
        />
        <DateRangePicker
          readOnly
          startText="read-only start"
          endText="read-only end"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} variant="standard" />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} variant="standard" />
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
