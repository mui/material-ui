---
title: Composant React de champ de texte
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---
# Champ de texte

<p class="description">Les champs de texte permettent aux utilisateurs d'entrer et de modifier du texte.</p>

[Les champs de texte](https://material.io/design/components/text-fields.html) permettent aux utilisateurs de saisir du texte dans une interface utilisateur. Ils apparaissent généralement dans les formulaires et les boîtes de dialogue.

## TextField

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide.

{{"demo": "pages/demos/text-fields/TextFields.js"}}

> **Remarque:** Cette version du champ de texte n'est plus documentée dans la documentation de material design.

## Outlined

`TextField` supports outlined styling.

{{"demo": "pages/demos/text-fields/OutlinedTextFields.js"}}

## Filled

`TextField` supports filled styling.

{{"demo": "pages/demos/text-fields/FilledTextFields.js"}}

## Composants

`TextField` est composé d'éléments plus petits ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), et [`FormHelperText`](/api/form-helper-text/) ) que vous pouvez utiliser directement pour personnaliser de manière significative vos entrées de formulaire.

You might also have noticed that some native HTML input properties are missing from the `TextField` component. This is on purpose. The component takes care of the most used properties, then it's up to the user to use the underlying component shown in the following demo. Still, you can use `inputProps` (and `InputProps`, `InputLabelProps` properties) if you want to avoid some boilerplate.

{{"demo": "pages/demos/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/demos/text-fields/Inputs.js"}}

## Customized inputs

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here's an example of how you can change the main color of an Input.

⚠️ Bien que les spécifications de conception des matériaux encouragent la thématisation, ces exemples sortent des sentiers battus.

{{"demo": "pages/demos/text-fields/CustomizedInputs.js"}}

Customization does not stop at CSS, you can use composition to build custom components and give your app a unique feel. Below is an example using the [`InputBase`](/api/input-base/) component, inspired by Google Maps.

{{"demo": "pages/demos/text-fields/CustomizedInputBase.js"}}

## Input Adornments

`Input` allows the provision of `InputAdornment`. These can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/demos/text-fields/InputAdornments.js"}}

### With icon

Icons can be specified as prepended or appended.

{{"demo": "pages/demos/text-fields/InputWithIcon.js"}}

### Filled Input Adornments

{{"demo": "pages/demos/text-fields/FilledInputAdornments.js"}}

### Outlined Input Adornments

{{"demo": "pages/demos/text-fields/OutlinedInputAdornments.js"}}

## Layout

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter other styles to meet the specification.

{{"demo": "pages/demos/text-fields/TextFieldMargins.js"}}

## Limitations

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

## Formatted inputs

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property. The provided input component should handle the `inputRef` property. The property should be called with a value implementing the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) interface.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

## Accessibility

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- If you are using the `TextField` component, you just have to provide a unique `id`.
- If you are composing the component:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## Projets complémentaires

For more advanced use cases you might be able to take advantage of:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.
- [uniforms-material](https://github.com/vazco/uniforms/tree/master/packages/uniforms-material) Material-UI wrapper components for Uniforms, a set of React libraries for building forms.