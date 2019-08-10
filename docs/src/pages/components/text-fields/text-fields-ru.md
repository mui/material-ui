---
title: Текстовое Поле, компонент React
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Текстовые поля

<p class="description">Текстовые поля позволяют пользователям вводить и редактировать текст.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. They typically appear in forms and dialogs.

## Текстовое поля

`TextField` представляет собой полноценный элемент управления формы, включая метку (label), само поле ввода и вспомогательный текст.

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Note:** This version of the text field is no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support it.

## Контурный стиль

`TextField` поддерживает контурный стиль.

{{"demo": "pages/components/text-fields/OutlinedTextFields.js"}}

## Заполненный стиль

`TextField` поддерживает заполненный стиль.

{{"demo": "pages/components/text-fields/FilledTextFields.js"}}

## Компоненты

`TextField` состоит из более мелких компонентов ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), и [`FormHelperText`](/api/form-helper-text/) ) которые вы можете использовать напрямую, чтобы значительно кастомизировать ваши поля ввода.

Вы также могли заметить, что некоторые нативные свойства ввода HTML отсутствуют в компоненте `TextField`. Это сделано специально. Компонент включает в себя наиболее часто используемые свойства, а для расширенного использования можно использовать базовый компонент, показанный в следующей демонстрации. Вы все еще можете использовать `inputProps` (и `свойства InputProps`, `InputLabelProps`), если хотите избежать излишнего кода.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Поля ввода

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Кастомизированные поля ввода

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Настройка не ограничивается CSS, вы можете использовать композицию для создания пользовательских компонентов и придать вашему приложению уникальный стиль. Ниже приведен пример использования компонента [`InputBase`](/api/input-base/), вдохновленный Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Украшения поля ввода (Input)

`Input` позволяет использовать `InputAdornment`. Их можно использовать для добавления префикса, суффикса или действия к полю ввода. Например, вы можете использовать кнопку-иконку, чтобы скрыть или показать пароль.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### С иконкой

Иконки могут быть указаны как предварительно добавленные или добавленные.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Украшение полей ввода с заполненным стилем

{{"demo": "pages/components/text-fields/FilledInputAdornments.js"}}

### Украшение полей ввода с контурным стилем

{{"demo": "pages/components/text-fields/OutlinedInputAdornments.js"}}

## Расположение

`TextField`, `FormControl` позволяет спецификации `margin` изменять вертикальные отступы для полей ввода. Использование `none` (по умолчанию) не будет применять отступы для `FormControl`, тогда как `dense` и `normal` будут применять другие стили, которые соответствуют спецификации.

{{"demo": "pages/components/text-fields/TextFieldMargins.js"}}

## Ограничения

### Shrink

Состояние метки поля ввода (label) "shrink" не всегда корректно. Предполагается, что метка поля ввода уменьшается, как только в поле ввода что-нибудь отображается. В некоторых случаях мы не можем определить состояние "shrink" (числовое поле, поле даты, Stripe input). Вы могли заметить совпадения.

![сжатие](/static/images/text-fields/shrink.png)

Чтобы решить эту проблему, вы можете принудительно изменить состояние метки.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

или

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Floating label

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

## Integration with 3rd party input libraries

Вы можете использовать сторонние библиотеки для форматирования ввода. Вы должны предоставить пользовательскую реализацию элемента `<input>` со свойством `inputComponent`.

В следующем примере используются библиотеки [response-text-mask](https://github.com/text-mask/text-mask) и [response-number-format](https://github.com/s-yadav/react-number-format). The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

Предоставленный компонент ввода должен обрабатывать свойство `inputRef`. The property should be called with a value that implements the following interface:

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

## Доступность

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">Адрес электронной почты</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Мы никогда не распостраним ваш адрес.</span>
</div>
```

- Если вы используете компонент `TextField`, вам просто нужно предоставить уникальный `id`.
- Если вы составляете компонент:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Адрес электронной почты</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">Мы никогда не распостраним ваш адрес.</FormHelperText>
</FormControl>
```

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Набор компонентов-оберток для облегчения работы с Material UI в связке с Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Привязки для использования Material-UI с formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Набор компонентов-оберток для облегчения работы с Material UI в связке с Final Form.