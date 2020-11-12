---
title: React Time Picker component
components: TimePicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker

<p class="description">Time pickers allow the user to select a single time.</p>

Time pickers allow the user to select a single time (in the hours:minutes format).
The selected time is indicated by the filled circle at the end of the clock hand.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @material-ui/lab/dateAdapter/{dayjs,luxon,moment} or any valid date-io adapter
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      ...
    </LocalizationProvider>
  );
}
```

## Basic usage

The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Localization

Use `LocalizationProvider` to change the date-engine locale that is used to render the time picker. Note that `am/pm` setting is switched automatically:

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Responsiveness

The time picker component is designed and optimized for the device it runs on.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `TimePicker` component uses a `@media (pointer: fine)` media query to determine which version to use.
This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Time validation

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Static mode

It's possible to render any picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Landscape

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
