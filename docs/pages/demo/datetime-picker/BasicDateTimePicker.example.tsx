import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';

export default function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <DateTimePicker
        renderInput={(props) => <TextField variant="outlined" {...props} />}
        label="DateTimePicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </React.Fragment>
  );
}
