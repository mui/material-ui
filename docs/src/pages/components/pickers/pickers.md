---
title: Date picker, Time picker React components
components: DatePicker,DateTimePicker,TimePicker,TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@mui/lab'
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers allow selecting a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in a confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React components

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

### Setup

You need to provide a date-library that is used by the pickers by setting the `dateAdapter` to an adapter of your choosing.

We currently support 4 different date-libraries:

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Moment.js](https://momentjs.com/)

First you have to install the adapter package for the date-library you want to use:

```sh
// date-fns
npm install @date-io/date-fns
// or for Day.js
npm install -s @date-io/dayjs
// or for Luxon
npm install -s @date-io/luxon
// or for Moment.js
npm install @date-io/moment
```

Then you have to set the `dateAdapter` prop of the `LocalizationProvider` accordingly:

```js
// date-fns
import DateAdapter from '@mui/lab/AdapterDateFns';
// or for Day.js
import DateAdapter from '@mui/lab/AdapterDayjs';
// or for Luxon
import DateAdapter from '@mui/lab/AdapterLuxon';
// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider>
  );
}
```

## Native pickers

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime).

Native date (`type="date"`), time (`type="time"`) and date&time (`type="datetime-local"`) pickers.

{{"demo": "pages/components/pickers/NativePickers.js"}}
