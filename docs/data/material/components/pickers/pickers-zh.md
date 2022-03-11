---
product: material-ui
title: React Date Picker（日期选择器）和 Time Picker（时间选择器）组件
components: DatePicker, DateTimePicker, TimePicker, TextField
githubLabel: 'component: date picker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
---

# Date/Time pickers 日期/时间选择器

<p class="description">日期选择器和时间选择器提供了一个从事先设定好的日期集合中选择单个值的简单方法。</p>

- 在移动端，选择器最适合在确认对话框中展示。
- 若是内联显示，如在一个表单内展示，请考虑使用分段下拉按钮这样的紧凑型控件。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React 组件

{{"demo": "MaterialUIPickers.js"}}

### 日期选择器

⚠️ 浏览器支持的原生输入控件[并不是完美的](https://caniuse.com/#feat=input-datetime)。

示例展示了当 `type="date"` 时的原生的日期选择器 。

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [时间选择器](https://momentjs.com/)

{{"demo": "DatePickers.js"}}

```sh
// date-fns
npm install @date-io/date-fns
// or for Day.js
npm install -s @date-io/dayjs
// or for Luxon
npm install -s @date-io/luxon
// or for Moment.js
npm install @date-io/moment
```

这个例子通过 `type="datetime-local"` 实现了原生的日期和时间选择器。

```js
// date-fns
import DateAdapter from '@mui/lab/AdapterDateFns';
// or for Day.js
import DateAdapter from '@mui/lab/AdapterDayjs';
// or for Luxon
import DateAdapter from '@mui/lab/AdapterLuxon';
// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider>
  );
}
```

## 原生的选择器

⚠️ 浏览器原生输入控件[并不完美](https://caniuse.com/#feat=input-datetime)。

这个例子通过 `type="time"` 实现了原生的时间选择器。

{{"demo": "TimePickers.js"}}
