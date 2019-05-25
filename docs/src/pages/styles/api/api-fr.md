# API

<p class="description">The API reference of the @material-ui/styles package.</p>

## `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](http://cssinjs.org/jss-api/#generate-your-class-names).

#### Paramètres

1. `options` (*Object* [optional]): 
    - `options.disableGlobal` (*Boolan* [optional]): Defaults to `false`. Disable the generation of deterministic class names.
    - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. The string used to prefix the class names in production.
    - `options.seed` (*String* [optional]): Defaults to `''`. The string used to uniquely identify the generator. It can be used to avoid class name collisions when using multiple generators in the same document.

#### Valeur de retour

`class name generator`: The generator should be provided to JSS.

#### Exemples

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

#### Paramètres

1. `styles` (*Function | Object*): A function generating the styles or a styles object.

#### Valeur de retour

`styles`: A function generating the styles or a styles object.

#### Exemples

```jsx
import { makeStyles, createStyles } from '@material-ui/styles';

const styles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.color.red,
  },
}));

function MyComponent {
  const classes = useStyles();
  return <div className={classes.root} />;
}

export default MyComponent;
```

## `makeStyles(styles, [options]) => hook`

Link a style sheet with a function component using the **hook** pattern.

#### Paramètres

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Valeur de retour

`hook`: A hook. This hook can be used in a function component. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

#### Exemples

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

export default function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root} />;
}
```

## `ServerStyleSheets`

This is a class helper to handle server-side rendering. [You can follow our guide for a practical approach](/guides/server-rendering/).

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

const sheets = new ServerStyleSheets();
const html = ReactDOMServer.renderToString(sheets.collect(<App />));
const cssString = sheets.toString();

const response = `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${cssString}</style>
  </head>
  <body>${html}</body>
</html>
`;
```

### `new ServerStyleSheets([options])`

The instantiation accepts an options object as a first argument.

