import moment from 'moment';
import jMoment from 'moment-jalaali';
import React, { useState } from 'react';
import JalaliAdapter from '@date-io/jalaali';
import TextField from '@material-ui/core/TextField';
import { TimePicker, DateTimePicker, DatePicker, LocalizationProvider } from '@material-ui/pickers';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function PersianExample() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <LocalizationProvider dateAdapter={JalaliAdapter} locale="fa">
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
