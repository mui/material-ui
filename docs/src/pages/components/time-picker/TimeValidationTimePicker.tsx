import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Stack from '@material-ui/core/Stack';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

export default function TimeValidationTimePicker() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2020-01-01 12:00'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <TimePicker
          renderInput={(params) => <TextField {...params} />}
          value={value}
          label="min/max time"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minTime={new Date(0, 0, 0, 8)}
          maxTime={new Date(0, 0, 0, 18, 45)}
        />
        <TimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Disable odd hours"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'hours' && timeValue % 2) {
              return true;
            }

            return false;
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
