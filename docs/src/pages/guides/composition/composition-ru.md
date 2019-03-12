# Composition

<p class="description">Material-UI tries to make composition as easy as possible.</p>

## Wrapping components

In order to provide the maximum flexibility and performance, we need a way to know the nature of the child elements a component receives. To solve this problem we tag some of our components when needed with a `muiName` static property.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. If you wrap a component verify if that component has this static property set.

Если вы столкнулись с этой проблемой, вам нужно использовать тот же тег для вашего компонента-обертки что и в оборачиваемом компоненте. In addition, you should forward the properties, as the parent component may need to control the wrapped components props.

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

Вы можете найти подробности в [ руководстве по TypeScript ](/guides/typescript#usage-of-component-property).

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