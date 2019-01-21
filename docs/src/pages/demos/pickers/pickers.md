---
title: Date Picker, Time Picker React components
components: TextField
---

# Pickers

<p class="description">Pickers provide a simple way to select a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

#### Notice

We are falling back to **native input controls**.
If you are interested in implementing or have implemented a rich Material Design Picker with an awesome UX, please, let us know on [#4787](https://github.com/mui-org/material-ui/issues/4787) and [#4796](https://github.com/mui-org/material-ui/issues/4796)! We could add [a link to or a demo](#complementary-projects) of your project in the documentation.

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime).

## Date pickers

A native date picker example with `type="date"`, it can be used as a calendar too.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars)
![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Other

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.
