import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker, MobileTimePicker, DesktopTimePicker } from '@material-ui/pickers';

export default function TimePickers() {
  const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <React.Fragment>
      <MobileTimePicker
        ampmInClock
        label="For mobile"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <DesktopTimePicker
        clearable
        ampm={false}
        label="For desktop"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      {/* Alternative way to show am/pm */}
      <TimePicker
        ampm
        ampmInClock
        showTodayButton
        todayText="now"
        label="Responsive, with step = 5"
        value={value}
        minutesStep={5}
        onChange={setValue}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
