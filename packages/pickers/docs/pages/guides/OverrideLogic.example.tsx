import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';

class OverriddenAdapter extends DateFnsAdapter {
  getYearRange(start: Date, end: Date) {
    return super.getYearRange(start, end).reverse();
  }
}

export default function OverrideLogicExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={OverriddenAdapter}>
      <DatePicker
        openTo="year"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}