1. `options` (*Object* [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => React element`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `sheets.getStyleElement() => CSS React element`

The method is an alternative to `.toString()` when you are rendering the whole page with React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

#### Paramètres

1. `Component`: The component that will be wrapped.
2. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as property of the first argument.
3. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Valeur de retour

`Component`: The new component created.

#### Exemples

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

const MyThemeComponent = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(1),
}));

export default function StyledComponents() {
  return (
    <MyThemeComponent>
      <MyComponent />
    </MyThemeComponent>
  );
}
```

## `StylesProvider`

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to the context.

It should preferably be used at **the root of your component tree**.

#### PropsBy default, the styles are injected last in the 

<head>
  element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Material-UI's styles, set this prop.</td> </tr> 
  
  <tr>
    <td align="left">
      jss
    </td>
    
    <td align="left">
      object
    </td>
    
    <td align="left">
      
    </td>
    
    <td align="left">
      JSS's instance.
    </td>
  </tr></tbody> </table> 
  
  <h4>
    Exemples
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

function App() {
  return (
    &lt;StylesProvider jss={jss}&gt;...&lt;/StylesProvider&gt;
  );
}

ReactDOM.render(&lt;App /&gt;, document.querySelector('#app'));
</code></pre>
  
  <h2>
    <code>ThemeProvider</code>
  </h2>
  
  <p>
    This component takes a <code>theme</code> property, and makes it available down the React tree thanks to the context. It should preferably be used at <strong>the root of your component tree</strong>.
  </p>
  
  <h4>
    Props
  </h4>
  
  <table>
    <tr>
      <th align="left">
        Name
      </th>
      
      <th align="left">
        Type
      </th>
      
      <th align="left">
        Default
      </th>
      
      <th align="left">
        Description
      </th>
    </tr>
    
    <tr>
      <td align="left">
        children&nbsp;*
      </td>
      
      <td align="left">
        node
      </td>
      
      <td align="left">
        
      </td>
      
      <td align="left">
        Your component tree.
      </td>
    </tr>
    
    <tr>
      <td align="left">
        theme&nbsp;*
      </td>
      
      <td align="left">
        union:&nbsp;object&nbsp;&#124;&nbsp;func
      </td>
      
      <td align="left">
        
      </td>
      
      <td align="left">
        A theme object. You can provide a function to extend the outer theme.
      </td>
    </tr>
  </table>
  
  <h4>
    Exemples
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';

const theme = {};

function App() {
  return (
    &lt;ThemeProvider theme={theme}&gt;...&lt;/ThemeProvider&gt;
  );
}

ReactDOM.render(&lt;App /&gt;, document.querySelector('#app'));
</code></pre>
  
  <h2>
    <code>useTheme() =&gt; theme</code>
  </h2>
  
  <p>
    This hook returns the <code>theme</code> object so it can be used inside a function component.
  </p>
  
  <h4>
    Valeur de retour
  </h4>
  
  <p>
    <code>theme</code>: The theme object previously injected in the context.
  </p>
  
  <h4>
    Exemples
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { useTheme } from '@material-ui/styles';

export default function MyComponent() {
  const theme = useTheme();

  return &lt;div&gt;{`spacing ${theme.spacing}`}&lt;/div&gt;;
}
</code></pre>
  
  <h2>
    <code>withStyles(styles, [options]) =&gt; higher-order component</code>
  </h2>
  
  <p>
    Link a style sheet with a component using the <strong>higher-order component</strong> pattern. It does not modify the component passed to it; instead, it returns a new component with a <code>classes</code> property. This <code>classes</code> object contains the name of the class names injected in the DOM.
  </p>
  
  <p>
    Some implementation details that might be interesting to being aware of:
  </p>
  
  <ul>
    <li>
      It adds a <code>classes</code> property so you can override the injected class names from the outside.
    </li>
    <li>
      It forwards refs to the inner component.
    </li>
    <li>
      The <code>innerRef</code> prop is deprecated. Use <code>ref</code> instead.
    </li>
    <li>
      It does <strong>not</strong> copy over statics. For instance, it can be used to defined a <code>getInitialProps()</code> static method (next.js).
    </li>
  </ul>
  
  <h4>
    Paramètres
  </h4>
  
  <ol start="1">
    <li>
      <code>styles</code> (<em>Function | Object</em>): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
    </li>
    
    <li>
      <code>options</code> (<em>Object</em> [optional]): <ul>
        <li>
          <code>options.defaultTheme</code> (<em>Object</em> [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
        </li>
        <li>
          <code>options.withTheme</code> (<em>Boolean</em> [optional]): Defaults to <code>false</code>. Provide the <code>theme</code> object to the component as a property.
        </li>
        <li>
          <code>options.name</code> (<em>String</em> [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
        </li>
        <li>
          <code>options.flip</code> (<em>Boolean</em> [optional]): When set to <code>false</code>, this sheet will opt-out the <code>rtl</code> transformation. When set to <code>true</code>, the styles are inversed. When set to <code>null</code>, it follows <code>theme.direction</code>.
        </li>
        <li>
          The other keys are forwarded to the options argument of <a href="http://cssinjs.org/jss-api/#create-style-sheet">jss.createStyleSheet([styles], [options])</a>.
        </li>
      </ul>
    </li>
  </ol>
  
  <h4>
    Valeur de retour
  </h4>
  
  <p>
    <code>higher-order component</code>: Should be used to wrap a component.
  </p>
  
  <h4>
    Exemples
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return &lt;div className={this.props.classes.root} /&gt;;
  }
}

export default withStyles(styles)(MyComponent);
</code></pre>
  
  <p>
    Also, you can use as <a href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">decorators</a> like so:
  </p>
  
  <pre><code class="jsx">import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return &lt;div className={this.props.classes.root} /&gt;;
  }
}

export default MyComponent
</code></pre>
  
  <h2>
    <code>withTheme(Component) =&gt; Component</code>
  </h2>
  
  <p>
    Provide the <code>theme</code> object as a property of the input component so it can be used in the render method.
  </p>
  
  <h4>
    Paramètres
  </h4>
  
  <ol start="1">
    <li>
      <code>Component</code>: The component that will be wrapped.
    </li>
  </ol>
  
  <h4>
    Valeur de retour
  </h4>
  
  <p>
    <code>Component</code>: The new component created. Does forward refs to the inner component.
  </p>
  
  <h4>
    Exemples
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return &lt;div&gt;{props.theme.direction}&lt;/div&gt;;
}

export default withTheme(MyComponent);
</code></pre>