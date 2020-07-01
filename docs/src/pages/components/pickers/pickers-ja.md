---
title: Date picker, Time picker React components
components: TextField
---

# 日付＆時間ピッカー

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- モバイルでは、ピッカーは確認ダイアログでの表示に最適です。
- ォームなどのインライン表示では、セグメント化されたドロップダウンボタンなどのコンパクトなコントロールの使用を検討してください。

## @material-ui/pickers

![Stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@ material-ui / pickers](https://material-ui-pickers.dev/) は、日付ピッカーおよび時間ピッカーコントロールを提供します。

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠ブラウザーによるネイティブ入力コントロールのサポート [は完全ではありません](https://caniuse.com/#feat=input-datetime)。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。 より充実したソリューションについては、 [@ material-ui / pickers](https://material-ui-pickers.dev/) をご覧ください。

### 日付ピッカー（Datepickers）

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### 日付＆時間ピッカー（Date & Time pickers）

`type="datetime-local"`を指定したネイティブの日付 & 時刻ピッカーの例。

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### 時間ピッカー（Time pickers）

`type="time"`を指定したネイティブの時間ピッカーの例。

{{"demo": "pages/components/pickers/TimePickers.js"}}