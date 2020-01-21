---
title: Текстовое Поле, компонент React
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Field (Текстовое поле)

<p class="description">Текстовые поля позволяют пользователям вводить и редактировать текст.</p>

[Текстовые поля](https://material.io/design/components/text-fields.html) позволяют пользователям вводить текст в интерфейсе. Обычно они появляются в формах и диалогах.

## Текстовое поля

`TextField` представляет собой полноценный элемент управления формы, включая метку (label), само поле ввода и вспомогательный текст.

It supports standard, outlined and filled styling.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Note:** The standard variant of the `TextField` is no longer documented in the [Material Design guidelines](https://material.io/) ([here's why](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)), but Material-UI will continue to support it.

## Form props

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field’s input, such as how the input will be used.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validation

The `error` prop toggles the error state, the `helperText` prop can then be used to provide feedback to the user about the error.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select (Список)

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Иконки

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Украшения поля ввода (Input)

The main way is with an `InputAdornment`. Их можно использовать для добавления префикса, суффикса или действия к полю ввода. Например, вы можете использовать кнопку-иконку, чтобы скрыть или показать пароль.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Размеры

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## Расположение

`margin` can be used to alter the vertical spacing of inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will. `dense` and `normal` alter other styles to meet the specification.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Компоненты

`TextField` состоит из более мелких компонентов ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), и [`FormHelperText`](/api/form-helper-text/) ) которые вы можете использовать напрямую, чтобы значительно кастомизировать ваши поля ввода.

Вы также могли заметить, что некоторые нативные свойства ввода HTML отсутствуют в компоненте `TextField`. Это сделано специально. Компонент включает в себя наиболее часто используемые свойства, а для расширенного использования можно использовать базовый компонент, показанный в следующей демонстрации. Вы все еще можете использовать `inputProps` (и `свойства InputProps`, `InputLabelProps`), если хотите избежать излишнего кода.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Поля ввода

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Цвет

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Кастомизированные поля ввода

Ниже находятся примеры кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Настройка не ограничивается CSS, вы можете использовать композицию для создания пользовательских компонентов и придать вашему приложению уникальный стиль. Ниже приведен пример использования компонента [`InputBase`](/api/input-base/), вдохновленный Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

## Ограничения

### Сжатие

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

### Плавающая метка

Плавающий ярлык абсолютно позиционируется, он не повлияет на макет страницы. Необходимо убедиться, что поле ввода больше, чем метка для корректного отображения.

## Интеграция с сторонними библиотеками текстовых полей

Вы можете использовать сторонние библиотеки для форматирования ввода. Вы должны предоставить пользовательскую реализацию элемента `<input>` со свойством `inputComponent`.

В следующем примере используются библиотеки [response-text-mask](https://github.com/text-mask/text-mask) и [response-number-format](https://github.com/s-yadav/react-number-format). The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

Предоставленный компонент ввода должен обрабатывать свойство `inputRef`. Свойство должно вызываться со значением, которое реализует следующий интерфейс:

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

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Привязки для использования Material-UI с formik.
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Набор компонентов-оберток для облегчения работы с Material UI в связке с Redux Form.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Набор компонентов-оберток для облегчения работы с Material UI в связке с Final Form.
- [mui-rff](https://github.com/lookfirst/mui-rff) A set of wrapper components to facilitate using Material UI with React Final Form.