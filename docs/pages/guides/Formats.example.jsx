import format from 'date-fns/format';
import React, { useState } from 'react';
import frLocale from 'date-fns/locale/fr';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale });
  }
}

function DateFnsLocalizationExample() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
      <DatePicker
        clearable
        helperText="Localization done right"
        format="d MMM yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        clearLabel="vider"
        cancelLabel="annuler"
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateFnsLocalizationExample;
