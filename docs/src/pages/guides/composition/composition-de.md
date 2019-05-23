# Komposition

<p class="description">Die Material-UI versucht die Komposition so einfach wie möglich zu gestalten.</p>

## Komponenten verpacken

Um maximale Flexibilität und Leistung zu gewährleisten, benötigen wir einen Weg, um die Art der untergeordneten Elemente einer Komponente zu kennen. Zur Lösung dieses Problems haben wir einige unserer Komponenten, wenn nötig, mit der statische Eigenschaft ` muiName ` markiert.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. Wenn Sie eine Komponente umschließen, überprüfen Sie, ob für diese Komponente diese statische Eigenschaft festgelegt ist.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component. In addition, you should forward the properties, as the parent component may need to control the wrapped components props.

Sehen wir uns ein Beispiel an:

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## Komponenteneigenschaft

Mit der Material-UI können Sie den Stammknoten der gerendert wird mit der `component` Eigenschaft ändern.

### Wie funktioniert das?

Die Komponente wird wie folgt gerendert:

```js
return React.createElement(this.props.component, props)
```

Beispielsweise wird die `List` Komponente mit einem `<ul>`-Element gerendert. Dies kann durch übergeben der [React component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) als `component` Eigenschaft geändert werden. Im folgenden Beispiel wird die Komponente `List` stattdessen mit einem `<nav>` Element als Wurzelknoten gerendert:

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

Dieses Muster ist sehr leistungsfähig und ermöglicht eine große Flexibilität sowie die Möglichkeit, mit anderen Bibliotheken wie dem [`React-Router`](#react-router-demo) oder Ihre Lieblingsformularbibliothek zu arbeiten. Aber es gibt auch eine **kleine Einschränkung!**

### Vorbehalt beim Inlining

Verwenden einer Inline-Funktion als Argument für die `component` Eigenschaft kann dazu führen, dass **unerwartetes unmounting** passiert, da Sie jedes mal eine neue Komponente an die `component` Eigenschaft übergeben, wenn React rendert. Zum Beispiel, wenn Sie ein benutzerdefiniertes `ListItem` erstellen möchten, das als Link fungiert, können Sie Folgendes tun:

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

⚠️ Da wir jedoch eine Inline-Funktion verwenden, um die gerenderte Komponente zu ändern, wird die Verknüpfung von React bei jedem Rendern des `ListItemLink ` aufgehoben. React aktualisiert nicht nur das DOM unnötig, sondern die Wellenvisualisierung des `ListItem` funktioniert auch nicht richtig.

Die Lösung ist einfach: ** vermeiden von Inline-Funktionen und stattdessen übergeben eine statische Komponente an die `component` Eigenschaft. Lassen Sie uns unser `ListItemLink` zu dem Folgendem ändern:</p> 

```jsx
import { Link } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    // mit react-router-dom@^5.0.0 benutze `ref` anstatt `innerRef`
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

`renderLink` wird jetzt immer auf dieselbe Komponente verweisen.

### Vorbehalt mit der Abkürzung

Sie können die Weiterleitung von Eigenschaften nutzen, um den Code zu vereinfachen. In diesem Beispiel erstellen wir keine Zwischenkomponente:

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ Jedoch weist diese Strategie eine kleine Einschränkung auf: die Kollision der Eigenschaften. Die Komponente, die die `component` Eigenschaft bereitstellt (z.B. ListItem), leitet möglicherweise nicht alle Eigenschaften an das Stammelement weiter(z.B. dense).

### React Router Demo

Hier ist eine Demo mit [React Router DOM](https://github.com/ReactTraining/react-router):

{{"demo": "pages/guides/composition/ComponentProperty.js"}}

### Mit TypeScript

Die Details finden Sie im [TypeScript-Handbuch](/guides/typescript/#usage-of-component-property).

## Vorbehalt bei Refs

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

> Ungültige `component` Eigenschaft an `ComponentName` übergeben. Es wurde ein Elementtyp erwartet, der eine Referenz enthalten kann.

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

Um herauszufinden, ob die Material-UI - Komponente, die Sie verwenden, diese Anforderung hat, überprüfen Sie API - Dokumentation für diese Komponente. Wenn Sie Refs weiterleiten müssen, wird die Beschreibung mit diesem Abschnitt verknüpft.

### Vorsicht bei StrictMode oder unstable_ConcurrentMode

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