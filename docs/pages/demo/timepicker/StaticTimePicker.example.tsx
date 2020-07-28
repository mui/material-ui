import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { StaticTimePicker } from '@material-ui/pickers';

export default function StaticTimePickerExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <StaticTimePicker
        openTo="hours"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <StaticTimePicker
        ampm
        orientation="landscape"
        openTo="minutes"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
