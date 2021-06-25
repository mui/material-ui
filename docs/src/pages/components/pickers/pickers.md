---
title: Date picker, Time picker React components
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React components

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime).

### Date picker

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time picker

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time picker

A native time picker example with `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
