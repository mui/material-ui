---
title: Date picker, Time picker React components
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# 日付＆時間ピッカー

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- モバイルでは、ピッカーは確認ダイアログでの表示に最適です。
- フォームなどのインライン表示では、セグメント化されたドロップダウンボタンなどのコンパクトなコントロールの使用を検討してください。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## React components

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠ブラウザーによるネイティブ入力コントロールのサポート [は完全ではありません](https://caniuse.com/#feat=input-datetime)。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。

### Date picker

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time picker

`type="datetime-local"`を指定したネイティブの日付 & 時刻ピッカーの例。

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time picker

`type="time"`を指定したネイティブの時間ピッカーの例。

{{"demo": "pages/components/pickers/TimePickers.js"}}
