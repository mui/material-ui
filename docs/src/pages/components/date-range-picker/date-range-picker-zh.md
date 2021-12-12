---
title: React Date Range Picker（日期范围选择器）组件
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@mui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Range Picker [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/) 日期范围选择器

<p class="description">日期选择器让用户选择一系列的日期。
</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for MUI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> 该付费扩展将包括更高级的组件（大数据栅格，时间范围选择器，可拖动的树形视图 & 拖放组件等等）。 你现在可以以实惠的价格 [提前使用](https://material-ui.com/store/items/material-ui-pro/)。

日期范围选择器让用户选择一个日期范围。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @mui/lab/dateAdapter/{dayjs,luxon,moment} or any valid date-io adapter
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Basic usage

请注意，你可以从 [DatePicker](/api/date-picker/) 中传递几乎任何的属性。

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Static mode

可以将任何选择器内嵌渲染。 这将启用自定义弹出提示/模态框的容器。

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## Responsiveness

日期范围选择器组件是针对运行它的设备进行设计并优化的。

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Form props

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## 不同的月数

请注意，`calendars` 属性仅运行在桌面端。

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## 禁用日期

禁用日期的行为与 `DatePicker` 相同。

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Custom input component

你可以使用 `renderInput` 属性来渲染自定义的输入。 对于 `DateRangePicker`，它需要**两个**参数 – 分别是开始和结束输入。 如果你需要渲染自定义的输入，请确保将 `ref` 和 `inputProps` 都正确地传入到输入组件中。

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Customized day rendering

The displayed days are customizable with the `renderDay` function prop. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
