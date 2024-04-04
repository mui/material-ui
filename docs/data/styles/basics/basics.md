# @mui/styles (LEGACY)

<p class="description">The legacy styling solution for Material UI, now deprecated and not recommended for use.</p>

:::error
`@mui/styles` was deprecated with the release of MUI Core v5 in late 2021.
It depended on [JSS](https://cssinjs.org/) as a styling solution, which is no longer used in `@mui/material`.

`@mui/styles` is not compatible with [React.StrictMode](https://react.dev/reference/react/StrictMode) or React 18, and it will not be updated.

This documentation remains here for those working on legacy projects, but we **strongly discourage** you from using `@mui/styles` when creating a new app with Material UI—you _will_ face unresolvable dependency issues.

Please use [`@mui/system`](/system/getting-started/) instead.
:::

## Installation

To install and save in your `package.json` dependencies, run:

:::info
The `next` tag is used to download the latest <b>pre-release</b>, v6 version. Remove it to get the current stable version.
:::

<!-- #default-branch-switch -->

```bash
npm install @mui/styles@next
```

## Getting started

There are 3 possible APIs you can use to generate and apply styles, however they all share the same underlying logic.

### Hook API

```jsx
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "Hook.js"}}

### Styled components API

Note: this only applies to the calling syntax – style definitions still use a JSS object.
You can also [change this behavior](/system/styles/advanced/#string-templates), with some limitations.

```jsx
import * as React from 'react';
import { styled } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "StyledComponents.js"}}

### Higher-order component API

```jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';

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

{{"demo": "HigherOrderComponent.js"}}

## Nesting selectors

You can nest selectors to target elements inside the current class or component.
The following example uses the Hook API, but it works the same way with the other APIs.

```js
const useStyles = makeStyles({
  root: {
    color: 'red',
    '& p': {
      color: 'green',
      '& span': {
        color: 'blue',
      },
    },
  },
});
```

{{"demo": "NestedStylesHook.js", "defaultCodeOpen": false}}

## Adapting based on props

You can pass a function to `makeStyles` ("interpolation")
in order to adapt the generated value based on the component's props.
The function can be provided at the style rule level, or at the CSS property level:

```jsx
const useStyles = makeStyles({
  // style rule
  foo: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: (props) => props.color,
  },
});

function MyComponent() {
  // Simulated props for the purpose of the example
  const props = {
    backgroundColor: 'black',
    color: 'white',
  };
  // Pass the props as the first argument of useStyles()
  const classes = useStyles(props);

  return <div className={`${classes.foo} ${classes.bar}`} />;
}
```

This button component has a `color` prop that changes its color:

### Adapting the hook API

{{"demo": "AdaptingHook.js"}}

### Adapting the styled components API

{{"demo": "AdaptingStyledComponents.js"}}

### Adapting the higher-order component API

{{"demo": "AdaptingHOC.js"}}

### Stress test

In the following stress test, you can update the _theme color_ and the _background-color property_ live:

```js
const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
    color: theme.color,
  }),
}));
```

{{"demo": "StressTest.js"}}

## Using the theme context

Starting from v5, Material UI no longer uses JSS as its default styling solution. If you still want to use the utilities exported by `@mui/styles` and they depend on the `theme`, you will need to provide the `theme` as part of the context. For this, you can use the `ThemeProvider` component available in `@mui/styles`, or, if you are already using `@mui/material`, you should use the one exported from `@mui/material/styles` so that the same `theme` is available for components from '@mui/material'.

```jsx
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

const App = (props) => {
  const classes = useStyles();
  return <ThemeProvider theme={theme}><div {...props} className={classes.root}></ThemeProvider>;
}
```
