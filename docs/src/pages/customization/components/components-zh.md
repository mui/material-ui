# 文本替换

<p class="description">由于组件可以在不同的上下文中使用, Material-UI 支持不同类型的自定义要求, 从最特定到最通用。</p>

1. [一次性情况的具体变化](#1-specific-variation-for-a-one-time-situation)
2. [一次性情况的动态变化](#2-dynamic-variation-for-a-one-time-situation)
3. [在不同环境中重复使用的组件](#3-specific-variation-of-a-component) 特定变体
4. [材料设计变体](#4-material-design-variations) 例如按钮组件
5. [全球主题变化](#5-global-theme-variation)

## 1。 一次性情况的具体变化

您可能需要为特定实现更改组件的样式，您可以使用以下解决方案：

### 覆盖类名

覆盖组件样式的第一种方法是使用 **类名**。 每个组件都提供一个 `className` 属性，该属性始终应用于根元素。

This example uses the [`withStyles()`](/css-in-js/basics/#higher-order-component-api) higher-order component to inject custom styles into the DOM, and to pass the class name to the `ClassNames` component via its `classes` property. 您可以选择[任何其他样式解决方案](/guides/interoperability/)或甚至简单的CSS创建的样式，但一定要 考虑[ CSS注入顺序](/css-in-js/advanced/#css-injection-order) ，因为通过Material-UI注入DOM 以对组件进行样式化的CSS具有最高的优先级，因为`<link>`被注入到` <head />` 的底部以确保组件始终正确渲染。

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### 覆盖类

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` object property to customize all the CSS injected by Material-UI for a given component. 每个 组件的类列表记录在 **Component API** 部分中。 例如，您可以查看 [Button CSS API](/api/button/#css)。 Alternatively, you can use the [browser dev tools](#using-the-dev-tools).

这个例子也使用了 `withStyles()` （见上文），但在这里， `ClassesNesting` 使用 `Button` 的 `classes` 属性来接收一个对象，该对象将 **要覆盖的classes子项名** （样式规则）映射到 **对应的CSS属性名称** （值）。 组件的现有类将继续注入，因此只需要提供要添加或覆盖的特定样式 。

请注意，除按钮样式外，按钮标签的大小写也已更改：

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

### 使用开发工具

浏览器开发工具可以为您节省大量时间。 Material-UI's class names [follow a simple pattern](/css-in-js/advanced/#class-names) in development mode: `Mui[component name]-[style rule name]-[UUID]`.

让我们回到上面的演示。 你怎么能覆盖按钮标签？

![dev-tools](/static/images/customization/dev-tools.png)

使用开发工具，您知道需要定位 `按钮` 组件和 `标签` 样式规则：

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### 速记

上面的代码示例可以通过使用缩合 **相同的CSS API** 作为子组件。 在此示例中， `withStyles()` 高阶分量正在注入由 [`Button` 组件](/api/button/#css)使用的 `classes` 属性。

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

{{"demo": "pages/customization/overrides/ClassesShorthand.js"}}

### 内部状态

组件内部状态，如 *hover* (悬停)， *focus* (焦点)， *disabled* (禁用) 和 *selected* (中选择)中，风格具有较高CSS特异性。 [特异性是一种重量](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)这适用于给定的CSS声明。

为了覆盖组件内部状态， **需要增加特异性**。 下面是一个示例，其中 *disabled* 状态，按钮组件使用 **伪类** （`disabled`）：

```css
.MuiButton {
  color: black;
}
/* We increase the specificity */
.MuiButton:disabled {
  color: white;
}
```

```jsx
<Button disabled className="MuiButton">
```

有时，您不能使用 **伪类** 因为平台中不存在状态。 我们以菜单项组件和 *selected* 状态为例。 除了访问嵌套元素之外， `classes` 属性还可用于自定义Material-UI组件的内部状态：

```css
.MuiMenuItem {
  color: black;
}
/* We increase the specificity */
.MuiMenuItem.selected {
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MuiMenuItem', selected: 'selected' }}>
```

#### Why do I need to increase specificity to override one component state?

通过设计，CSS规范使伪类增加了特异性。 为了保持一致性，Material-UI增加了其自定义状态的特异性。 这有一个重要的优点，它允许您挑选您想要自定义的状态。

### 使用 `$ruleName` 引用同一样式表中的本地规则

[jss-nested](https://github.com/cssinjs/jss-nested) 插件（默认情况下可用）可以使增加特异性的过程更容易。

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

编译为：

```css
.root-x.disable-x {
  color: white;
}
```

⚠️您需要将两个生成的类名称（`root` & `disabled`）应用于DOM以使其工作。

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  } }
>
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### 覆盖内联样式

覆盖组件样式的第二种方法是使用 **inline-style** 方法。 每个组件都提供 `style` 属性。 这些属性始终应用于根元素。

您不必担心CSS特性，因为内联样式优先于常规CSS。

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[我什么时候应该使用 inline-style vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2。 一次性情况的动态变化

您已经学习了如何覆盖前面部分中的Material-UI组件的样式。 现在，让我们看看我们如何使这些覆盖动态化。 我们展示了5种替代方案，每种方案都有其优缺点。

### 动态CSS

{{"demo": "pages/customization/overrides/DynamicCSS.js"}}

### Class name branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### CSS variables

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### 内联样式

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### 主题嵌套

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3。 组件的具体变化

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page, however you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4。 材料设计变化

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [text](https://material.io/design/components/buttons.html#text-button) (formerly "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (formerly "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components/) documentation to find out the current status of all supported Material Design components.

## 5。 全球主题变化

### 主题变量

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes by adjusting the [theme configuration variables](/customization/themes/#theme-configuration-variables).

### Global CSS override

You can also customize all instances of a component with CSS. We expose [global class names](/css-in-js/advanced/#with-material-ui-core) to do so. It's very similar to how you would customize Bootstrap.

### Global theme override

You can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM. Learn more about it in the [themes section](/customization/themes/#customizing-all-instances-of-a-component-type) of the documentation.