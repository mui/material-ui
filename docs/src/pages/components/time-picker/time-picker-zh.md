---
title: React Time Picker（时间选择器）组件
components: TimePicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Time Picker 时间选择器

<p class="description">时间选择器允许用户选择单一的时间。</p>

时间选择器允许用户选择一个单一的时间（小时：分钟格式）。 选定的时间由时针末端的填充圆圈表示。

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

时间选择器会自动调整到当地的时间设置，即 12 小时或 24 小时格式。 这可以通过 `ampm` 属性来控制。

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Localization 本地化

使用 `LocalizationProvider` 来改变用于渲染时间选择器的数据引擎的本地化。 请注意， `am/pm` 的设置是自动切换的：

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## 响应式

时间选择器组件是为它运行的设备设计和优化。

- “手机（Mobile）”版本最适合触控设备和小型屏幕。
- “桌面（Mobile）”版本最适合鼠标设备和大型屏幕。

默认情况下， `TimePicker` 组件使用 `@media (pointer: fine)` 媒体查询来确定使用哪个版本。 你也可以使用 `desktopModeMediaQuery` 属性来自定义它。

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## 验证时间

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## 静态模式

可以将任何选择器内嵌渲染。 这将启用自定义弹出提示/模态框的容器。

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## 横屏

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## 秒

秒的输入可以用来选择一个精确的时间点。

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
