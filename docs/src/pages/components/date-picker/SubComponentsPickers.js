import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DayPicker from '@material-ui/lab/DayPicker';

export default function SubComponentsPickers() {
  const [date, setDate] = React.useState(new Date());

  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <DayPicker
        allowKeyboardControl={false}
        date={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizaitonProvider>
  );
}
