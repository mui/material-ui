import 'moment/locale/ar-sa';
import * as React from 'react';
import moment, { Moment } from 'moment';
import HijriAdapter from '@date-io/hijri';
import TextField from '@material-ui/core/TextField';
import { TimePicker, DateTimePicker, DatePicker, LocalizationProvider } from '@material-ui/pickers';

export default function HijriExample() {
  const [selectedDate, handleDateChange] = React.useState<Moment | null>(moment());

  return (
    <LocalizationProvider dateAdapter={HijriAdapter as any} locale="ar-SA">
      <DatePicker
        clearable
        renderInput={(props) => <TextField {...props} />}
        okText="موافق"
        cancelText="الغاء"
        clearText="مسح"
        inputFormat="iYYYY/iMM/iDD"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        minDate={moment('1937-03-14')}
        maxDate={moment('2076-11-26')}
      />
      <TimePicker
        clearable
        renderInput={(props) => <TextField {...props} />}
        okText="موافق"
        cancelText="الغاء"
        clearText="مسح"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        okText="موافق"
        cancelText="الغاء"
        inputFormat="iYYYY/iMM/iDD"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        minDate={moment('1937-03-14')}
        maxDate={moment('2076-11-26')}
      />
    </LocalizationProvider>
  );
}
