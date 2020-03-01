import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { DatePicker } from '@material-ui/pickers';
import { LocalizationProvider } from '@material-ui/pickers';

/** @type Partial<import('@date-io/core/IUtils').DateIOFormats> */
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
        helperText="Localization done right"
        value={selectedDate}
        onChange={handleDateChange}
        clearLabel="vider"
        cancelLabel="annuler"
      />
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
