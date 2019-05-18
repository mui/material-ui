# API

<p class="description">@ material-ui/styles包的API参考。</p>

## `createGenerateClassName([options]) => class name generator`

返回 [ 类名称生成器函数 ](http://cssinjs.org/jss-api/#generate-your-class-names) 的函数。

#### 参数

1. `选项` (*Object* [optional]): 
    - `options.disableGlobal` (*Boolan* [optional]): Defaults to `false`. Disable the generation of deterministic class names.
    - `options.productionPrefix` (*String* [optional])：初始值为`'jss'`. 用于在生产中对类名称进行前缀的字符串。
    - `options.seed` (*String* [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 It can be used to avoid class name collisions when using multiple generators in the same document.

#### 返回结果

`类名生成器`：应该将生成器提供给JSS。

#### 例子

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

这个函数在运行时并没有真正“做任何事”，它只是身份 函数。 Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。

#### 返回结果

`styles` ：生成样式或样式对象的函数。

#### 例子

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

链路的样式表中有一个功能组件的使用**钩**的模式。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet)。

#### 返回结果

`hook` ： 一个钩子。 该钩子可以用在功能组件中。 它接受一个参数：将用于在“内插”的属性 样式表。

#### 例子

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

链路的样式表中有一个功能组件的使用**styled components**的模式。

#### 参数

1. `Component` ：将被包装的组件。
2. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 It's provided as property of the first argument.
3. `options` (*Object* [optional]): 
    - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet)。

#### 返回结果

`Component` ：创建新组件。

#### 例子

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

此组件允许您更改样式解决方案的行为。 It makes the options available down the React tree thanks to the context.

它最好应在**组件树的根目录中使用** 。

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
    例子
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
    This component takes a <code>theme</code> property, and makes it available down the React tree thanks to the context. 它最好应在<strong>组件树的根目录中使用</strong> 。
  </p>
  
  <h4>
    Props
  </h4>
  
  <table>
    <tr>
      <th align="left">
        名称
      </th>
      
      <th align="left">
        类型
      </th>
      
      <th align="left">
        默认
      </th>
      
      <th align="left">
        描述
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
    例子
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
    该钩子返回<code>theme</code>对象因此可以在函数组件中使用。
  </p>
  
  <h4>
    返回结果
  </h4>
  
  <p>
    <code>theme</code>: The theme object previously injected in the context.
  </p>
  
  <h4>
    例子
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
    链路的样式表有分量利用<strong>higher-order component</strong>的模式。 它不会修改传递给它的组件；相反，它返回一个具有<code>classes</code>属性的新组件。 这个<code>classes</code>对象包含DOM中注入的class名称。
  </p>
  
  <p>
    一些可能有趣的实现细节：
  </p>
  
  <ul>
    <li>
      它添加了一个 <code>classes</code> 属性，因此您可以从外部覆盖注入的类名。
    </li>
    <li>
      It forwards refs to the inner component.
    </li>
    <li>
      The <code>innerRef</code> prop is deprecated. Use <code>ref</code> instead.
    </li>
    <li>
      It does <strong>not</strong> copy over statics. 例如，它可用于定义 <code> getInitialProps()</code> 静态方法 (next.js)。
    </li>
  </ul>
  
  <h4>
    参数
  </h4>
  
  <ol start="1">
    <li>
      <code> styles </code>(<em> Function | Object </em>): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
    </li>
    
    <li>
      <code>options</code> (<em>Object</em> [optional]): <ul>
        <li>
          <code>options.defaultTheme</code>（<em>Object</em> [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
        </li>
        <li>
          <code> options.withTheme </code> (<em>Boolean</em> [optional]): 默认值为 <code>false</code>。 将 <code> theme </code> 对象作为属性提供给组件。
        </li>
        <li>
          <code> options.name </code> (<em>String</em> [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
        </li>
        <li>
          <code>options.flip</code> (<em>Boolean</em> [optional])：当设置为 <code>false</code> 时, 此工作表将选择退出 <code> rtl </code> 转换。 如果设置为 <code> true </code>, 则会反转样式。 当设置为<code>null</code>，它跟随<code>theme.direction</code>。
        </li>
        <li>
          其他键被转发到<a href="http://cssinjs.org/jss-api/#create-style-sheet">jss.createStyleSheet([styles], [options])</a>。
        </li>
      </ul>
    </li>
  </ol>
  
  <h4>
    返回结果
  </h4>
  
  <p>
    <code>higher-order component</code>：应用于包装组件。
  </p>
  
  <h4>
    例子
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
    此外, 还可以像这样使用 <a href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">修饰器</a>:
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
    提供<code>theme</code> object作为输入组件的属性，因此可以在render方法中使用 。
  </p>
  
  <h4>
    参数
  </h4>
  
  <ol start="1">
    <li>
      <code>Component</code> ：将被包装的组件。
    </li>
  </ol>
  
  <h4>
    返回结果
  </h4>
  
  <p>
    <code>Component</code> ：创建新组件。 Does forward refs to the inner component.
  </p>
  
  <h4>
    例子
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return &lt;div&gt;{props.theme.direction}&lt;/div&gt;;
}

export default withTheme(MyComponent);
</code></pre>