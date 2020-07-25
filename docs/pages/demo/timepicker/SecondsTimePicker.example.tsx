import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from '@material-ui/pickers';

export default function SecondsTimePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        ampm={false}
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
        label="With seconds"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />

      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        ampmInClock
        openTo="minutes"
        views={['minutes', 'seconds']}
        inputFormat="mm:ss"
        mask="__:__"
        label="Minutes and seconds"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
    </React.Fragment>
  );
}
