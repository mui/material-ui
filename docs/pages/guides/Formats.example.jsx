import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';

const formats = {
  normalDate: 'd MMM yyy',
  keyboardDate: 'd MMM yyy',
};

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={frLocale} dateFormats={formats}>
      <DatePicker
        clearable
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        clearText="vider"
        cancelText="annuler"
        renderInput={props => <TextField helperText="Localization done right" {...props} />}
      />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
