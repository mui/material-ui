# Style Library Interoperability

<p class="description">While it is simple to use the JSS based styling solution provided by Material-UI to style your application, it is possible to use any styling solution you prefer, from plain CSS to any number of CSS-in-JS libraries.</p>

This guide aims to document the most popular alternatives, but you should find that the principals applied here can be adapted to other libraries.

We have provided examples for the following styling solutions:

- [Plain CSS](#plain-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#emotion)
- [Global CSS](#global-css)
- [React JSS](#react-jss)
- [CSS to MUI webpack Loader](#css-to-mui-webpack-loader)
- [Glamor](#glamor)

## Plain CSS

Nothing fancy, just plain old CSS. Why reinvent the wheel when it has been working for decades?

**PlainCssButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

function PlainCssButton() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <Button className="button">
        Plain CSS
      </Button>
    </div>
  );
}

export default PlainCssButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmv2mz9785)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

## Styled Components

![Stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

The `styled()` method works perfectly on all of our components.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

function StyledComponents() {
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

export default StyledComponents;
```

{{"demo": "pages/guides/interoperability/StyledComponents.js", "hideHeader": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mzwqkk1p7j)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

### Controlling Priority

Both styled-components and JSS inject their styles at the bottom of the `<head>`. One approach to ensuring styled-components styles are loaded last is to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

Another approach is to use the `&&` characters in styled-components to [bump up specificity](https://www.styled-components.com/docs/advanced#issues-with-specificity) by repeating the class name. Use this to ensure styled-components styles are applied before JSS styles. An example of this solution:

{{"demo": "pages/guides/interoperability/StyledComponentsPriority.js"}}

### Deeper elements

In some cases, the approaches above will not work. For example, if you attempt to style a [Drawer](/demos/drawers/) with variant `permanent`, you will likely need to affect the Drawer's child `paper` element.

However, this is not the root element of `Drawer` and therefore styled-components customization as above will not work. You can workaround this by using [stable JSS class names](/css-in-js/advanced#deterministic-class-names), but the most reliable approach is to use the `classes` property to introduce an override style, and then style it with higher specificity via `&`.

The following example overrides the `label` style of `Button` in addition to the custom styles on the button itself. It also works around [this styled-components issue](https://github.com/styled-components/styled-components/issues/439) by "consuming" properties that should not be passed on to the underlying component.

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
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

function StyledComponentsDeep() {
  return (
    <div>
      <Button>Material-UI</Button>
      <StyledButton color="papayawhip">Styled Components</StyledButton>
    </div>
  );
}

export default StyledComponentsDeep;
```

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "hideHeader": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j4n13yl1r9)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

### ThemeProvider

Material-UI has a rich theme structure that you can leverage for the color manipulations, the transitions, the media queries, and more.

{{"demo": "pages/guides/interoperability/StyledComponentsTheme.js"}}

### Portals

The [Portal](/utils/portal/) provides a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. Because of the way styled-components scopes its CSS, you may run into issues where styling is not applied.

For example, if you attempt to style the [Menu](/demos/menus/) of a [Select](/demos/selects/) component using the property `MenuProps`, you will need to pass along the `className` property to the element being rendered outside of it's DOM hierarchy. The following example shows a workaround:

```jsx
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;
  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![Stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

It's hard to know the market share of [this styling solution](https://github.com/css-modules/css-modules) as it's dependent on the bundling solution people are using.

**CssModulesButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**CssModulesButton.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButton.css';
import Button from '@material-ui/core/Button';

function CssModulesButton() {
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

export default CssModulesButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m4j01r75wx)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

## Emotion

![Stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### The css Prop

Emotion's **css()** method works seamlessly with Material-UI.

```jsx
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "@material-ui/core/Button";

// Nós apenas atribuímos a eles o atributo className do Button
function EmotionCSS() {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button
        css={css`
          background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
          border-radius: 3px;
          border: 0;
          color: white;
          height: 48px;
          padding: 0 30px;
          box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
        `}
      >
        Emotion
      </Button>
    </div>
  );
}

export default EmotionCSS;
```

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "hideHeader": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yw93kl7y0j)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

### Styled Components

The `styled()` method works perfectly on all of our components.

```jsx
import React from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

function EmotionStyled() {
  return (
    <div>
      <Button>
        Material-UI
      </Button>
      <StyledButton>
        Emotion
      </StyledButton>
    </div>
  );
}

export default EmotionStyled;
```

{{"demo": "pages/guides/interoperability/EmotionStyled.js", "hideHeader": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4q8o1y975w)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

### Deeper elements

In some cases, the approaches above will not work. For example, if you attempt to style a [Drawer](/demos/drawers/) with variant `permanent`, you will likely need to affect the Drawer's child `paper` element.

However, this is not the root element of `Drawer` and therefore styled-components customization as above will not work. You can workaround this by using [stable JSS class names](/css-in-js/advanced#deterministic-class-names), but the most reliable approach is to use the `classes` property to introduce an override style, and then style it with higher specificity via `&`.

The following example overrides the `label` style of `Button` in addition to the custom styles on the button itself.

```jsx
import React from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
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

function EmotionDeep() {
  return (
    <div>
      <Button>Material-UI</Button>
      <StyledButton color="papayawhip">Styled Components</StyledButton>
    </div>
  );
}

export default EmotionDeep;
```

{{"demo": "pages/guides/interoperability/EmotionDeep.js", "hideHeader": true}}

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xj81yqx504)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

### ThemeProvider

Material-UI has a rich theme structure that you can leverage for the color manipulations, the transitions, the media queries, and more.

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

## Global CSS

Explicitly providing the class names to the component is too much effort? Rest assured, we provide an option to make the class names **deterministic** for quick prototyping: [`dangerouslyUseGlobalCSS`](/css-in-js/advanced#deterministic-class-names).

**GlobalCssButton.css**

```css
.MuiButton-root {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

function GlobalCssButton() {
  return (
    <div>
      <Button>
        Global CSS
      </Button>
    </div>
  );
}

export default GlobalCssButton;
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2zv5m0j37p)

**Note:** JSS injects its styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

## React JSS

![Stars](https://img.shields.io/github/stars/cssinjs/jss.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Material-UI's styling solution shares many building blocks with [react-jss](https://github.com/cssinjs/react-jss). We went ahead and forked the project in order to handle our unique needs, but we're working to merge the changes and fixes from Material-UI back to react-jss.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss/lib/injectSheet';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ReactJssButton(props) {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className={props.classes.button}>react-jss</Button>
    </div>
  );
}

ReactJssButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ReactJssButton);
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/219x6qqx0p)

