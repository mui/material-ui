import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const DatePickerExampleInternational = () => (
  <DatePicker
    hintText="fr version"
    DateTimeFormat={Intl.DateTimeFormat}
    // Intl is supported by most modern browsers, see http://caniuse.com/#search=intl
    // for browsers that don't support it use this polyfill https://github.com/andyearnshaw/Intl.js
    wordings={{ok: 'OK', cancel: 'Annuler'}}
    locale="fr"
  />
);

export default DatePickerExampleInternational;
