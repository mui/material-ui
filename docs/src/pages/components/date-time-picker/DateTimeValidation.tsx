import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Stack from '@material-ui/core/Stack';

export default function DateTimeValidation() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Ignore date and time"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDateTime={new Date()}
        />
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Ignore time in each day"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={new Date('2020-02-14')}
          minTime={new Date(0, 0, 0, 8)}
          maxTime={new Date(0, 0, 0, 18, 45)}
        />
      </Stack>
    </LocalizationProvider>
  );
}
