import * as React from 'react';
import moment, { Moment } from 'moment';
import JalaliAdapter from '@date-io/jalaali';
import TextField from '@material-ui/core/TextField';
import { loadPersian } from 'moment-jalaali';
import { TimePicker, DateTimePicker, DatePicker, LocalizationProvider } from '@material-ui/pickers';

loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function PersianExample() {
  const [selectedDate, handleDateChange] = React.useState<Moment | null>(moment());

  return (
    <LocalizationProvider dateAdapter={JalaliAdapter as any} locale="fa">
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        clearable
        okText="تأیید"
        cancelText="لغو"
        clearText="پاک کردن"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      <TimePicker
        renderInput={(props) => <TextField {...props} />}
        clearable
        okText="تأیید"
        cancelText="لغو"
        clearText="پاک کردن"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        okText="تأیید"
        cancelText="لغو"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
    </LocalizationProvider>
  );
}

export default PersianExample;
