import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from '@material-ui/pickers';

export default function BasicTimePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        label="12 hours"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        ampm={false} // This is not needed if you are using localization
        label="24 hours"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </React.Fragment>
  );
}
