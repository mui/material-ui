# Basics

<p class="description">You can leverage our styling solution, even if you are not using our components.</p>

> ⚠️ `@material-ui/styles` is experimental (alpha version).
Hopefully, we will make it the default style implementation for the core components in Material-UI v4.
[Follow this path](/customization/css-in-js/) to read the documentation
of the default style implementation.

Material-UI aims to provide strong foundations for building dynamic UIs.
For the sake of simplicity, **we expose our styling solution to users**.
You can use it, but you don't have to. This styling solution is [interoperable with](/guides/interoperability/) all the other major solutions.

## Material-UI's styling solution

In previous versions, Material-UI has used LESS, then a custom inline-style solution to write the style of the
components, but these approaches have proven to be limited. Most recently, we have [moved toward](https://github.com/oliviertassinari/a-journey-toward-better-style)
a *CSS-in-JS* solution. It **unlocks many great features** (theme nesting, dynamic styles, self-support, etc.).
We think that it's the future:
- [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [Convert SCSS (Sass) to CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Material-UI's styling solution is inspired by many other CSS-in-JS libraries like [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/).
It uses [JSS](https://github.com/cssinjs/jss) at its core.
It's a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
It is about 8 kB (minified and gzipped) and is extensible via a [plugins](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
You can expect [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.

## Installation

To install and save in your `package.json` dependencies, run:

```sh
npm install @material-ui/styles
```

Please note that [react](https://www.npmjs.com/package/react) >= 16.7.0-alpha.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 16.7.0-alpha.0 are peer dependencies.

### Migration for `@material-ui/core` users

To switch from the default style implementation to this newest version, you need to execute the following code **before importing any** Material-UI's components:

```js
import { install } from '@material-ui/styles';

install();
```

We will make `@material-ui/styles` the default style implementation for the core components in Material-UI v4.
This installation step is temporary.

## Getting started

Because taste and colours are not always the same, we are proving 4 different APIs.
They all share the same underlying logic.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/Hook.js"}}

### Styled components API

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/StyledComponents.js"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
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

{{"demo": "pages/css-in-js/basics/HigherOrderComponent.js"}}

### Render props API

```jsx
import React from 'react';
import { createStyled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const Styled = createStyled({
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

export default function RenderProps() {
  return <Styled>{({ classes }) => <Button className={classes.root}>Render props</Button>}</Styled>;
}
```

{{"demo": "pages/css-in-js/basics/RenderProps.js"}}

## Adapting based on props

You can pass a function ("interpolations") to a style property to adapt it based on its props.
This button component has a color property that changes its color:

### Adapting hook API

{{"demo": "pages/css-in-js/basics/AdaptingHook.js"}}

### Adapting styled components API

{{"demo": "pages/css-in-js/basics/AdaptingStyledComponents.js"}}

### Adapting higher-order component API

{{"demo": "pages/css-in-js/basics/AdaptingHOC.js"}}

### Adapting render props API

{{"demo": "pages/css-in-js/basics/AdaptingRenderProps.js"}}
