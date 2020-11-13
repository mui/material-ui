import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

export default function SecondsTimePicker() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <div style={{ width: 300 }}>
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="With seconds"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
        <TimePicker
          ampmInClock
          views={['minutes', 'seconds']}
          inputFormat="mm:ss"
          mask="__:__"
          label="Minutes and seconds"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} margin="normal" variant="standard" />
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
