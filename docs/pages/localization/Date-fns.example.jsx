import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

const maskMap = {
  fr: '__/__/____',
  en: '__/__/____',
  ru: '__.__.____',
};

function DateFnsLocalizationExample() {
  const [locale, setLocale] = React.useState('ru');
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const selectLocale = React.useCallback((newLocale) => {
    setLocale(newLocale);
  }, []);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={localeMap[locale]}>
      <DatePicker
        renderInput={(props) => <TextField {...props} />}
        mask={maskMap[locale]}
        value={selectedDate}
        onChange={handleDateChange}
      />

      <ButtonGroup>
        {Object.keys(localeMap).map((localeItem) => (
          <Button key={localeItem} onClick={() => selectLocale(localeItem)}>
            {localeItem}
          </Button>
        ))}
      </ButtonGroup>
    </LocalizationProvider>
  );
}

export default DateFnsLocalizationExample;
