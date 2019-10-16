# @material-ui/styles

<p class="description">Вы можете использовать в своем приложении стилевое решение Material-UI независимо от того, используете ли вы компоненты Material-UI или нет.</p>

Material-UI стремится обеспечить прочную основу для создания динамических интерфейсов. Для простоты, ** мы предоставляем решение для стилизации, используемое в компонентах Material-UI ** в виде пакета ` @ material-ui /styles `. Вы можете пользоваться им, но вы не обязаны задействовать именно его, поскольку Material-UI также [ совместим](/guides/interoperability/) со всеми другими основными решениями для стилизации.

## Зачем использовать решение для стилей Material-UI?

В предыдущих версиях Material-UI использовал LESS, а затем пользовательские inline-стили для написания стилей компонент, но эти подходы оказались ограниченными. [ Подход * CSS-in-JS * ](https://github.com/oliviertassinari/a-journey-toward-better-style) преодолевает многие из этих ограничений, и ** открывают множество замечательных возможностей** (вложенность тем, динамические стили, самостоятельная поддержка и т. д.).

Подход к стилизации Material-UI вдохновлен многими другими библиотеками стилей, такими как [ styled-components ](https://www.styled-components.com/) и [ emotion](https://emotion.sh/).

- 💅 You can expect [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.
- 🚀 It's [blazing fast](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles).
- 🧩 It's extensible via a [plugin](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ It uses [JSS](https://github.com/cssinjs/jss) at its core – a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles); and no bundle size increase if used alongside Material-UI.

## Инструкция по установке

Для установки и сохранения в вашем ` package.json ` зависимости, запустите:

```sh
// with npm
npm install @material-ui/styles

// with yarn
yarn add @material-ui/styles
```

## Начало работы

Мы предоставляем 3 разных API для генерации и применения стилей, но все они имеют одинаковую базовую логику.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/styles/basics/Hook.js"}}

### Styled components API

Note: this only applies to the calling syntax – style definitions still use a JSS object. You can also [change this behavior](/styles/advanced/#string-templates), with some limitations.

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/styles/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/styles/basics/HigherOrderComponent.js"}}

## Nesting selectors

You can nest selectors to target elements inside the current class or component. The following example uses the Hook API, but it works the same way with the other APIs.

```js
const useStyles = makeStyles({
  root: {
    padding: 16,
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue'
      }
    }
  },
});
```

{{"demo": "pages/styles/basics/NestedStylesHook.js"}}

## Adapting based on props

You can pass a function to `makeStyles` ("interpolation") in order to adapt the generated value based on the component's props. The function can be provided at the style rule level, or at the CSS property level:

```jsx
const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: props => props.color,
  },
});

function MyComponent() {
  // Simulated props for the purpose of the example
  const props = { backgroundColor: 'black', color: 'white' };
  // Pass the props as the first argument of useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />
}
```

Этот компонент кнопка имеет свойство цвет, которое меняет свой цвет:

### Адаптация хука API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Adapting the styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Адаптация API компонента высшего порядка

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Stress test

In the following stress test, you can update the *theme color* and the *background-color property* live:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## @material-ui/core/styles vs @material-ui/styles

Material-UI's styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) package, (built with JSS). This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles). It doesn't have a default theme, and can be used to style React applications that are not using Material-UI components.

To reduce the number of packages to install when using Material-UI, and to simplify the imports, `@material-ui/styles` modules are re-exported from `@material-ui/core/styles`.

To remove the need to systematically supply a theme, the default Material-UI theme is applied to the re-exported `makeStyles`, `styled`, `withTheme`, `useTheme`, and `withStyles` modules.

For instance:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```