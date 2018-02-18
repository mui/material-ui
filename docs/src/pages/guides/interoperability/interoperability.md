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

Nothing fancy, just plain old CSS. Why reinvent the wheel when it has been working for decades?

**RawCSSButton.css**
```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
}
```

**RawCSSButton.js**
```jsx
import React from 'react';
import Button from 'material-ui/Button';

function RawCSSButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <Button className="button">
        Raw CSS
      </Button>
    </div>
  );
}

export default RawCSSButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmv2mz9785)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## Global CSS

Explicitly providing the class names to the component is too much effort?
Rest assured, we provide an option to make the class names **deterministic** for quick
prototyping: [`dangerouslyUseGlobalCSS`](/customization/css-in-js#global-css).

**GlobalCSSButton.css**
```css
.MuiButton-root {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
}
```

**GlobalCSSButton.js**
```jsx
import React from 'react';
import Button from 'material-ui/Button';

function GlobalCSSButton() {
  return (
    <div>
      <Button>
        Global CSS
      </Button>
    </div>
  );
}

export default GlobalCSSButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2zv5m0j37p)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

## React JSS

![stars](https://img.shields.io/github/stars/cssinjs/react-jss.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Material-UI's styling solution shares many building blocks with [react-jss](https://github.com/cssinjs/react-jss).
We went ahead and forked the project in order to handle our unique needs, but we're working to merge the changes and fixes from Material-UI back to react-jss.

{{"demo": "pages/guides/interoperability/ReactJss.js"}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

It's hard to know the market share of this styling solution as it's dependent on the
bundling solution people are using.

**CSSModulesButton.css**
```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
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
      <Button>
        Material-UI
      </Button>
      <Button className={styles.button}>
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
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
`;

function StyledComponentsButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <StyledButton>
        Styled Components
      </StyledButton>
    </div>
  );
}

export default StyledComponentsButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mzwqkk1p7j)

### Controlling Priority

Both styled-components and JSS inject their styles at the bottom of the `<head>`.
One approach to ensuring styled-components styles are loaded last is to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

Another approach is to use the `&` character in styled-components to [bump up specificity](https://www.styled-components.com/docs/advanced#issues-with-specificity) by repeating the class name.
Use this to ensure styled-components styles are applied before JSS styles.
An example of this solution:

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const StyledButton = styled(Button)`
  && {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
  }
`;

function StyledComponentsButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <StyledButton>
        Styled Components
      </StyledButton>
    </div>
  );
}

export default StyledComponentsButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xpp5oj9o0z)

In some cases, the approaches above will not work.
For example, if you attempt to style a [Drawer](/demos/drawers) with variant `permanent`,
you will likely need to affect the Drawer's underlying `paper` style.

However, this is not the root element of `Drawer` and therefore styled-components customization as above will not work.
You can workaround this by using [stable JSS class names](/customization/css-in-js/#global-css), but the most reliable approach is to use the `classes` property to introduce an override style, and then style it with higher specificity via `&`.

The following example overrides the `label` style of `Button` in addition to the custom styles on the button itself. It also works around [this styled-components issue](https://github.com/styled-components/styled-components/issues/439) by "consuming" properties that should not be passed on to the underlying component.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button {...other} classes={{ label: 'label' }} />
))`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

  & .label {
    color: ${props => props.color};
  }
`;

function StyledComponentsButton() {
  return (
    <div>
      <Button>Material-UI</Button>
      <StyledButton color="papayawhip">Styled Components</StyledButton>
    </div>
  );
}

export default StyledComponentsButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j4n13yl1r9)

## Glamorous

![stars](https://img.shields.io/github/stars/paypal/glamorous.svg?style=social&label=Star)
![npm](https://img.shields.io/npm/dm/glamorous.svg?)

A clean way to apply styles to Material-UI components with glamorous It's just passing our component as a glamorous param. We're going to take the [raised button example](/demos/buttons/#raised-buttons) from Material-UI documentation and use glamorous to style it:

```jsx
import React from 'react';
import glamorous from 'glamorous';
import Button from 'material-ui/Button';

const StyledButton = glamorous(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
});

function GlamorousButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <StyledButton>
        Glamorous
      </StyledButton>
    </div>
  );
}

export default GlamorousButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n3jmn72wrm)

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.

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
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

// First we get the classNames with Glamor css function
const buttonClasses = css(buttonStyles);

// We need the class names to be strings
const className = buttonClasses.toString();

// Then we just assign them the Button's className attribute
function GlamorButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <Button className={className}>
        Glamor
      </Button>
    </div>
  );
}

export default GlamorButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ov5l1j2j8z)

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/customization/css-in-js#css-injection-order), as in the demo.
