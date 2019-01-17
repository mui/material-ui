---
title: React 按钮组件
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# 按钮

<p class="description">按钮允许用户只需轻按一下即可采取行动并做出选择。</p>

[按钮](https://material.io/design/components/buttons.html) 传达了用户可以采取的行动，它们一般被放置在你的界面中的以下位置：

- 对话框
- 模态窗口
- 表单
- 卡片
- 工具栏

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.

The last example of this demo show how to use an upload button.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Text Buttons

[Text buttons](https://material.io/design/components/buttons.html#text-button) are typically used for less-pronounced actions, including those located:

- 在对话框中
- 在卡片

In cards, text buttons help maintain an emphasis on card content.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

### 备选方案

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## 浮动操作按钮

[浮动动作按钮](https://material.io/design/components/buttons-floating-action-button.html) (FAB) 在屏幕上执行主要的或最常用的操作。 它出现在所有屏幕内容的前面, 通常作为圆形形状, 其中心有一个图标。 FABs come in two types: regular, and extended.

只在它是最适合呈现屏幕主要操作的方式时使用FAB。

每个屏幕建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失， 然后如果其动作改变则重新出现。

可以使用缩放转换来实现此目的。 注意，既然退出和进入 动画同时被触发，我们使用`enterDelay`来允许旧的浮动动作按钮动画在新按钮进入之前完成。

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Customized Buttons

如果您有阅读[“重写”文档](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是一些示例，包括使用 classes 属性更改 Button 的主要颜色、 使用主题和使用 Bootstrap 样式按钮。

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  链接
</Button>
```

or if you want to avoid properties collisions:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  链接
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it in our [composition guide](/guides/composition/#component-property).*