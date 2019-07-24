# Customizing components

<p class="description">You can easily customize the appearance of a Material-UI component.</p>

As components can be used in different contexts, there are several approaches to this. Going from the narrowest use-case to the broadest, these are:

1. [Конкретное изменение для единичного случая](#1-specific-variation-for-a-one-time-situation)
2. [Динамическое изменение для единичного случая](#2-dynamic-variation-for-a-one-time-situation)
3. [Особый вариант компонента](#3-specific-variation-of-a-component) использумый в различных контекстах
4. [Material Design варианты](#4-material-design-variations) как у компонента кнопка
5. [Глобальное изменение темы](#5-global-theme-variation)

## 1. Конкретное изменение для единичного случая

Возможно, вам придется изменить стиль компонента в конкретном месте. Для этого вам предоставляются следующие методы:

### Overriding styles with class names

Первый способ переопределения стиля компонента - использовать **имена классов**. Каждый компонент предоставляет свойство `className` которое всегда применяется к корневому элементу.

В этом примере компонент высшего-порядка [`withStyles()`](/styles/basics/#higher-order-component-api) используется для внедрения пользовательских стилей в DOM и передачи имени класса компоненту `ClassNames` через его свойство `classes`. Для создания стилей вы можете воспользоваться [любым доступным стилевым решением](/guides/interoperability/), вплоть до обычного CSS, но вы обязаны принимать во внимание [порядок внедрения CSS](/styles/advanced/#css-injection-order), поскольку CSS внедренный в DOM через Material-UI имеет максимально возможную специфичность, так как `<link>` внедряется в самом конце раздела `<head />` для гарантии корректного отображения компонентов.

{{"demo": "pages/customization/components/ClassNames.js"}}

### Overriding styles with classes

Когда ` className ` свойства недостаточно, и вам нужен доступ ко вложенным элементам, вы можете воспользоваться свойством объекта `classes` для настройки всех CSS, внедренных через Material-UI для данного компонента. Список классов для каждого компонента описан в разделе **Компонент API**. Для примера можете взглянуть на [Button CSS API](/api/button/#css). Кроме того, вы можете воспользоваться [встроенными в браузер инструментами разработчика](#using-the-dev-tools).

В этом примере также используется ` withStyles() ` (см. выше), но теперь ` ClassesNesting ` присваивает свойству `classes` компонета `Button` обьект сопоставляющий **имена переопределяемых классов** (стилевые правила) с **именам использумых классов CSS ** (значениями). Существующие классы компонента будут по прежнему внедряться, поэтому необходимо указать только те стили, которые вы хотите добавить или переопределить.

Обратите внимание, что в дополнение к стилю кнопки, стиль текста кнопки был изменен на стиль с заглавными буквами:

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### Использование инструментов разработчика

Инструменты разработчика браузера могут сэкономить вам много времени. В режиме разработки имена классов Material-UI [следуют простому шаблону](/styles/advanced/#class-names): ` Mui[имя компонента]-[имя стилевого правила]-[UUID]`.

Вернемся к упомянутому выше примеру. Как вы можете переопределить текст кнопки?

![Инструменты разработчика](/static/images/customization/dev-tools.png)

Используя инструменты разработчика, вы знаете, что вам нужно нацелиться на компонент `Button` и стилевое правило `label`:

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### Краткая запись

Приведенный выше пример кода может быть сокращен за счет использования **того же CSS API ** в качестве дочернего компонента. В этом примере компонент высшего порядка `withStyles()` внедряет свойство `classes`, используемое затем [компонентом `Button` ](/api/button/#css).

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### Pseudo-classes

The components special states, like *hover*, *focus*, *disabled* and *selected*, are styled with a higher CSS specificity. [Специфичность - это весовой коэффициент](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) применяемый к данной декларации CSS.

In order to override the components special states, **you need to increase specificity**. Вот пример с *отключеным* состоянием и компонентом кнопка использующим **псевдокласс** (`:disabled`):

```css
.Button {
  color: black;
}
.Button:disabled { /* We increase the specificity */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

Иногда вы не можете использовать **псевдо-класс**, так как это состояние в платформе отсутствует. В качестве примера можно привести компонент пункт меню и состояние *выбрано*. Aside from accessing nested elements, the `classes` property can be used to customize the special states of Material-UI components:

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* We increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### Почему я должен повышать специфичность для переопределения отдельного состояния компонента?

Спецификация CSS, по определению, обязывает псевдоклассы повышать специфичность. For consistency, Material-UI increases the specificity of its custom pseudo-classes. This has one important advantage, it allows you to cherry-pick the state you want to customize.

#### Can I use a different API that requires fewer boilerplate?

Instead of providing values to the `classes` prop API, you can rely on [the global class names](/styles/advanced/#with-material-ui-core) generated by Material-UI. It implements all these custom pseudo-classes:

| classes key  | Global class name |
|:------------ |:----------------- |
| checked      | Mui-checked       |
| disabled     | Mui-disabled      |
| error        | Mui-error         |
| focused      | Mui-focused       |
| focusVisible | Mui-focusVisible  |
| required     | Mui-required      |
| expanded     | Mui-expanded      |
| selected     | Mui-selected      |

```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* We increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### Используйте `$ruleName` для ссылки на правило в той же таблице стилей

Плагин [jss-nested](https://github.com/cssinjs/jss-nested) (доступный по умолчанию) позволяет упростить процесс повышения специфичности.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

компилируется в:

```css
.root-x.disable-x {
  color: white;
}
```

⚠️ ️ Чтобы это сработало, вам нужно применить к DOM оба сгенерированных имени класса (`root` & `disabled`).

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### Overriding with inline-styles

Второй способ переопределить стиль компонента – использовать подход **встроенного стиля**. Каждый компонент предоставляет свойство `style`. Эти свойства всегда применяются к корневому элементу.

Вам не нужно беспокоиться о специфичности CSS, так как встроенный стиль имеет приоритет над обычным CSS.

{{"demo": "pages/customization/components/InlineStyle.js"}}

[Когда я должен использовать встраиваемый стиль, а когда классы?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. Динамическое изменение для единичного случая

You have learned how to override the style of a Material-UI component in the previous section. Теперь давайте посмотрим, как мы можем сделать эти переопределения динамическими. Here are five alternatives; each has it's pros and cons.

### Динамический CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### Ответвление имени класса

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS переменные

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### Inline-styles

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### Вложенные темы

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. Особый вариант компонента

Возможно вам потребуется создать вариант компонента и использовать его в разных контекстах, например раскрашенную кнопку на странице вашего товара, но вы, вероятно, захотите сохранить свой код [*компактным*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Наилучший подход состоит в том, чтобы следовать варианту 1, а затем воспользоваться преимуществами композиции React, экспортируя настроенный компонент для использования там, где он вам нужен.

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Material Design варианты

Спецификация Material Design допускает существование некоторых компонентов в различных вариантах. Так, например, кнопки реализованы в разных формах: [text](https://material.io/design/components/buttons.html#text-button) (прежде "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (прежде "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) и другие.

Material-UI старается реализовать все эти варианты. Пожалуйста, обратитесь к разделу документации [Поддерживаемые компоненты](/getting-started/supported-components/), чтобы узнать текущее состояние реализации всех компонентов Material Design.

## 5. Глобальное изменение темы

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes.

The demos of this section covers how to the change the button's font size.

### Настраиваемые параметры темы

You can adjusting the [theme configuration variables](/customization/themes/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### Глобальное переопределение CSS

Вы также можете настроить все экземпляры компонента с помощью CSS. Для этого мы предоставляем [глобальные имена классов](/styles/advanced/#with-material-ui-core). Это очень похоже на настройку Bootstrap.

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### Глобальное переопределение темы

Вы можете воспользоваться `переопределением` ключевых параметров `темы`, чтобы потенциально изменить любой стиль, внедренный Material-UI в DOM. Дальнейшие подробности об этом в разделе документации [темы](/customization/globals/#css).

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}