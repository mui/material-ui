---
product: material-ui
title: React Time Picker component
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: time picker'
packageName: '@mui/lab'
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
// or @mui/lab/Adapter{DayJS,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic usage

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "BasicTimePicker.js"}}

## Static mode

It's possible to render any time picker inline. This will enable building custom popover/modal containers.

{{"demo": "StaticTimePickerDemo.js", "bg": true}}

## Responsiveness

The time picker component is designed and optimized for the device it runs on.

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches.
This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "ResponsiveTimePickers.js"}}

## Form props

The time picker component can be disabled or read-only.

{{"demo": "FormPropsTimePickers.js"}}

## Localization

Use `LocalizationProvider` to change the date-engine locale that is used to render the time picker.
The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with `ampm` prop.

{{"demo": "LocalizedTimePicker.js"}}

## Time validation

{{"demo": "TimeValidationTimePicker.js"}}

## Landscape

{{"demo": "StaticTimePickerLandscape.js", "bg": true}}

## Sub-components

Some lower-level sub-components (`ClockPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "SubComponentsTimePickers.js"}}

## Seconds

The seconds input can be used for selection of a precise time point.

{{"demo": "SecondsTimePicker.js"}}
