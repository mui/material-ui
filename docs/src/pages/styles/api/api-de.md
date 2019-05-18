# API

<p class="description">Die API-Referenz des @material-ui/styles Pakets.</p>

## `createGenerateClassName([options]) => class name generator`

Eine Funktion, die eine [Klassennamengeneratorfunktion](http://cssinjs.org/jss-api/#generate-your-class-names) zurückgibt.

#### Argumente

1. `Optionen` (*Object* [optional]): 
    - `options.disableGlobal` (*Boolan* [optional]): Defaults to `false`. Disable the generation of deterministic class names.
    - `options.productionPrefix` (*String* [optional]): Standardeinstellung ist ` 'jss' `. Ein String, der den Klassennamen in der Produktion vorangestellt wird.
    - `options.seed` (*String* [optional]): Standardeinstellung ist `''`. Der String, mit der der Generator eindeutig identifiziert wird. It can be used to avoid class name collisions when using multiple generators in the same document.

#### Rückgabewerte

`class name generator`: Der Generator der JSS zur Verfügung gestellt werden sollte.

#### Beispiele

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

Diese Funktion "macht zur Laufzeit nicht wirklich etwas", es ist nur die Identität Funktion. Sein einziger Zweck ist es, **TypeScript** Typverbreiterung zu verhindern, wenn Style-Regeln für `makeStyles`/`withStyles` bereitgestellt werden, welche eine Funktion des `Themes` sind.

#### Argumente

1. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert.

#### Rückgabewerte

`styles`: Eine Funktion, die die Stile oder ein Stilobjekt generiert.

#### Beispiele

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

Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem **Hook** Muster.

#### Argumente

1. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es ist das erste Argument.
2. `Optionen` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
    - `options.withTheme ` (*Boolean* [optional]): Standardeinstellung ist `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
    - `options.name` (*String* [optional]): Der Name des Stylesheets. Nützlich zum Debuggen. Wenn der Wert nicht angegeben wird, wird versucht, auf den Namen der Komponente zurückzugreifen.
    - `options.flip` (*Boolean* [optional]): Wenn auf `false` gestellt, wird die `Rechts-Nach-Links` Transformation deaktiviert. Wenn es `true` ist sind die Stile invertiert. Wenn es `null` ist, folgt es der `theme.direction` Einstellung.
    - Die anderen Schlüssel werden an das Optionsargument [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet) weitergeleitet.

#### Rückgabewerte

`Hook`: Ein Hook. Dieser Hook kann in einer Funktionskomponente verwendet werden. Er akzeptiert ein Argument: die Eigenschaften, die für „Interpolation“ in das Stylesheet verwendet wird.

#### Beispiele

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

Dies ist ein Klassenhelfer für das serverseitige Rendering. [ Sie können unserem Leitfaden für einen praktischen Ansatz folgen](/guides/server-rendering/).

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

### `neue ServerStyleSheets ([options])`

Die Instantiierung akzeptiert ein Optionsobjekt als erstes Argument.

1. `options` (*Objekt * [optional]): Die Optionen werden als Eigenschaften an die [`StylesProvider`](#stylesprovider) Komponente verteilt.

### `sheets.collect(node) => React element`

Die Methode schließt Ihre React Knoten in ein Provider-Element ein. Es sammelt die Stylesheets während des Renderns, um sie später an den Client zu senden.

### `sheets.toString() => CSS string`

Die Methode gibt die gesammelten Stile zurück.

⚠️ Sie müssen `.collect()` aufrufen, bevor Sie diese Methode verwenden.

### `sheets.getStyleElement() => CSS React element`

Die Methode ist eine Alternative zu `.toString()`, wenn Sie die gesamte Seite mit React rendern.

⚠️ Sie müssen `.collect()` aufrufen, bevor Sie diese Methode verwenden.

## `styled(Component)(styles, [options]) => Component`

Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem **styled components** Muster.

#### Argumente

1. `Component`: Die Komponente, die verpackt wird.
2. `styles` (* Function | Object *): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es wird als Eigenschaft des ersten Arguments bereitgestellt.
3. `Optionen` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
    - `options.withTheme ` (*Boolean* [optional]): Standardeinstellung ist `false`. Übergeben Sie das `Theme` Objekt als Eigenschaft an die Komponente.
    - `options.name` (*String* [optional]): Der Name des Stylesheets. Nützlich zum Debuggen. Wenn der Wert nicht angegeben wird, wird versucht, auf den Namen der Komponente zurückzugreifen.
    - `options.flip` (*Boolean* [optional]): Wenn auf `false` gestellt, wird die `Rechts-Nach-Links` Transformation deaktiviert. Wenn es `true` ist sind die Stile invertiert. Wenn es `null` ist, folgt es der `theme.direction` Einstellung.
    - Die anderen Schlüssel werden an das Optionsargument [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet) weitergeleitet.

#### Rückgabewerte

`Component`: Die neu erstellte Komponente.

#### Beispiele

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

Mit dieser Komponente können Sie das Verhalten der Styling-Lösung ändern. Durch den Kontext werden die Optionen im React-Baum verfügbar.

Es sollte vorzugsweise an der **Wurzel Ihres Komponentenbaums** verwendet werden.

#### EigenschaftenStandardmäßig werden die Stile zuletzt eingefügt 

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
      JSS-Instanz.
    </td>
  </tr></tbody> </table> 
  
  <h4>
    Beispiele
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
    Diese Komponente hat eine <code>Theme</code> Eigenschaft. Diese wird durch den Kontext in der React-Struktur verfügbar gemacht. Es sollte vorzugsweise an der <strong>Wurzel Ihres Komponentenbaums</strong> verwendet werden.
  </p>
  
  <h4>
    Eigenschaften
  </h4>
  
  <table>
    <tr>
      <th align="left">
        Name
      </th>
      
      <th align="left">
        Typ
      </th>
      
      <th align="left">
        Standard
      </th>
      
      <th align="left">
        Beschreibung
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
        Ihr Komponentenbaum.
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
        Ein Themeobjekt. Sie können eine Funktion bereitstellen, um das äußere Theme zu erweitern.
      </td>
    </tr>
  </table>
  
  <h4>
    Beispiele
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
    Dieser Hook gibt das <code>Theme</code>-Objekt zurück, so dass es innerhalb einer Funktionskomponente verwendet werden kann.
  </p>
  
  <h4>
    Rückgabewerte
  </h4>
  
  <p>
    <code>Theme</code>: Das Themenobjekt, das zuvor in den Kontext eingefügt wurde.
  </p>
  
  <h4>
    Beispiele
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
    Verknüpfen Sie ein Stylesheet mit einer Funktionskomponente mit dem <strong>higher-order component</strong> Muster. Die an sie übergebene Komponente wird nicht geändert. Stattdessen wird eine neue Komponente mit der Eigenschaft <code>classes</code> zurückgegeben. Dieses <code>classes</code> Objekt enthält den Namen der Klassennamen, die in das DOM eingefügt wurden.
  </p>
  
  <p>
    Einige Implementierungsdetails, die interessant sein könnten:
  </p>
  
  <ul>
    <li>
      Es fügt eine <code>classes</code> Eigenschaft hinzu, damit Sie die injizierten Klassennamen von außen überschreiben können.
    </li>
    <li>
      Leitet die innere Komponente mit Ref weiter.
    </li>
    <li>
      Die <code>innerRef</code> Eigenschaft ist veraltet. Verwenden Sie <code>ref</code> stattdessen.
    </li>
    <li>
      Es wird <strong>keine</strong> Statik rüberkopiert. Es kann zum Beispiel verwendet werden, um eine <code>getInitialProps()</code> als statische Methode zu definieren (next.js).
    </li>
  </ul>
  
  <h4>
    Argumente
  </h4>
  
  <ol start="1">
    <li>
      <code>styles</code> (<em> Function | Object </em>): Eine Funktion, die die Stile oder ein Stilobjekt generiert. Es wird mit der Komponente verknüpft. Verwenden Sie die Funktionssignatur, wenn Sie Zugriff auf das Theme benötigen. Es ist das erste Argument.
    </li>
    
    <li>
      <code>Optionen</code> (<em>Object</em> [optional]): <ul>
        <li>
          <code>options.defaultTheme</code> (<em>Object</em> [optional]): Das Standarddesign, das verwendet werden soll, wenn ein Theme nicht über einen Theme Provider bereitgestellt wird.
        </li>
        <li>
          <code>options.withTheme </code> (<em>Boolean</em> [optional]): Standardeinstellung ist <code>false</code>. Übergeben Sie das <code>Theme</code> Objekt als Eigenschaft an die Komponente.
        </li>
        <li>
          <code>options.name</code> (<em>String</em> [optional]): Der Name des Stylesheets. Nützlich zum Debuggen. Wenn der Wert nicht angegeben wird, wird versucht, auf den Namen der Komponente zurückzugreifen.
        </li>
        <li>
          <code>options.flip</code> (<em>Boolean</em> [optional]): Wenn auf <code>false</code> gestellt, wird die <code>Rechts-Nach-Links</code> Transformation deaktiviert. Wenn es <code>true</code> ist sind die Stile invertiert. Wenn es <code>null</code> ist, folgt es der <code>theme.direction</code> Einstellung.
        </li>
        <li>
          Die anderen Schlüssel werden an das Optionsargument <a href="http://cssinjs.org/jss-api/#create-style-sheet">jss.createStyleSheet([styles], [options])</a> weitergeleitet.
        </li>
      </ul>
    </li>
  </ol>
  
  <h4>
    Rückgabewerte
  </h4>
  
  <p>
    <code>Komponente höherer Ordnung</code>: Sollte zum Umwickeln einer Komponente verwendet werden.
  </p>
  
  <h4>
    Beispiele
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
    Sie können auch so als <a href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">Dekorateur</a> verwenden:
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
    Geben Sie das <code>Theme</code>-Objekt als Eigenschaft der Eingabekomponente weiter, sodass es in der Render-Methode verwendet werden kann.
  </p>
  
  <h4>
    Argumente
  </h4>
  
  <ol start="1">
    <li>
      <code>Component</code>: Die Komponente, die verpackt wird.
    </li>
  </ol>
  
  <h4>
    Rückgabewerte
  </h4>
  
  <p>
    <code>Component</code>: Die neu erstellte Komponente. Leitet die innere Komponente mit Ref weiter.
  </p>
  
  <h4>
    Beispiele
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return &lt;div&gt;{props.theme.direction}&lt;/div&gt;;
}

export default withTheme(MyComponent);
</code></pre>