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
        labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
        value={selectedDate}
        onChange={handleDateChange}
      />

      <TimePicker
        clearable
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        labelFunc={date => (date ? date.format('hh:mm A') : '')}
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DateTimePicker
        okLabel="تأیید"
        cancelLabel="لغو"
        labelFunc={date => (date ? date.format('jYYYY/jMM/jDD hh:mm A') : '')}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default PersianExample;
