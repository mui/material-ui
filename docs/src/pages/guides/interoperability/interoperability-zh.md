# 样式库互操作性

<p class="description">虽然使用Material-UI提供的基于JSS的样式解决方案来设置应用程序样式很简单，但可以使用您喜欢的任何样式解决方案，从纯CSS到任意数量的CSS-in-JS库。</p>

本指南旨在记录最流行的替代方案， 但您应该发现此处应用的原理可以适用于其他库。

我们提供了以下样式解决方案的示例：

- [纯 CSS](#plain-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#emotion)
- [全局CSS](#global-css)
- [React JSS](#react-jss)
- [CSS到MUI webpack Loader](#css-to-mui-webpack-loader)
- [Glamor](#glamor)

## 纯 CSS

没什么特别的，只是简单的旧CSS。 为什么重新发明轮子已经工作了几十年？

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmv2mz9785)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

## Styled Components

![stars](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

`styled()` 方法适用于我们所有的组件。

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mzwqkk1p7j)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

### 控制优先权

样式组件和JSS都将样式注入 `<head>`的底部。 One approach to ensuring styled-components styles are loaded last is to change [the CSS injection order](/css-in-js/advanced/#css-injection-order), as in the demo.

另一种方法是使用 `&&` 在风格的组件字符 [颠簸起来特异性](https://www.styled-components.com/docs/advanced#issues-with-specificity) 通过重复类名。 使用此选项可确保在JSS样式之前应用样式化组件样式。 此解决方案的一个示例：

{{"demo": "pages/guides/interoperability/StyledComponentsPriority.js"}}

### 更深层的元素

在某些情况下，上述方法不起作用。 例如，如果您尝试风格 [Drawer](/demos/drawers/) 与变异 `permanent`， ，你可能会需要影响抽屉的孩子 `paper` 元。

但是，这不是 `Drawer` 的根元素，因此上面的样式组件自定义将不起作用。 您可以通过使用 [稳定的JSS类名](/css-in-js/advanced#deterministic-class-names)解决此问题，但最可靠的方法是使用 `classes` 属性来引入覆盖样式，然后通过 `&`以更高的特异性对其进行样式化。

以下示例除了按钮本身的自定义样式外，还会覆盖 `label` 的 `Button` 样式。 它还解决了 [这个styled-components问题](https://github.com/styled-components/styled-components/issues/439) 由不应该在底层组件来通过“消耗”的特性。

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j4n13yl1r9)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

### ThemeProvider

材料的UI具有丰富的主题，结构，您可以利用为 的颜色的处理，过渡，媒体查询等。

{{“demo”：“pages/guides/interoperability/StyledComponentsTheme.js”}}

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

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m4j01r75wx)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### The css Prop

Emotion的 **css()** 方法与Material-UI无缝协作。

```jsx
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "@material-ui/core/Button";

// 我们只是为它们分配Button的className属性
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

{{“demo”：“pages/guides/interoperability/EmotionCSS.js”，“hideHeader”：true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yw93kl7y0j)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

### Styled Components

`styled()` 方法适用于我们所有的组件。

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4q8o1y975w)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

### 更深层的元素

在某些情况下，上述方法不起作用。 例如，如果您尝试风格 [Drawer](/demos/drawers/) 与变异 `permanent`， ，你可能会需要影响抽屉的孩子 `paper` 元。

但是，这不是 `Drawer` 的根元素，因此上面的样式组件自定义将不起作用。 您可以通过使用 [稳定的JSS类名](/css-in-js/advanced#deterministic-class-names)解决此问题，但最可靠的方法是使用 `classes` 属性来引入覆盖样式，然后通过 `&`以更高的特异性对其进行样式化。

以下示例除了按钮本身的自定义样式外，还会覆盖 `label` 的 `Button` 样式。

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xj81yqx504)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

### ThemeProvider

材料的UI具有丰富的主题，结构，您可以利用为 的颜色的处理，过渡，媒体查询等。

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

## 全局CSS

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2zv5m0j37p)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。

## React JSS

![stars](https://img.shields.io/github/stars/cssinjs/jss.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/react-jss.svg?)

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/219x6qqx0p)

## CSS到MUI webpack Loader

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

![stars](https://img.shields.io/github/stars/threepointone/glamor.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/glamor.svg?)

使用Glamour应用样式的好方法是使用 **css()** 函数，然后使用 **classnames** 将它们作为字符串：

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

// 首先我们应该通过 Glamor css function 获得 clsx
const buttonClasses = css(buttonStyles);

// 我们需要类名是字符串
const className = buttonClasses.toString();

// 然后我们只为它们分配Button的className属性
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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ov5l1j2j8z)

**Note:** Both Glamor and JSS inject their styles at the bottom of the `<head>`. 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/css-in-js/advanced/#css-injection-order)，如演示中所示。