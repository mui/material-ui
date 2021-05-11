import TextField from '@material-ui/core/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import * as React from 'react';

export default function LocalizedDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <div style={{ width: 300 }}>
        <DatePicker
          mask={'____/__/__'}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
