## Server Rendering

When using Material-UI with server rendering, we must use the same environment for the server and the client.
This has two technical implications.

### Autoprefixer

First, Material-UI has to use the same user agent for the auto prefixer.
On the client side, the default value is `navigator.userAgent`.
But on the server side, the `navigator` is `undefined`. You need to provide it to Material-UI.

The `userAgent` can take one of the following values:
- a regular user agent like
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36`
- `'all'` to prefix for all user agents
- `false` to disable the prefixer

We rely on the [muiTheme](/#/customization/themes) context to spread the user agent to all of our component.
For instance, you can provide it like this:

```js
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: req.headers['user-agent'],
});

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>Hello world</div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
```

### process.env.NODE_ENV

You also need to use the same `process.env.NODE_ENV` value for the client side and server side.
Otherwise, the checksums won't match.
In order to make sure our style transformations are only applied once,
we add an additional property to each style when `process.env.NODE_ENV !== 'production'`.
