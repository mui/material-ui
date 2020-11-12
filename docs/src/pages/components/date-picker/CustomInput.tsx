import * as React from 'react';
import Box from '@material-ui/core/Box';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DatePicker';

export default function CustomInput() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <DesktopDatePicker
        label="Custom input"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input ref={inputRef} {...inputProps} />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizaitonProvider>
  );
}
