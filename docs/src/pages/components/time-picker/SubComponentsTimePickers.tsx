import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import ClockPicker from '@material-ui/lab/ClockPicker';

export default function SubComponentsTimePickers() {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ClockPicker
        allowKeyboardControl={false}
        date={date}
        onChange={(newValue) => setDate(newValue)}
      />
    </LocalizationProvider>
  );
}
