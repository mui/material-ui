import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import CalendarPicker from '@material-ui/lab/CalendarPicker';

export default function SubComponentsPickers() {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        allowKeyboardControl={false}
        date={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizaitonProvider>
  );
}
