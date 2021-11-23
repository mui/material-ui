---
title: React Date Picker（日期选择器）和 Time Picker（时间选择器）组件
components: DatePicker,DateTimePicker,TimePicker,TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@mui/lab'
---

# Date/Time pickers日期/时间选择器

<p class="description">Date pickers and Time pickers allow selecting a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in a confirmation dialog.
- 若是内联显示，如在一个表单内展示，请考虑使用分段下拉按钮这样的紧凑型控件。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React 组件

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

### Setup

You need to provide a date-library that is used by the pickers by setting the `dateAdapter` to an adapter of your choosing.

We currently support 4 different date-libraries:

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Moment.js](https://momentjs.com/)

First you have to install the adapter package for the date-library you want to use:

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

Then you have to set the `dateAdapter` prop of the `LocalizationProvider` accordingly:

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

Native date (`type="date"`), time (`type="time"`) and date&time (`type="datetime-local"`) pickers.

{{"demo": "pages/components/pickers/NativePickers.js"}}
