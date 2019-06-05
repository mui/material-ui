---
title: Date Picker, Time Picker React components
components: TextField
---

# Pickers

<p class="description">Pickers provide a simple way to select a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

## Native pickers

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for a richer solution.

### Date pickers

A native date picker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of.

### @material-ui/pickers

![Stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}