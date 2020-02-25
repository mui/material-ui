import moment from 'moment';
import jMoment from 'moment-jalaali';
import React, { useState } from 'react';
import JalaliUtils from '@date-io/jalaali';
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function PersianExample() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <DatePicker
        clearable
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <TimePicker
        clearable
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DateTimePicker
        okLabel="تأیید"
        cancelLabel="لغو"
        inputFormat="jYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
}

export default PersianExample;