## CSS to MUI webpack Loader

The [css-to-mui-loader](https://www.npmjs.com/package/css-to-mui-loader) for webpack allows you to write CSS that gets transpiled into JS for use with the `withStyles()` higher-order component. It provides a few hooks for accessing the theme from within the CSS.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'css-to-mui-loader' ]
      }
    ]
  }
}
```

**CssToMuiButton.css**

```css
.button {
  background: $(theme.palette.primary.main);
  padding: 2su; /* Material-UI spacing units */
}

.button:hover {
  background: $(theme.palette.primary.light);
}

@media $(theme.breakpoints.down('sm')) {
  .button {
    font-size: $(theme.typography.caption.fontSize);
  }
}
```

**CssToMuiButton.js**

```js
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './CssToMuiButton.css';

const CssToMuiButton = withStyles(styles)(({ classes }) => (
  <Button className={classes.button}>
    CSS to MUI Button
  </Button>
));
```

## Glamor

![Stars](https://img.shields.io/github/stars/threepointone/glamor.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/glamor.svg?)

A good way to apply styles with Glamor is using the **css()** function and then **classnames** to get them as strings:

```jsx
import React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';

const buttonStyles = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

// First we get the clsx with Glamor css function
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

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head>`. If you don't want to mark style attributes with **!important**, you need to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.