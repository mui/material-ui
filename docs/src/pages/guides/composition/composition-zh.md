# 合成

<p class="description">Material-UI尝试使合成尽可能简单。</p>

## 包装组件

为了提供最大的灵活性和性能， 我们需要一种方法来知道组件接收子元素的性质。 为了解决这个问题，我们在需要 时使用 `muiName` 静态属性标记我们的一些组件。

但是，您仍可能需要包装一个组件以增强它， 即使这可能与` muiName `解决方案冲突。 如果你换一个组件验证是否 该组件具有这种静态属性集。

如果遇到此问题，则需要为包装组件与被包装组件使用相同的标记。 另外，由于父组件可能需要控制包装组件道具，你应该转发这些属性。

我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

Material-UI允许您更改将通过名为`组件的属性呈现的根节点` 。

### 如何运作？

该组件将呈现如下：

```js
return React.createElement(this.props.component, props)
```

例如，在默认情况下，` List` 组件将被渲染为 `< ul>`元件。 但只要把一个[React组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components) 属性传递给 `component` 属性就可以更改这个默认行为。 在下面的例子里， `List` 组件的根元素就会被渲染为一个`<nav>` 元素：

```jsx
<List component="nav">
  <ListItem>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

这种模式非常强大，允许很大的灵活性，以及与其他库互操作的方法，例如[` react-router `](#react-router-demo)或者你最喜欢的表格库。 但它也**带有一个小小的警告!**

### 注意内联

使用内联函数作为 `component` 属性的参数可能会导致 **意外的卸载**，因为每次React呈现时都会将新组件传递给 `component` 属性。 例如，如果要创建自定义` ListItem `作为链接，您可以执行以下操作：

```jsx
import { Link } from 'react-router-dom';

const ListItemLink = ({ icon, primary, secondary, to }) => (
  <li>
    <ListItem button component={props => <Link to={to} {...props} />}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  </li>
);
```

⚠️但是，由于我们使用内联函数来更改呈现的组件，因此React每次都会卸载链接` ListItemLink `被渲染。 React不仅会不必要地更新DOM，还会导致`ListItem` 的涟漪效果出现问题。

解决方案很简单： **避免内联函数并将静态组件传递给 `component` 属性**。 让我们改变我们的` ListItemLink `以下内容：

```jsx
import { Link } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <RouterLink to={this.props.to} {...itemProps} innerRef={ref} />
  ));

  render() {
    const { icon, primary, secondary, to } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    );
  }
}
```

` renderLink `现在将始终引用相同的组件。

### 用速记告诫

您可以利用属性转发来简化代码。 在此示例中，我们不创建任何中间组件：

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️但是，这种策略受到一些限制：属性冲突。 提供`组件的组件` property（例如ListItem）可能不会将其所有属性转发到根元素（例如，密集）。

### 反应路由器演示

这是一个带有[ React Router DOM的演示](https://github.com/ReactTraining/react-router) ：

{{"demo": "pages/guides/composition/ComponentProperty.js"}}

### 使用 TypeScript

您可以在[ TypeScript指南中找到详细信息](/guides/typescript#usage-of-component-property) 。

### Caveat with refs

Some components such as `ButtonBase` (and therefore `Button`) require access to the underlying DOM node. This was previously done with `ReactDOM.findDOMNode(this)`. However `findDOMNode` was deprecated (which disqualifies its usage in React's concurrent mode) in favour of component refs and ref forwarding.

It is therefore necessary that the component you pass to the `component` prop can hold a ref. This includes:

- class components
- ref forwarding components (`React.forwardRef`)
- built-in components e.g. `div` or `a`

If this is not the case we will issue a prop type warning similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

In addition React will issue a warning.

You can fix this warning by using `React.forwardRef`. Learn more about it in [this section in the official React docs](https://reactjs.org/docs/forwarding-refs.html).

To find out if the Material-UI component you're using has this requirement, check out the the props API documentation for that component. If you need to forward refs the description will link to this section.

### Caveat with StrictMode or unstable_ConcurrentMode

If you pass class components to the `component` prop and don't run in strict mode you won't have to change anything since we can safely use `ReactDOM.findDOMNode`. For function components, however, you have to wrap your component in `React.forwardRef`:

```diff
- const MyButton = props => <div {...props} />
+ const MyButton = React.forwardRef((props, ref) => <div {...props} ref={ref} />)
<Button component={MyButton} />
```