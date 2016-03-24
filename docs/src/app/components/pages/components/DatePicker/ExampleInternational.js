import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'en-US'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/en-US');
}

const DatePickerExampleInternational = () => (
  <div>
    <DatePicker
      hintText="fr locale"
      DateTimeFormat={DateTimeFormat}
      okLabel="OK"
      cancelLabel="Annuler"
      locale="fr"
    />
    <DatePicker
      hintText="en-US locale"
      DateTimeFormat={DateTimeFormat}
      locale="en-US"
      firstDayOfWeek={0}
    />
    <DatePicker
      hintText="Custom date format"
      firstDayOfWeek={0}
      formatDate={new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format}
    />
  </div>
);

export default DatePickerExampleInternational;
