import * as React from 'react';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DayPicker from '@material-ui/lab/DayPicker';

export default function InternalPickers() {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={DateFnsAdapter}>
      <DayPicker
        allowKeyboardControl={false}
        date={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizaitonProvider>
  );
}
