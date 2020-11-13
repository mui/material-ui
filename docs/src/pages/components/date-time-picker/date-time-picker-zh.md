---
title: React Date Time Picker（日期时间选择器） 组件
components: DateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker 日期时间选择器

<p class="description">合并日期和时间选择。</p>

该组件合并了日期 & 时间选择器。 它允许用户在一套控制逻辑下同时选择日期和时间。

请注意，该组件将 [DatePicker](/components/date-picker/) 和 [TimePicker](/components/time-picker/) 组件组合起来，所以这两个组件的任何属性都可以传递到日期时间选择内。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 要求

该组件依赖于你所使用的日期管理库。 它支持 [date-fns](https://date-fns.org/)，[luxon](https://moment.github.io/luxon/)，[dayjs](https://github.com/iamkun/dayjs)，[moment](https://momentjs.com/) 以及其他任何使用公共 `dateAdapter` 接口的库。

请安装这些库中的任何一个，并使用 `LocalizationProvider` 来包裹到你的 root（或者包裹到该选择器你想要应用的最高位置）来设置正确的日期引擎。

```jsx
// 或者使用 @material-ui/lab/dateAdapter/{dayjs,luxon,moment} 或者使用任何有效的 date-io 适配器
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

## 基本用法

该组件运行在选择时间之后再选择日期。 有 4 个步骤可供选择（年、日期、小时和分钟），所以需要用标签来直观地区分日期/时间步骤。

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## 响应式

`DateTimePicker` 组件为其运行的设备设计和优化。

- “手机（Mobile）”版本最适合触控设备和小型屏幕。
- “桌面（Mobile）”版本最适合鼠标设备和大型屏幕。

默认情况下， `DateTimePicker` 组件使用 `@media (pointer: fine)` 媒体查询来确定使用哪个版本。 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## 对日期和时间进行验证

可以通过以下两种方式限制日期和时间的选择：

- 通过使用 `minDateTime`/`maxDateTime` 可以将时间选择限制在某一特定时刻之前或之后。
- 使用 `minTime`/`maxTime`，你可以分别在每天的某个时间之前或之后禁止选择时间。

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Customization 个性化

以下是一些高度定制的日期 & 时间选择器的例子：

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
