---
title: React Time Picker（时间选择器）组件
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@mui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker 时间选择器

<p class="description">时间选择器允许用户选择一个单独的时间。</p>

时间选择器允许用户选择一个单一的时间（格式为：小时：分钟）。 选定的时间由时针末端的填充圆圈表示。

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

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Static mode

It's possible to render any time picker inline. This will enable building custom popover/modal containers.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Responsiveness

时间选择器组件是为它运行的设备设计和优化。

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Form props

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localization

使用 `LocalizationProvider` 来改变用于渲染时间选择器的数据引擎的本地化。 时间选择器会自动调整为当地时间，即 12 小时或 24 小时格式。 这可以通过 `ampm` 属性来控制。

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## 验证时间

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## 横屏

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Sub-components

Some lower-level sub-components (`ClockPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## 秒

秒的输入可以用来选择一个精确的时间点。

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
