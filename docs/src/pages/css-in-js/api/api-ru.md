# API

<p class="description">The API reference of the @material-ui/styles package.</p>

## `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](http://cssinjs.org/jss-api/#generate-your-class-names).

#### Arguments

1. `options` (*Object* [optional]): 
    - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): Defaults to `false`. Makes the Material-UI class names deterministic.
    - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. The string used to prefix the class names in production.
    - `options.seed` (*String* [optional]): Defaults to `''`. The string used to uniquely identify the generator. It can be used to avoid class name collisions when using multiple generators.

#### Returns

`class name generator`: The generator should be provided to JSS.

#### Examples

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `withStyles` which are a function of the `Theme`.

#### Arguments

1. `styles` (*Function | Object*): A function generating the styles or a styles object.

#### Returns

`styles`: A function generating the styles or a styles object.

#### Examples

```jsx
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    backgroundColor: 'red',
  },
});

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

## `makeStyles(styles, [options]) => hook`

Link a style sheet with a function component using the **hook** pattern.

#### Arguments

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Returns

`hook`: A hook. This hook can be used in a function component. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

#### Examples

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

export default function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root} />;
}
```

## `styled(styles, [options])(Component) => Component`

Link a style sheet with a function component using the **styled components** pattern.

#### Arguments

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).
3. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created.

#### Examples

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

export default function StyledComponents() {
  return <MyComponent />;
}
```

## `StylesProvider`

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to React context.

It should preferably be used at **the root of your component tree**.

#### Examples

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

function App() {
  return (
    <StylesProvider jss={jss}>...</StylesProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

This component takes a `theme` property, and makes the `theme` available down the React tree thanks to React context. It should preferably be used at **the root of your component tree**.

#### Examples

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

This hook returns the `theme` object so it can be used inside a function component.

#### Returns

`theme`: The theme object.

#### Examples

```jsx
import React from 'react';
import { useTheme } from '@material-ui/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. It does not modify the component passed to it; instead, it returns a new component with a `classes` property. This `classes` object contains the name of the class names injected in the DOM.

Some implementation details that might be interesting to being aware of:

- It adds a `classes` property so you can override the injected class names from the outside.
- It adds an `innerRef` property so you can get a reference to the wrapped component. The usage of `innerRef` is identical to `ref`.
- It forwards *non React static* properties so this HOC is more "transparent". For instance, it can be used to defined a `getInitialProps()` static method (next.js).

#### Arguments

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Examples

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

Also, you can use as [decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) like so:

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent
```

## `withTheme()(Component) => Component`

Provide the `theme` object as a property of the input component so it can be used in the render method.

#### Arguments

1. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created.

#### Examples

```jsx
import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme()(MyComponent);
```