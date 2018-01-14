# Style Library Interoperability

While it is simple to use the JSS based styling solution provided by Material-UI to style your application,
it is possible to use any styling solution you prefer, from plain CSS to any number of CSS-in-JS libraries.

This guide aims to document the most popular alternatives, but you should find that the principals
applied here can be adapted to other libraries.

We have provided examples for the following styling solutions:

- [Raw CSS](#raw-css)
- [Global CSS](#global-css)
- [React JSS](#react-jss)
- [CSS Modules](#css-modules)
- [Styled Components](#styled-components)
- [Glamorous](#glamorous)
- [Glamor](#glamor)

## Raw CSS

Nothing fancy, just plain old CSS. Why reinventing the wheel when it has been working for decades?

**RawCSSButton.css**
```css
.button {
  background-color: grey;
  color: pink;
  width: 240px;
}
```

**RawCSSButton.js**
```jsx
import React from 'react';
import Button from 'material-ui/Button';

function RawCSSButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Material-UI
      </Button>
      <Button color="secondary" raised className="button">
        Raw CSS
      </Button>
    </div>
  );
}

export default RawCSSButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmv2mz9785)

**Note:** JSS injects its styles at the bottom of the `<head />`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## Global CSS

Explicitly providing the class names to the component is too much effort?
Rest assured, we provide an option to make the class names **deterministic** for quick
prototyping: [`dangerouslyUseGlobalCSS`](/customization/css-in-js#global-css).

**GlobalCSSButton.css**
```css
.MuiButton-root {
  background-color: grey;
  color: pink;
  width: 240px;
}
```

**GlobalCSSButton.js**
```jsx
import React from 'react';
import Button from 'material-ui/Button';

function GlobalCSSButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Global CSS
      </Button>
    </div>
  );
}

export default GlobalCSSButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2zv5m0j37p)

**Note:** JSS injects its styles at the bottom of the `<head />`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## React JSS

![stars](https://img.shields.io/github/stars/cssinjs/react-jss.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Material-UI's styling solution shares many building blocks with [react-jss](https://github.com/cssinjs/react-jss).
We went ahead and forked the project in order to handle our unique needs, but we're working to merge the changes and fixes from Material-UI back to react-jss.

In the following demo we demonstrate how to use `injectSheet()` and "the styles as a function of the properties" feature:

```js
const styles = theme => ({
 root: {
   color: props => (props.variant === 'primary'
     ? theme.palette.primary.main
     : 'inherit'),
   textDecoration: 'inherit',
 },
});
```

{{"demo": "pages/guides/ReactJss.js", "hideEditButton": true}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

It's hard to know the market share of this styling solution as it's dependent on the
bundling solution people are using.

**CSSModulesButton.css**
```css
.button {
  background-color: grey;
  color: pink;
  width: 240px;
}
```

**CSSModulesButton.js**
```jsx
import React from 'react';
// webpack or else will inject the CSS into the page
import styles from './CSSModulesButton.css';
import Button from 'material-ui/Button';

function CSSModulesButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Material-UI
      </Button>
      <Button color="secondary" raised className={styles.button}>
        CSS Modules
      </Button>
    </div>
  );
}

export default CSSModulesButton;
```

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/styled-components.svg?)

The `styled()` method works perfectly on all of our components.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const StyledButton = styled(Button)`
  background-color: grey;
  color: pink;
  width: 240px;
`;

function StyledComponentsButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Material-UI
      </Button>
      <StyledButton color="secondary" raised>
        Styled Components
      </StyledButton>
    </div>
  );
}

export default StyledComponentsButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mzwqkk1p7j)

**Note:** Both styled-components and JSS inject their styles at the bottom of the `<head />`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## Glamorous

![stars](https://img.shields.io/github/stars/paypal/glamorous.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/glamorous.svg?)

A clean way to apply styles to Material-UI components with glamorous It's just passing our component as a glamorous param. We're going to take the [raised button example](/demos/buttons/#raised-buttons) from Material-UI documentation and use glamorous to style it:

```jsx
import React from 'react';
import glamorous from 'glamorous';
import Button from 'material-ui/Button';

const StyledButton = glamorous(Button)({
  backgroundColor: 'grey',
  color: 'pink',
  width: 240
});

function GlamorousButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Material-UI
      </Button>
      <StyledButton color="secondary" raised>
        Glamorous
      </StyledButton>
    </div>
  );
}

export default GlamorousButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n3jmn72wrm)

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head />`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## Glamor

![stars](https://img.shields.io/github/stars/threepointone/glamor.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/glamor.svg?)

A good way to apply styles with Glamor is using the **css()** function and then **classnames** to get them as strings:

```jsx
import React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';
import classnames from 'classnames';
import Button from 'material-ui/Button';

const buttonStyles = {
  backgroundColor: 'grey',
  color: 'pink',
  width: 240,
};

// First we get the classNames with Glamor css function
const buttonClasses = css(buttonStyles);

// We need the class names to be strings
const className = buttonClasses.toString();

// Then we just assign them the Button's className attribute
function GlamorButton() {
  return (
    <div>
      <Button color="secondary" raised>
        Material-UI
      </Button>
      <Button color="secondary" className={className} raised>
        Glamor
      </Button>
    </div>
  );
}

export default GlamorButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ov5l1j2j8z)

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head />`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.
