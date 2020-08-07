# @material-ui/styles

<p class="description">Вы можете использовать в своем приложении стилевое решение Material-UI независимо от того, используете ли вы компоненты Material-UI или нет.</p>

Material-UI стремится обеспечить прочную основу для создания динамических интерфейсов. Для простоты, ** мы предоставляем решение для стилизации, используемое в компонентах Material-UI ** в виде пакета `@ material-ui /styles`. Вы можете пользоваться им, но вы не обязаны задействовать именно его, поскольку Material-UI также [ совместим](/guides/interoperability/) со всеми другими основными решениями для стилизации.

## Зачем использовать решение для стилей Material-UI?

Чтобы устранить необходимость постоянного подключения темы, к реэкспортированным модулям применяется дефолтная тема Material-UI. Это относится к модулям: `makeStyles`, `styled`, `withTheme`, `useTheme` и `withStyles`

Подход к стилизации Material-UI вдохновлен многими другими библиотеками стилей, такими как [ styled-components ](https://www.styled-components.com/) и [ emotion](https://emotion.sh/).

- 💅 Вы можете ожидать [всех преимуществ](https://www.styled-components.com/docs/basics#motivation), которые имеются в styled-components.
- 🚀 [невероятно быстро](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles) ,
- 🧩 возможность расширения с помощью [плагина](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ решение использует [ JSS ](https://github.com/cssinjs/jss) в своей основе - [ высокая производительность ](https://github.com/cssinjs/jss/blob/master/docs/performance.md) компилятора JavaScript в CSS, который работает и во время выполнения и на стороне сервера.
- 📦 Менее [ 15 КБ в архиве ](https://bundlephobia.com/result?p=@material-ui/styles) ; и не увеличивает размер пакета, если используется вместе с Material-UI.

## Инструкция по установке

> `@material-ui/styles` is re-exported as `@material-ui/core/styles` - you only need to install it if you wish to use it independently from Material-UI.

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

Примечание: это относится только к синтаксису вызова. Для определения стилей по-прежнему используется объект JSS. Вы можете [ изменить это поведение ](/styles/advanced/#string-templates) (с некоторыми ограничениями).

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

## Вложенные селекторы

Вы можете вкладывать селекторы в целевые элементы внутри текущего класса или компонента. В следующем примере используется Hook API, но вы можете аналогично работать и с другими API.

```js
const useStyles = makeStyles({
  root: {
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

{{"demo": "pages/styles/basics/NestedStylesHook.js", "defaultCodeOpen": false}}

## Адаптация на основе props

You can pass a function to `makeStyles` ("interpolation") in order to adapt the generated value based on the component's props. Функция может быть предоставлена на уровне правила стиля или на уровне свойства CSS:

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

Этот компонент кнопки имеет свойство цвет, которое изменяет его цвет:

### Адаптация хука API

{{"demo": "pages/styles/basics/AdaptingHook.js", "react":"next"}}

### Адаптация styled components API

{{"demo": "pages/styles/basics/AdaptingStyledComponents.js"}}

### Адаптация API компонента высшего порядка (HOC)

{{"demo": "pages/styles/basics/AdaptingHOC.js"}}

### Стресс-тест

В следующем стресс-тесте вы можете обновить *цвет темы* и свойство * background-color *:

```js
const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "pages/styles/basics/StressTest.js"}}

## Отличие @material-ui/core/styles от @material-ui/styles

Material-UI's styles are powered by the [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles) package, (built with JSS). This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles). Он не имеет темы по умолчанию и может использоваться для стилизации приложений React, которые не используют компоненты Material-UI.

Чтобы уменьшить количество пакетов, устанавливаемых при использовании Material-UI, и упростить импорт, модули `@material-ui/styles` реэкспортируются из `@material-ui/core/styles` ,

Чтобы устранить необходимость постоянного подключения темы, к реэкспортированным модулям применяется дефолтная тема Material-UI. Это относится к модулям: `makeStyles`, `styled`, `withTheme`, `useTheme` и `withStyles` 

Например:

```js
// Re-export with a default theme
import { makeStyles } from '@material-ui/core/styles';

// Original module with no default theme
import { makeStyles } from '@material-ui/styles';
```