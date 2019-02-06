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

## 实心按钮

[实心按钮](https://material.io/design/components/buttons.html#contained-button) 表示高度强调, 按照不同的填充颜色和立体效果来表示强调程度。 它们包含对应用程序具有主要作用的操作。

此演示的最后一个示例显示了如何使用上传按钮。

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## 文本按钮

[文本按钮](https://material.io/design/components/buttons.html#text-button) 通常用于不太明显的操作, 包括那些位于:

- 在对话框中
- 在卡片

在卡片中，文本按钮有助于在卡片内容之上强调按钮的存在。

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## 描边按钮

[描边按钮](https://material.io/design/components/buttons.html#outlined-button) 是中等强调按钮。 它们包含重要的操作， 但不是应用程序中的主要操作。

### 备选方案

描边按钮也可以用来作为比实心按钮次要一点的按钮方案， 或者用来作为比文本按钮重要一点的按钮方案。

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## 浮动操作按钮

[浮动动作按钮](https://material.io/design/components/buttons-floating-action-button.html) (FAB) 在屏幕上执行主要的或最常用的操作。 它出现在所有屏幕内容的前面, 通常作为圆形形状, 其中心有一个图标。 FAB有两种类型：常规和扩展。

只在它是最适合呈现屏幕主要操作的方式时使用FAB。

每个屏幕建议只有一个浮动操作按钮来表示最常见的操作。

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

默认情况下，浮动操作按钮会以展开的动画出现在屏幕上。

跨越多个横向屏幕（例如标签式屏幕）的浮动操作按钮应该短暂消失， 然后如果其动作改变则重新出现。

可以使用缩放转换来实现此目的。 注意，既然退出和进入 动画同时被触发，我们使用`enterDelay`来允许旧的浮动动作按钮动画在新按钮进入之前完成。

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## 尺寸

花式更大或更小的按钮？使用 `size` 属性。

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## 带有图标和标签的按钮

有时您可能希望为某个按钮添加图标以增强应用程序的用户体验，因为我们识别徽标比纯文本更容易。 例如，如果您有删除按钮，则可以使用垃圾箱图标对其进行标记。

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## 图标按钮

图标按钮通常位于应用栏和工具栏中。

图标也适用于允许选择单个选项的切换按钮或 取消选择，例如向项目添加或删除星标。

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## 自定义按钮

如果您有阅读[“重写”文档](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是一些示例，包括使用 classes 属性更改 Button 的主要颜色、 使用主题和使用 Bootstrap 样式按钮。

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## 复杂按钮

文本按钮，包含按钮，浮动操作按钮和图标按钮构建在同一组件之上：`ButtonBase`。 您可以利用此较底层的组件来构建自定义交互。

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## 第三方路由库

一个常见的用例是使用按钮触发导航到新页面。 `ButtonBase` 组件提供了一个处理此用例的属性：`component`。 鉴于我们的许多交互式组件都依赖于 `ButtonBase`，你几乎可以在所有地方用到它的好处：

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  链接
</Button>
```

or if you want to avoid properties collision:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  链接
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*