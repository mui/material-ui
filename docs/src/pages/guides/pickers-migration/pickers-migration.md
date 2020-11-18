# Upgrading from @material-ui-pickers

<p class="description"> @material-ui/pickers was moved to the @material-ui/lab </p>

## ☢️ Attention

Pickers were entirely changed. In most places, the logic was rewritten from scratch, so it is not possible to maintain the whole list of changes. Here is an overview of the most important concepts that were changed. If you are going to migrate – the easiest way will be to go through the component usages in your codebase and rewrite them one-by-one. Do not forget to run your tests after all!

This guide is an overview of the core concepts that were changed from the pickers v3.2.10.

## ⬇️ Install

First of all you need to install the `@material-ui/lab` if it's not installed. Nothing more required.

## 🌚 Imports

We do not expose the `keyboard` version of pickers anymore. All the version of mobile and desktop pickers implements keyboard inputs for accessibility reasons.

```diff
- import { KeyboardDatePicker } from '@material-ui/pickers'
+ import { DatePicker } from '@material-ui/lab'

- <KeyboardDatePicker />
+ <DatePicker />
```

Also instead of `variant` prop specific wrappers of components were moved to different imports. So you will not bundle the `Dialog` if you are using only desktop picker view.

- `<DesktopDatePicker />` – Only desktop view.
- `<MobileDatePicker />` – Only mobile view.
- `<DatePicker />` – Mobile or Desktop view according to the user **pointer** preference.
- `<StaticDatePicker />` – The picker view itself, without input or any other wrapper.

```diff
+ import { DesktopDatePicker } from '@material-ui/lab'

- <DatePicker variant="inline" />
+ <DesktopDatePicker />
```

The same convention for `TimePicker` – `<DesktopTimePicker>` and `<MobileTimePicker />`.

## MuiPickersUtilsProvider

The `MuiPickersUtilsProvider` was removed in favor of `LocalizationProvider`. Also, pickers do not require to install date-io adapters manually. Everything comes together with the `lab`.

❌ Before:

```jsx
import AdapterDateFns from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
```

✅ After:

```jsx
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      ...
    </LocalizationProvider>
  )
);
```

## Render input

We introduced a new **required** `renderInput` prop. It simplifies using different than material-ui text field input components.

```jsx
<DatePicker renderInput={(props) => <TextField {...props} />} />
<TimePicker renderInput={(props) => <TextField {...props} />} />
```

Also before we were spreading props down to the `<TextField />` props. From now you need to use this new **required prop** `renderInput` to render the prop:

```diff
  <DatePicker
-   label="Date"
-   helperText="Something"
+   renderInput={props => <TextField label="Date" helperText="Something" /> }
  />
```

## State management

The state/value management logic for pickers was rewritten from scratch. They will now call the `onChange` prop when each view of picker ends its input and `onError` handler is now completely different. Triple-check your pickers with forms integration, because form-integration issues can be not obvious.

## No required mask

Mask is no longer required. If your passed mask is not valid for the input – pickers will just ignore the mask input and allow the arbitrary input.

```jsx
<DatePicker
  mask="mm"
  value={new Date()}
  onChange={console.log}
  renderInput={(props) => (
    <TextField {...props} helperText="invalid mask" />
  )}
/>

<DatePicker
  value={new Date()}
  onChange={console.log}
  renderInput={(props) => (
    <TextField {...props} helperText="valid mask" />
  )}
/>
```

## And many more

There are a lot more changes, like prop renames, deletions, etc. Be careful to update using find & replace. Make sure your tests and build passed!
