import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@material-ui/core/TextField';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <StaticDatePicker<Date>
        orientation="landscape"
        openTo="date"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizaitonProvider>
  );
}
