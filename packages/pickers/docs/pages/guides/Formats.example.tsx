import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import TextField from '@material-ui/core/TextField';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';

const formats = {
  normalDate: 'd MMM yyy',
  keyboardDate: 'd MMM yyy',
};

export default function DateFnsLocalizationExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={frLocale} dateFormats={formats}>
      <DatePicker
        clearable
        value={value}
        onChange={(newValue) => setValue(newValue)}
        clearText="vider"
        cancelText="annuler"
        renderInput={(props) => <TextField helperText="Localization done right" {...props} />}
      />
    </LocalizationProvider>
  );
}
