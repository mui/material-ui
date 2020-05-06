import 'moment/locale/ar-sa';
import moment from 'moment';
import React, { useState } from 'react';
import HijriAdapter from '@date-io/hijri';
import { TextField } from '@material-ui/core';
import { TimePicker, DateTimePicker, DatePicker, LocalizationProvider } from '@material-ui/pickers';

function HijriExample() {
  const [selectedDate, handleDateChange] = useState(moment());

  return (
    <LocalizationProvider dateAdapter={HijriAdapter} locale="ar-SA">
      <DatePicker
        renderInput={props => <TextField {...props} />}
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
        renderInput={props => <TextField {...props} />}
        clearable
        okLabel="موافق"
        cancelLabel="الغاء"
        clearLabel="مسح"
        inputFormat="hh:mm A"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        okLabel="موافق"
        cancelLabel="الغاء"
        inputFormat="iYYYY/iMM/iDD"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />
    </LocalizationProvider>
  );
}

export default HijriExample;
