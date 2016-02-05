import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

// Use the native Intl if available
if (areIntlLocalesSupported('fr')) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  require('intl/locale-data/jsonp/fr');

  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const DatePickerExampleInternational = () => (
  <DatePicker
    hintText="fr version"
    DateTimeFormat={DateTimeFormat}
    // Intl is supported by most modern browsers, see http://caniuse.com/#search=intl
    // for browsers that don't support it use this polyfill https://github.com/andyearnshaw/Intl.js
    wordings={{ok: 'OK', cancel: 'Annuler'}}
    firstDayOfWeek={1}
    locale="fr"
  />
);

export default DatePickerExampleInternational;
