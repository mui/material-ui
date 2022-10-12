# Migração do @material-ui-pickers

<p class="description">@material-ui/pickers foi movido para o @material-ui/lab.</p>

:::warning
**⚠️ The date picker components were rewritten**. In most places, the logic was rewritten from scratch, so it isn't possible to maintain the whole list of changes. Here's an overview of the most important concepts that were changed. If you are going to upgrade, the easiest way might be to go through each picker usage in your codebase, and rewrite them one at a time. Don't forget to run your tests after each!
:::

This guide is an overview of the core concepts that were changed from pickers v3.2.10.

## Instalação

You need to install the `@mui/lab` package if it's not already installed. ⚠️ Make sure you have installed the latest version, `"@mui/lab": ^5.0.0-alpha.30"` or above.

## Importações

The `keyboard` version of pickers is no longer published. All versions of mobile and desktop pickers implement keyboard input for accessibility.

```diff
-import { KeyboardDatePicker } from '@material-ui/pickers';
+import DatePicker from '@material-ui/lab/DatePicker';

-<KeyboardDatePicker />
+<DatePicker />
```

Also, instead of providing a `variant` prop, these were moved to different imports, meaning that your bundle won't include `Dialog` if you are using only the desktop picker.

- `<DesktopDatePicker />` – Somente visualização em desktop.
- `<MobileDatePicker />` – Somente visualização em dispositivos móveis.
- `<DatePicker />` – Visualização móvel ou desktop de acordo com a preferência de **pointer** do usuário.
- `<StaticDatePicker />` – A própria visualização do seletor em si, sem um input ou qualquer componente encapsulado.

```diff
-import { DatePicker } from '@material-ui/pickers';
+import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

-<DatePicker variant="inline" />
+<DesktopDatePicker />
```

The same convention applies to `TimePicker` – `<DesktopTimePicker>` and `<MobileTimePicker />`.

## MuiPickersUtilsProvider

The `MuiPickersUtilsProvider` was removed in favor of `LocalizationProvider`. Also, pickers do not require you to install date-io adapters manually. Everything is included with the `lab`.

❌ Before:

```js
import AdapterDateFns from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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

## Renderizando input

We introduced a new **required** `renderInput` prop. This simplifies using non-MUI text field input components.

```jsx
<DatePicker renderInput={(props) => <TextField {...props} />} />
<TimePicker renderInput={(props) => <TextField {...props} />} />
```

Previously, props were spread on the `<TextField />` component. From now on you will need to use the new `renderInput` prop to provide these:

```diff
 <DatePicker
- label="Date"
- helperText="Something"
+ renderInput={props => <TextField label="Date" helperText="Something" /> }
/>
```

## Gerenciamento do estado

The state/value management logic for pickers was rewritten from scratch. Pickers will now call the `onChange` prop when each view of the date picker ends is completed. The `onError` handler is also completely different. Triple-check your pickers with forms integration, because form-integration issues can be subtle.

## Nenhuma máscara necessária

Mask is no longer required. Also, if your provided mask is not valid, pickers will just ignore the mask, and allow arbitrary input.

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

## E muito mais

- ````diff <DatePicker
  -  format="DD-MMM-YYYY"
  +  inputFormat="DD-MMM-YYYY" ``` ````

There are many changes, be careful, make sure your tests, and build pass. In the event you have an advanced usage of the date picker, it will likely be simpler to rewrite it.

Please open a pull request to improve the guide if you notice an opportunity for doing such.
