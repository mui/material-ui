# 构成

<p class="description">Material-UI尝试使合成尽可能简单。</p>

## 包装组件

为了提供最大的灵活性和性能， 我们需要一种方法来知道组件接收子元素的性质。 为了解决这个问题，我们在需要 时使用 `muiName` 静态属性标记我们的一些组件。

但是，用户喜欢包装组件以增强它们。 这可能与我们的 `muiName` 解决方案相冲突。 如果遇到此问题，则需要：

1. 转发属性。
2. 对包装组件使用的包装组件使用相同的标记。

我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = 'Icon';
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

Material-UI允许您更改将通过名为 `component`的属性呈现的根节点。 该组件将呈现如下：

```js
return React.createElement(this.props.component, props)
```

例如，默认情况下， `List` 将呈现 `<ul>` 元素。 这可以通过将 [React组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components) 传递给 `component` 属性来更改。 以下示例将使用 `<nav>` 元素作为根节点呈现 `List` 组件：

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

这种模式非常强大，允许很大的灵活性，以及与其他库互操作的方式，例如 `react-router` 或您喜欢的表单库。 但是，这也 **带有一个小的警告！**

### 注意内联

使用内联函数作为 `component` 属性的参数可能会导致 **意外的卸载**，因为每次React呈现时都会将新组件传递给 `component` 属性。 例如，如果要创建充当链接的自定义 `ListItem` ，则可以执行以下操作：

```jsx
const ListItemLink = ({ icon, primary, secondary, to }) => (
  <li>
    <ListItem button component={props => <Link to={to} {...props} />}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  </li>
);
```

但是，由于我们使用内联函数来更改呈现的组件，因此每次呈现 `ListItemLink` 时，React都将卸载链接。 不仅React不必要地更新DOM， `ListItem` 的连锁效果也将无法正常工作。

解决方案很简单： **避免内联函数并将静态组件传递给 `component` 属性**。 让我们将 `ListItemLink` 更改为以下内容：

```jsx
class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

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

`renderLink` 现在将始终引用相同的组件。

### React Router

这是一个带有 [React Router](https://github.com/ReactTraining/react-router)的演示：

{{"demo": "pages/guides/composition/ComponentProperty.js"}}