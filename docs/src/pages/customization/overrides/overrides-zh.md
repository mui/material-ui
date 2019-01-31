# 文本替换

<p class="description">由于组件可以在不同的上下文中使用, Material-UI 支持不同类型的自定义要求, 从最特定到最通用。</p>

1. [一次性情况的具体变化](#1-specific-variation-for-a-one-time-situation)
2. [一次性情况的动态变化](#2-dynamic-variation-for-a-one-time-situation)
3. [在不同环境中重复使用的组件](#3-specific-variation-of-a-component) 特定变体
4. [材料设计变体](#4-material-design-variations) 例如按钮组件
5. [全球主题变化](#5-global-theme-variation)

## 1。 一次性情况的具体变化

您可能需要在某些特定情况下更改组件的样式，您可以使用以下解决方案：

### 覆盖类名

覆盖组件样式的第一种方法是使用 **类名**。 每个组件都提供一个 `className` 属性，该属性始终应用于根元素。

在这个例子中，它使用 [`withStyles()`](/customization/css-in-js/#withstyles-styles-options-higher-order-component) 高阶 组件将自定义样式注入DOM，并通过其 `类` 属性将类名传递给 `ClassNames` 组件。 您可以选择[任何其他样式解决方案](/guides/interoperability/)或甚至简单的CSS创建的样式，但一定要 考虑[CSS注射顺序](/customization/css-in-js/#css-injection-order) ，由于`<link>`注入`<4>`的底部 ，因此通过Material-UI注入DOM 以对组件进行样式化的CSS具有最高的特异性。确保组件始终正确呈现。

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### 覆盖类

当 `className` 属性不够，并且您需要访问更深层元素时，您可以利用 `类` 属性来自定义Material-UI为给定组件注入的所有CSS。 每个 组件的类列表记录在 **Component API** 部分中。 例如，您可以查看 [Button CSS API](/api/button/#css)。 或者，您可以随时查看 [实现细节](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js)。

这个例子也使用 `withStyles（）` （见上文），但是这里， `ClassesNesting` 使用 `Button`的 `类` prop到 提供了一个对象，它映射了 **个类的名称以覆盖** （样式规则） **CSS类名称应用** （值）。 组件的现有类将继续注入，因此只需要提供要添加或覆盖的特定样式 。

请注意，除按钮样式外，按钮标签的大小写也已更改：

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

### 使用开发工具

浏览器开发工具可以为您节省大量时间。 Material-UI的类名 [遵循开发模式中的简单模式](/customization/css-in-js/#class-names) ： `Mui [组件名称] - [样式规则名称] -[UUID]`。

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
.button {
  color: black;
}
/* 我们增加了特异性 */
.button:disabled {
  color: white;
}
```

```jsx
<Button disabled className="button">
```

有时，您不能使用 **伪类** 因为平台中不存在状态。 我们以菜单项组件和 *selected* 状态为例。 除了访问嵌套元素之外， `classes` 属性还可用于自定义Material-UI组件的内部状态：

```css
.menu-item {
  color: black;
}
/* 我们增加了特异性 */
.menu-item.selected {
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'menu-item', selected: 'selected' }}>
```

##### 为什么我需要增加特异性以覆盖一个组件状态？

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

[我什么时候应该使用 inline-style vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes-)

## 2。 一次性情况的动态变化

您已经学习了如何覆盖前面部分中的Material-UI组件的样式。 现在，让我们看看我们如何使这些覆盖动态化。 我们展示了5种替代方案，每种方案都有其优缺点。

### 动态CSS

{{"demo": "pages/customization/overrides/DynamicCSS.js"}}

⚠️这个演示依赖于[`@material-ui/styles`](/css-in-js/basics/)包。 它不适用于稳定版本。

### Class name branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### CSS variables

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### 内联样式

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### 主题嵌套

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3。 组件的具体变化

您可能需要创建组件的变体并在不同的上下文中使用它，例如产品页面上的彩色按钮，但是您可能希望保留代码 [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。

最好的方法是遵循选项1，然后通过导出自定义组件来利用React的组合功能，以便在任何需要的地方使用。

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4。 材料设计变化

材料设计规范记录了某些组件的不同变化，例如按钮如何形成不同的形状： [文本](https://material.io/design/components/buttons.html#text-button) （以前称为“平面”）， [包含](https://material.io/design/components/buttons.html#contained-button) （以前称为“凸起”）， [FAB](https://material.io/design/components/buttons-floating-action-button.html) 及更多。

Material-UI尝试实现所有这些变体。 请参阅 [支持的组件](/getting-started/supported-components/) 文档，以了解所有支持的Material Design组件的当前状态。

## 5。 全球主题变化

### 主题变量

为了提高组件之间的一致性，并整体管理用户界面外观，Material-UI提供了一种通过调整 [主题配置变量来应用全局更改的机制](/customization/themes/#theme-configuration-variables)。

### 全局主题覆盖

是否要自定义 **组件类型的所有实例**？

当配置变量不够强大时， 可以利用 `overrides` 的 `theme` 键来潜在地将Material-UI注入的每个样式更改为DOM。 在文档的 [主题部分](/customization/themes/#customizing-all-instances-of-a-component-type) 中了解有关它的更多信息。

### 全局CSS覆盖

您还可以使用CSS自定义组件的所有实例。 我们公开了一个 `dangerouslyUseGlobalCSS` 选项来执行此操作。 在文档的[CSS in JS部分](/customization/css-in-js/#global-css)中了解有关它的更多信息。 它与您自定义Bootstrap的方式非常相似。