# 自定义的组件

<p class="description">您可以轻松地自定义一个 Material-UI 组件的外观。</p>

由于组件可以在不同的上下文环境中使用，因此有几种方法。 从最狭窄到最广泛的用例，这些是：

1. [一次性使用的特定变体](#1-specific-variation-for-a-one-time-situation)
2. [一次性使用的动态变体](#2-dynamic-variation-for-a-one-time-situation)
3. 在不同环境中重复使用的[特定组件的变体](#3-specific-variation-of-a-component) 
4. [Material Design 的变体](#4-material-design-variations)，例如按钮组件
5. [全局化主题变体](#5-global-theme-variation)

## 1. 一次性使用的特定变体

您可能需要为实现特定的组件而更改样式，以下有几种解决方案：

### 用类名（class names）覆盖样式

覆盖组件样式的第一种方法是使用**类名（class names）** 。 每个组件都提供一个` className `属性，它通常作用于 root 元素。

此示例使用一个高阶组件[` withStyles() `](/styles/basics/#higher-order-component-api)将自定义样式注入 DOM 之中，并通过它的` classes `属性将类名传递给 `ClassNames` 组件。 您可以选择[任何其他的样式解决方案](/guides/interoperability/)，或使用纯 CSS 来创建样式，但一定要 考虑[ CSS 的注入顺序](/styles/advanced/#css-injection-order) ，当通过 Material-UI 将 CSS 注入 DOM 中而来实现组件的样式时，这些 CSS 将具有最高的优先级，因为`<link>`被注入到` <head />` 的底部，这样的话始终正确地渲染组件。

{{"demo": "pages/customization/components/ClassNames.js"}}

### 用类覆盖样式

当 `className` 属性不足够时，你需要访问更深层的元素，这时则可使用`classes` 对象属性，这样就能够自定义该组件中所有由 Material-UI 注入的 CSS。

每一个组件的类列表已记录在组件 API 页面中， 请参阅 **CSS 部分**以及**规则名称栏**来获取更多信息。 例如，您可以查看 [Button CSS API](/api/button/#css)。 或者，您也可以使用[浏览器的 dev tools](#using-the-dev-tools)。

这个例子也使用了 `withStyles()` （见上文），但在这里， `ClassesNesting` 使用 `Button` 的 `classes` 属性来提供一个对象，该对象将 **要覆盖的 classes 子项名** （样式规则）映射到 **对应的CSS属性名称** （值）当中。 组件的现有类将继续被注入，因此只需要提供你想要添加或覆盖的特定样式。

请注意，除按钮样式外，按钮标签的大小写也已更改：

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### 使用全局的类名（ global class names）覆盖样式

[请参考这个章节](/styles/advanced/#with-material-ui-core)。

### 使用开发工具（dev tools）

使用浏览器中的 dev tools，您可以节省大量的时间。 在开发环境中：Material-UI 的 class 名称[遵循一个简单的模式](/styles/advanced/#class-names)：`Mui[组件名称]-[样式规则名称]-[UUID]` 。

让我们回到上面的演示。 你是如何能覆盖按钮标签的样式？

![dev-tools](/static/images/customization/dev-tools.png)

使用开发工具，您则知道您需要定位到`按钮`组件以及其`标签`样式规则：

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### 简而言之

上面的代码示例可以通过使用**相同的 CSS API** 作为子组件被固定。 在此示例中， `withStyles()` 高阶组件正在注入一个 `classes` 属性，而此属性在 [`Button` 组件](/api/button/#css)用到 。

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### CSS 伪类（Pseudo-classes）

组件会有一些特殊的状态，如 *hover* ，*focus* ，*disabled* 和 *selected* ，它们被一些更高的 CSS 优先级所装饰。 [优先级是一种加权](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)，它适用于给定的 CSS 声明。

为了覆盖组件的特殊状态，**你需要提高优先级** 。 下面是一个示例，它展示了 *disabled* 状态，以及一个使用**伪类**的按钮组件（`disabled`）：

```css
.Button {
  color: black;
}
.Button:disabled { /* 提高优先级 */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

有些时候，鉴于平台中不存在该状态，您不能使用**伪类**。 我们以菜单项（menu item）组件和 *selected* 状态为例。 除了访问嵌套元素之外，还有`classes` 属性可用于自定义 Material-UI 组件的特殊状态：

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* 提高优先级 */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### 为什么我需要增加优先级来覆盖一个组件的状态呢？

通过一些设计，CSS 的一些特殊要求让伪类提高了优先级。 为了保持一致性，通过一些其自定义的伪类，Material-UI 提高了优先级。 这有一个重要的优点，您可以自由挑选那些想要自定义状态。

#### 我可以使用那些需要更少样板的不同 API 吗？

您可以使用 Material-UI 生成的[全局类名](/styles/advanced/#with-material-ui-core)，而不是向 `classes` props API 传达值。 它实现了所有这些自定义伪类：

| classes 键    | 全局类名             |
|:------------ |:---------------- |
| checked      | Mui-checked      |
| disabled     | Mui-disabled     |
| error        | Mui-error        |
| focused      | Mui-focused      |
| focusVisible | Mui-focusVisible |
| required     | Mui-required     |
| expanded     | Mui-expanded     |
| selected     | Mui-selected     |


```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* 提高优先级 */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

### 在同一样式表中，可以使用 `$ruleName` 来引用当前的规则

[jss-nested](https://github.com/cssinjs/jss/tree/master/packages/jss-plugin-nested) 插件 (默认情况下可用) 简化了提高优先级的过程。

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

编译成：

```css
.root-x.disable-x {
  color: white;
}
```

⚠️您需要将两个生成的类名称（`root` & `disabled`）应用于 DOM，这样才能达到预期效果。

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  }}
>
```

{{"demo": "pages/customization/components/ClassesState.js"}}

### 覆盖内联样式表

第二种覆盖组件样式的方法是使用 **inline-style**。 每个组件都会提供一个 `style` 属性。 这些属性始终应用于根元素。

您不必担心 CSS 优先级，因为内联样式将优先于常规 CSS。

{{"demo": "pages/customization/components/InlineStyle.js"}}

[和 classes 比起来，我什么时候应该使用内嵌样式？](/getting-started/faq/#when-should-i-use-inline-style-vs-css)

## 2. 一次性使用的动态变体

您在上一节中，已经学习了如何覆盖 Material-UI 组件的样式。 现在，让我们看看我们如何使动态地应用这个覆盖。 以下是五种选择，各有利弊。

### 动态 CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### 类名称分支

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS 变量

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### 内联样式

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### 覆盖主题

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3。 在不同环境中使用组件的特定变体

您可能需要创建组件的变体，并且在不同的上下文中使用它，例如您想在产品页面上展示一个彩色按钮，但您希望尽可能保持代码 [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) 。

最好的方法是遵循选项1，然后利用 React 的组合功能，导出自定义的组件来，以便在任何需要的地方使用。

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4、 Material Design 变体

Material Design 规范记录了某些组件的不同变体，例如按钮的形状如何不同：[text](https://material.io/design/components/buttons.html#text-button) (以前称为“flat”)，[contained](https://material.io/design/components/buttons.html#contained-button) (以前称为“raised”)，[ FAB ](https://material.io/design/components/buttons-floating-action-button.html)等等。

Material-UI 会尝试实现所有这些变体。 请参阅[支持的组件](/getting-started/supported-components/)文档，找出您想要的所有支持的 Material Design 组件的当前状态。

## 5、 全局化主题变体

为了提高组件之间的一致性，并整体化管理用户界面外观，Material-UI 提供了一种能够应用全局变更的机制。

本节的示例介绍了如何更改按钮的字体大小。

### 主题变量

你可以调整[主题配置中的变量](/customization/theming/#theme-configuration-variables)。

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### 全局 CSS 覆盖

您也可以自定义带有 CSS 的所有组件的实例。 组件会公开[全局类名称](/styles/advanced/#with-material-ui-core)以启用此功能。 它与您自定义的 Bootstrap 的方式非常相似。

```jsx
const GlobalCss = withStyles({
  // @global 由 jss-plugin-global 处理。
  '@global': {
    // 如果想嵌套主题，您应该针对 [class * =“MuiButton-root”]。
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### 全局主题覆盖

利用`可被覆盖`的`主题`的键，您很有可能改变由 Material-UI 注入 DOM 的每个单独样式。 在[主题部分](/customization/globals/#css)可以了解有关它的更多信息。

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}