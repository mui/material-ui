import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker, MobileTimePicker, DesktopTimePicker } from '@material-ui/pickers';

export default function TimePickers() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z')
  );

  return (
    <React.Fragment>
      <MobileTimePicker
        ampmInClock
        label="For mobile"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      <DesktopTimePicker
        clearable
        ampm={false}
        label="For desktop"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
      />

      {/* Alternative way to show am/pm */}
      <TimePicker
        ampm
        ampmInClock
        showTodayButton
        todayText="now"
        label="Responsive, with step = 5"
        value={selectedDate}
        minutesStep={5}
        onChange={handleDateChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
