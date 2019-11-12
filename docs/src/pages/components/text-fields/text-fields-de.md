---
title: Text Field React-Komponente
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Felder (Text Fields)

<p class="description">Text Felder lassen Nutzer Text eingeben und bearbeiten.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. They typically appear in forms and dialogs.

## Textfeld

Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält.

It supports standard, outlined and filled styling.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

> **Note:** The standard variant of the `TextField` is no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support it.

## Form props

Standard form attributes are supported e.g. `required`, `readOnly`, `type`, etc. as well as a `helperText` which is used to give context about a field’s input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validation

The `error` prop toggles the error state, the `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Icons

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Input Adornments

The main way is with an `InputAdornment`. These can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Layout

`margin` can be used to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will. `dense` and `normal` alter other styles to meet the specification.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Komponenten

`TextField` is composed of smaller components ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), and [`FormHelperText`](/api/form-helper-text/) ) that you can leverage directly to significantly customize your form inputs.

You might also have noticed that some native HTML input properties are missing from the `TextField` component. This is on purpose. The component takes care of the most used properties, then it's up to the user to use the underlying component shown in the following demo. Still, you can use `inputProps` (and `InputProps`, `InputLabelProps` properties) if you want to avoid some boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Eingaben

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Farbe (Color)

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Customized inputs

Hier sind einige Beispiele, wie man die Komponente anpassen kann. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS, you can use composition to build custom components and give your app a unique feel. Below is an example using the [`InputBase`](/api/input-base/) component, inspired by Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Einschränkungen

### Shrink

The input label "shrink" state isn't always correct. The input label is supposed to shrink as soon as the input is displaying something. In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

or

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Floating label

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

## Integration with 3rd party input libraries

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries. The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

The provided input component should handle the `inputRef` property. The property should be called with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MyInputComponent(props) {
  const { component: Component, inputRef, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
}

// usage
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: { component: SomeThirdPartyComponent },
  }}
/>;
```

## Barrierefreiheit

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">E-Mail-Adresse</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Wir werden Ihre E-Mail niemals teilen.</span>
</div>
```

- Wenn Sie die Komponente `TextField` verwenden, müssen Sie nur eine eindeutige `Id`angeben.
- Wenn Sie die Komponente zusammenstellen:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">E-mail-Adresse</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">Wir werden Ihre E-Mail niemals teilen.</FormHelperText>
</FormControl>
```

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Eine Reihe von Wrapper-Komponenten, die die Verwendung der Material-Benutzeroberfläche mit Final Form erleichtern.
- [mui-rff](https://github.com/lookfirst/mui-rff) A set of wrapper components to facilitate using Material UI with React Final Form.