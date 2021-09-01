---
title: Date picker, Time picker React components
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# Поля выбора даты/времени

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- На мобильном устройстве лучше всего отображать в модальном окне.
- Для инлайн-отображения, например в формах стоит рассмотреть возможность использования более компактных элементов управления, таких как сегментированные выпадающие кнопки.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React components

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ Поддержка нативных типов полей ввода [не идеальна](https://caniuse.com/#feat=input-datetime).

### Date picker

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time picker

Нативное поля выбора даты и времени с помощью `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time picker

Нативное поле выбора времени с помощью `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
