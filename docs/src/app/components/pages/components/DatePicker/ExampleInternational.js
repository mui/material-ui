import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}

/**
 *  `DatePicker` can be localised using the `locale` property. The first example is localised in French.
 *  Note that the buttons must be separately localised using the `cancelLabel` and `okLabel` properties.
 *
 *  The second example shows `firstDayOfWeek` set to `0`, (Sunday), and `locale` to `en-US` which matches the
 *  behavior of the Date Picker prior to 0.15.0. Note that the 'en-US' locale is built in, and so does not require
 *  `DateTimeFormat` to be supplied.
 *
 *  The final example displays the resulting date in a custom format using the `formatDate` property.
 */
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
