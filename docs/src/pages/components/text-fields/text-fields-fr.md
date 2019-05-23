---
title: Composant React de champ de texte
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Fields (Champs de texte)

<p class="description">Les champs de texte permettent aux utilisateurs d'entrer et de modifier du texte.</p>

[Les champs de texte](https://material.io/design/components/text-fields.html) permettent aux utilisateurs de saisir du texte dans une interface utilisateur. Ils apparaissent généralement dans des formulaires et des boîtes de dialogue.

## TextField

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide.

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Remarque:** Cette version du champ de texte n'est plus documentée dans la documentation de material design.

## Encadré

`TextField` prend en charge le style encadré.

{{"demo": "pages/components/text-fields/OutlinedTextFields.js"}}

## Remplis

`TextField` prend en charge le style rempli.

{{"demo": "pages/components/text-fields/FilledTextFields.js"}}

## Composants

`TextField` est composé d'éléments plus petits ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), et [`FormHelperText`](/api/form-helper-text/) ) que vous pouvez utiliser directement pour personnaliser de manière significative vos entrées de formulaire.

Vous avez peut-être également remarqué que certaines propriétés d'entrée HTML natives sont absentes du composant `TextField`. C'est intentionnel. Le composant prend en charge les propriétés les plus utilisées, puis il appartient à l'utilisateur d'utiliser le composant sous-jacent présenté dans la démonstration suivante. Néanmoins, vous pouvez utiliser `inputProps` (et `InputProps`, `InputLabelProps` propriétés) pour aller plus vite.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Inputs personnalisées

Voici quelques exemples de personnalisation du composant. Vous pouvez en apprendre plus sur [la page de documentation de personnalisation](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

La personnalisation ne se limite pas aux CSS, vous pouvez utiliser la composition pour créer des composants personnalisés et donner à votre application une sensation unique. Voici un exemple utilisant le composant [`InputBase`](/api/input-base/), inspiré de Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Input Adornments

`Input` allows the provision of `InputAdornment`. These can be used to add a prefix, a suffix or an action to an input. For instance, you can use an icon button to hide or reveal the password.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### Avec Icone

Icons can be specified as prepended or appended.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Filled Input Adornments

{{"demo": "pages/components/text-fields/FilledInputAdornments.js"}}

### Outlined Input Adornments

{{"demo": "pages/components/text-fields/OutlinedInputAdornments.js"}}

## Disposition

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter other styles to meet the specification.

{{"demo": "pages/components/text-fields/TextFieldMargins.js"}}

## Restrictions

The input label "shrink" state isn't always correct. The input label is supposed to shrink as soon as the input is displaying something. In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

Pour contourner le problème, vous pouvez forcer l'état "shrink" de la legende.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

## Formatted inputs

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property. The provided input component should handle the `inputRef` property. The property should be called with a value implementing the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) interface.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

## Accessibilité

Pour que le champ de texte soit accessible, **le champ de texte doit être lié au label et au texte d'assistance**. Les nœuds DOM sous-jacents doivent avoir cette structure.

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- Si vous utilisez le composant `TextField` , il vous suffit de fournir un identifiant unique `id`.
- Si vous composez le composant:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.