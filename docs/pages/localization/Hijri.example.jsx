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
        labelFunc={date => (date ? date.format('iYYYY/iMM/iDD') : '')}
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling={false}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />

      <TimePicker
        clearable
        okLabel="موافق"
        cancelLabel="الغاء"
        clearLabel="مسح"
        labelFunc={date => (date ? date.format('hh:mm A') : '')}
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DateTimePicker
        okLabel="موافق"
        cancelLabel="الغاء"
        labelFunc={date => (date ? date.format('iYYYY/iMM/iDD hh:mm A') : '')}
        value={selectedDate}
        onChange={handleDateChange}
        minDate="1937-03-14"
        maxDate="2076-11-26"
      />
    </MuiPickersUtilsProvider>
  );
}

export default HijriExample;
