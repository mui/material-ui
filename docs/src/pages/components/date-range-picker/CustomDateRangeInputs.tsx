import * as React from 'react';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';

export default function CustomDateRangeInputs() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <input
              ref={startProps.inputRef as React.Ref<HTMLInputElement>}
              {...startProps.inputProps}
            />
            <Box sx={{ mx: 1 }}> to </Box>
            <input
              ref={endProps.inputRef as React.Ref<HTMLInputElement>}
              {...endProps.inputProps}
            />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
