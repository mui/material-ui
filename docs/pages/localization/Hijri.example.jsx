import moment from 'moment';
import React, { useState } from 'react';
import HijriUtils from '@date-io/hijri';
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'moment/locale/ar-sa';

function HijriExample() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <MuiPickersUtilsProvider utils={HijriUtils} locale="ar-SA">
      <DatePicker
        clearable
        okLabel="موافق"
        cancelLabel="الغاء"
        clearLabel="مسح"
        inputFormat="iYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />

      <TimePicker
        clearable
        okLabel="موافق"
        cancelLabel="الغاء"
        clearLabel="مسح"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DateTimePicker
        okLabel="موافق"
        cancelLabel="الغاء"
        inputFormat="iYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />
    </MuiPickersUtilsProvider>
  );
}

export default HijriExample;
