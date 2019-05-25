# Composition

<p class="description">Material-UI tries to make composition as easy as possible.</p>

## Wrapping components

In order to provide the maximum flexibility and performance, we need a way to know the nature of the child elements a component receives. To solve this problem we tag some of our components when needed with a `muiName` static property.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. If you wrap a component verify if that component has this static property set.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component. In addition, you should forward the properties, as the parent component may need to control the wrapped components props.

Давайте рассмотрим пример:

```jsx
const WrappedIcon = props => <Icon {...props} />; WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## Component property

Material-UI позволяет вам изменить корневой узел, который будет отображаться с помощью свойства `component`,.

### How does it work?

Компонент будет отображаться следующим образом:

```js
return React.createElement(this.props.component, props)
```

Например, по умолчанию компонент `List` будет отображать `<ul>` элемент. Это можно изменить, передав [React component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) в свойство `component`. В следующем примере будет отображаться компонент `List` с `<nav>` элементом вместо корневого узла:

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

Этот паттерн очень мощный и обеспечивает большую гибкость, а также способ взаимодействия с другими библиотеками, такими как [`react-router`](#react-router-demo) или ваша любимая библиотека для работы с форами. Но **с небольшой оговоркой! **

### Caveat with inlining

Using an inline function as an argument for the `component` property may result in **unexpected unmounting**, since you pass a new component to the `component` property every time React renders. Например, если вы хотите создать собственный `ListItem`, который работает как ссылка, вы можете сделать следующее:

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

⚠️ Однако, поскольку мы используем встроенную функцию для изменения отрисованного компонента, React будет демонтировать ссылку каждый раз, когда ` ListItemLink ` отрисован. Не только React сделает ненужное обновление DOM, но и ripple эффект `ListItem` будет работать неправильно.

Решение простое: ** избегайте встроенных функций и вместо этого, передавайте статический компонент в свойство `component`**. Давайте изменим наш `ListItemLink` следующим образом:

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

` renderLink ` теперь всегда будет ссылаться на один и тот же компонент.

### Caveat with shorthand

Вы можете воспользоваться преимуществами пробрасывания свойств для упрощения кода. В этом примере мы не создаем ни одного промежуточного компонента:

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ Однако, эта стратегия имеет небольшое ограничение: конфликтующие свойства. The component providing the `component` property (e.g. ListItem) might not forward all its properties to the root element (e.g. dense).

### React Router Demo

Вот демонстрация с [ React Router DOM ](https://github.com/ReactTraining/react-router):

{{"demo": "pages/guides/composition/ComponentProperty.js"}}

### With TypeScript

Вы можете найти подробности в [ руководстве по TypeScript ](/guides/typescript/#usage-of-component-property).

## Caveat with refs

This section covers caveats when using a custom component as `children` or for the `component` prop.

Some of the components need access to the DOM node. This was previously possible by using `ReactDOM.findDOMNode`. This function is deprecated in favor of `ref` and ref forwarding. However, only the following component types can be given a `ref`:

- Any Material-UI component
- class components i.e. `React.Component` or `React.PureComponent`
- DOM (or host) components e.g. `div` or `button`
- [React.forwardRef components](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy components](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo components](https://reactjs.org/docs/react-api.html#reactmemo)

If you don't use one of the above types when using your components in conjunction with Material-UI, you might see a warning from React in your console similar to:

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Be aware that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref.

In some instances we issue an additional warning to help debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

We will only cover the two most common use cases. For more information see [this section in the official React docs](https://reactjs.org/docs/forwarding-refs.html).

```diff
- const MyButton = props => <div role="button" {...props} />;
+ const MyButton = React.forwardRef((props, ref) => <div role="button" {...props} ref={ref} />);
<Button component={MyButton} />;
```

```diff
- const SomeContent = props => <div {...props}>Hello, World!</div>;
+ const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
<Tooltip title="Hello, again."><SomeContent /></Tooltip>;
```

To find out if the Material-UI component you're using has this requirement, check out the the props API documentation for that component. If you need to forward refs the description will link to this section.

### Caveat with StrictMode or unstable_ConcurrentMode

If you use class components for the cases described above you will still see warnings in `React.StrictMode` and `React.unstable_ConcurrentMode`. We use `ReactDOM.findDOMNode` internally for backwards compatibility. You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component. Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

```diff
class Component extends React.Component {
  render() {
-   const { props } = this;
+   const { forwardedRef, ...props } = this.props;
    return <div {...props} ref={forwardedRef} />;
  }
}

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```