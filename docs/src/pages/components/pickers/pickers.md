---
title: Date picker, Time picker React components
components: TextField
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

## @mui/x-date-pickers

[@mui/x-date-pickers](https://mui.com/x/react-date-pickers/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime).
Have a look at [@mui/x-date-pickers](https://mui.com/x/react-date-pickers/) for a richer solution.

### Datepickers

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
