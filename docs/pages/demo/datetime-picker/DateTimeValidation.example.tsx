import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';

export default function DateTimePickerValidation() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Ignore date and time"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        minDateTime={new Date()}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Ignore time in each day"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        minDate={new Date('2020-02-14')}
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 18, 45)}
      />
    </React.Fragment>
  );
}
