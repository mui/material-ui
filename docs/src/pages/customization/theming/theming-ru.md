# Темизация

<p class="description">Настройте Material-UI с помощью вашего шаблона. Вы можете изменить цвета, типографику и многое другое.</p>

В шаблоне указывается цвет компонентов, темнота поверхностей, уровень тени, соответствующая непрозрачность чернильных элементов и т. д.

Шаблоны позволяют оформить ваше приложение в соответствующем стиле. Они **позволяют настроить все аспекты дизайна** вашего проекта, в соответствии с конкретными потребностями вашего бизнеса или бренда.

Для достижения согласованности в оформлении приложений, вам доступны темы двух типов: светлые и темные. По умолчанию компоненты используют темы светлого типа.

## Провайдер темы

Если вы хотите настроить тему, вам нужно использовать компонент `ThemeProvider`, чтобы добавить тему в ваше приложение. Однако это необязательно; компоненты Material-UI поставляются с базовой темой, по умолчанию.

Вы можете узнать больше об этом в [ разделе API](/styles/api/#themeprovider). `ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.

## Переменные конфигурации темы

Изменение переменных конфигурации темы (theme configuration variables) — наиболее эффективный способ настройки Material-UI под ваши потребности. В следующих разделах рассматриваются наиболее важные переменные темы:

- [Палитра](/customization/palette/)
- [Typography](/customization/typography/)
- [Интервал](/customization/spacing/)
- [Контрольные точки](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Глобальная настройка](/customization/globals/)

Вы можете проверить [ раздел "тема по умолчанию" (default theme) ](/customization/default-theme/) для просмотра полной информации о default theme.

### Пользовательские переменные

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. Например:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Доступ к теме в компоненте

Вы [можете получить доступ](/styles/advanced/#accessing-the-theme-in-a-component) к переменным темы внутри ваших React-компонент.

## Вложенность тем

[ Вы можете вкладывать](/styles/advanced/#theme-nesting) несколько theme providers друг в друга.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

Внутренняя тема переопределит вашу **внешнюю тему**. Вы можете расширить внешнюю тему, предоставив функцию:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Примечание о производительности

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options, ...args) => theme`

Generate a theme base on the options received.

#### Аргументы

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Возвращает

`theme` (*Object*): A complete, ready to use theme object.

#### Примеры

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Аргументы

1. `theme` (*Object*): The theme object to enhance.
2. `варианты` (*объекта* [optional]):

- Array of [breakpoints](/customization/breakpoints/) (identifiers). `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (*Array\<String\>* [optional]): Default to all. The typography variants to handle.

#### Возвращает

`theme` (*Object*): The new theme with a responsive typography.

#### Примеры

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

##### `component` prop

The component used in the `component` prop of the following components need to forward their ref:

- [`Collapse`](/api/collapse/)

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

##### `children` prop

The `children` of the following components need to forward their ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Otherwise the component will not animate properly and you'll encounter the warning that `Function components cannot be given refs`.

#### Disable StrictMode compatibility partially

If you still see `Error: Function component cannot be given refs` then you're probably using a third-party component for which the previously mentioned fixes aren't applicable. You can fix this by applying `disableStrictModeCompat`. You'll see deprecation warnings again but these are only warnings while `Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### Аргументы

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Возвращает

`theme` (*Object*): A complete, ready to use theme object.

#### Примеры

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```