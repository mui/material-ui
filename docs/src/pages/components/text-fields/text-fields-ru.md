---
title: Текстовое Поле, компонент React
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Текстовые поля

<p class="description">Текстовые поля позволяют пользователям вводить и редактировать текст.</p>

[Текстовые поля](https://material.io/design/components/text-fields.html) позволяют пользователям вводить текст в интерфейсe. Они обычно появляются в формах и диалогах.

## Текстовое поля

`TextField` представляет собой полноценный элемент управления формы, включая метку (label), само поле ввода и вспомогательный текст.

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Примечание:** Эта версия текстового поля больше не документирована в спецификации Material Design.

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

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

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

## Форматированное поле ввода

Вы можете использовать сторонние библиотеки для форматирования ввода. Вы должны предоставить пользовательскую реализацию элемента `<input>` со свойством `inputComponent`. Предоставленный компонент ввода должен обрабатывать свойство `inputRef`. Свойство должно вызываться со значением, реализующим интерфейс [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).

В следующем примере используются библиотеки [response-text-mask](https://github.com/text-mask/text-mask) и [response-number-format](https://github.com/s-yadav/react-number-format).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

## Доступность

Для того, чтобы текстовое поле было доступно, **поле ввода должно быть связано с меткой и вспомогательным текстом**. Базовые узлы DOM должны иметь эту структуру.

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