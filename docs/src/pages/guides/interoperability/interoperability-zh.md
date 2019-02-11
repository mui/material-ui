# 样式库互操作性

<p class="description">虽然使用Material-UI提供的基于JSS的样式解决方案来设置应用程序样式很简单，但可以使用您喜欢的任何样式解决方案，从纯CSS到任意数量的CSS-in-JS库。</p>

本指南旨在记录最流行的替代方案， 但您应该发现此处应用的原理可以适用于其他库。

我们提供了以下样式解决方案的示例：

- [原始CSS](#raw-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#emotion)
- [全局CSS](#global-css)
- [React JSS](#react-jss)
- [CSS到MUI webpack Loader](#css-to-mui-webpack-loader)
- [Glamor](#glamor)

## 原始CSS

没什么特别的，只是简单的旧CSS。 为什么重新发明轮子已经工作了几十年？

**RawCssButton.css**

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

**RawCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

function RawCssButton() {
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

export default RawCssButton;
```

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmv2mz9785)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

### 控制优先权

样式组件和JSS都将样式注入 `<head>`的底部。 确保样式组件样式最后加载的一种方法是将CSS注入顺序</a>更改为 ，如演示中所示。</p> 

另一种方法是使用 `&&` 在风格的组件字符 [颠簸起来特异性](https://www.styled-components.com/docs/advanced#issues-with-specificity) 通过重复类名。 使用此选项可确保在JSS样式之前应用样式化组件样式。 此解决方案的一个示例：

{{"demo": "pages/guides/interoperability/StyledComponentsPriority.js"}}

### 更深层的元素

在某些情况下，上述方法不起作用。 例如，如果您尝试风格 [Drawer](/demos/drawers/) 与变异 `permanent`， ，你可能会需要影响抽屉的孩子 `paper` 元。

但是，这不是 `Drawer` 的根元素，因此上面的样式组件自定义将不起作用。 您可以通过使用 [稳定的JSS类名](/customization/css-in-js/#global-css)解决此问题，但最可靠的方法是使用 `classes` 属性来引入覆盖样式，然后通过 `&`以更高的特异性对其进行样式化。

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

### ThemeProvider

材料的UI具有丰富的主题，结构，您可以利用为 的颜色的处理，过渡，媒体查询等。

{{“demo”：“pages/guides/interoperability/StyledComponentsTheme.js”}}

## CSS Modules

![stars](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

这是很难知道的市场份额 [这个造型的解决方案](https://github.com/css-modules/css-modules) ，因为它是依赖于 人都在用捆绑的解决方案。

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

## Emotion

![stars](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### css Prop

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

### E. Styled Components

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

{{“demo”：“pages / guides / interoperability / EmotionStyled.js”，“hideHeader”：true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4q8o1y975w)

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

### E. 更深层的元素

在某些情况下，上述方法不起作用。 例如，如果您尝试风格 [Drawer](/demos/drawers/) 与变异 `permanent`， ，你可能会需要影响抽屉的孩子 `paper` 元。

但是，这不是 `Drawer` 的根元素，因此上面的样式组件自定义将不起作用。 您可以通过使用 [稳定的JSS类名](/customization/css-in-js/#global-css)解决此问题，但最可靠的方法是使用 `classes` 属性来引入覆盖样式，然后通过 `&`以更高的特异性对其进行样式化。

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

### E. ThemeProvider

材料的UI具有丰富的主题，结构，您可以利用为 的颜色的处理，过渡，媒体查询等。

{{"demo": "pages/guides/interoperability/EmotionTheme.js"}}

## 全局CSS

明确地为组件提供类名是否太费力了？ 请放心，我们提供了一个选项，使类名为 **确定性** 用于快速 原型设计： [`dangerouslyUseGlobalCSS`](/customization/css-in-js/#global-css)。

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

**注意：** JSS在 `<head>`的底部注入其样式。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。

## React JSS

![stars](https://img.shields.io/github/stars/cssinjs/jss.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Material-UI的样式解决方案与 [react-jss](https://github.com/cssinjs/react-jss)共享许多构建块。 我们继续分叉项目以处理我们的独特需求，但我们正在努力将Material-UI中的更改和修复合并到react-jss。

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

用于webpack的 [css-to-mui-loader](https://www.npmjs.com/package/css-to-mui-loader) 允许您编写可以转换为JS的CSS，以便与 [`withStyles()`](/customization/css-in-js/#withstyles-styles-options-higher-order-component) 高阶组件一起使用。 它提供了一些用于从CSS中访问主题的钩子。

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

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ov5l1j2j8z)

**注意：** Glamour和JSS都在 `<head>`的底部注入了他们的风格。 如果您不想使用 **!important**标记样式属性，则需要更改 [CSS注入顺序](/customization/css-in-js/#css-injection-order)，如演示中所示。