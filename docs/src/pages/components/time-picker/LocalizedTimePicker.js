import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  ar: arSaLocale,
};

export default function LocalizedTimePicker() {
  const [locale, setLocale] = React.useState('ru');
  const [value, setValue] = React.useState(new Date());

  const selectLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
      <div>
        <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
          {Object.keys(localeMap).map((localeItem) => (
            <ToggleButton
              key={localeItem}
              value={localeItem}
              onClick={() => selectLocale(localeItem)}
            >
              {localeItem}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
