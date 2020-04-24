import moment from 'moment';
import jMoment from 'moment-jalaali';
import React, { useState } from 'react';
import JalaliAdapter from '@date-io/jalaali';
import { TextField } from '@material-ui/core';
import { TimePicker, DateTimePicker, DatePicker, LocalizationProvider } from '@material-ui/pickers';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function PersianExample() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <LocalizationProvider dateAdapter={JalaliAdapter} locale="fa">
      <DatePicker
        renderInput={props => <TextField {...props} />}
        clearable
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        renderInput={props => <TextField {...props} />}
        clearable
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        okLabel="تأیید"
        cancelLabel="لغو"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </LocalizationProvider>
  );
}

export default PersianExample;
