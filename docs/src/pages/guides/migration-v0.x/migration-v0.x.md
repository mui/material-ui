# Migration From v0.x

## FAQ

### Woah - the API is way different! Does that mean 1.0 is completely different, I’ll have to learn the basics all over again, and migrating will be practically impossible?

I’m glad you asked! The answer is no. The core concepts haven’t changed.
You will notice that the API provides more flexibility, but this has a cost.
We have been making lower-level components, abstracting less complexity.

### What motivated such large change?

Material-UI was started [3 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46).
The ecosystem has evolved a lot since then, we have also learned a lot.
[@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up**
taking advantage of this knowledge to address long-standing issues. To name some of the major changes:
- New styling solution using CSS-in-JS (better [customization](/customization/overrides) power, better performance)
- New [theme handling](/customization/themes) (nesting, self-supporting, etc.)
- Blazing fast documentation thanks to [Next.js](https://github.com/zeit/next.js)
- Way better [test coverage](/guides/testing) (99%+, run on all the major browsers, [visual regression tests](https://www.argos-ci.com/mui-org/material-ui))
- Full [server-side rendering](/guides/server-rendering) support
- Wide range of [supported browsers](/getting-started/supported-platforms)

Curious to learn more about it? You can checkout our [Q&A on the v1 version](/discover-more/roadmap#q-amp-a-with-the-v1-version).

### Where should I start in a migration?

1. Start by installing the v1.x version of Material-UI along side the v0.x version.
   [**Yarn**](https://github.com/yarnpkg/yarn) provides an alias feature to do so:

  ```sh
  yarn add material-ui@latest
  yarn add material-ui-next@npm:material-ui@next
  ```

  then

  ```js
  import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from 'material-ui-next/Button'; // v1.x
  ```

  If you can't use Yarn, we also provide a separate package for **NPM**.
  However, the package might not be always up to date.
  **It's why we encourage people to use a Yarn alias**.

  ```sh
  npm install material-ui@latest
  npm install material-ui-next@latest
  ```

  then

  ```js
  import FlatButton from 'material-ui/FlatButton'; // v0.x
  import Button from 'material-ui-next/Button'; // v1.x
  ```

2. Run [the migration helper](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui-codemod) on your project.
3. `MuiThemeProvider` is optional for v1.x. Still, you are free to use v0.x and v1.x versions of the component at the same time like so:

  ```jsx
  import React from 'react';
  import { MuiThemeProvider as NewMuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';
  import { MuiThemeProvider } from 'material-ui';
  import getMuiTheme from 'material-ui/styles/getMuiTheme';

  const themeV1 = createMuiTheme({
    /* theme for v1 */
  });
  const themeV0 = getMuiTheme({
    /* theme v0.x */
  });

  function App() {
    return (
      <NewMuiThemeProvider theme={themeV1}>
        <MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</MuiThemeProvider>
      </NewMuiThemeProvider>
    );
  }

  export default App;
  ```

4. After that, you are free to migrate one component instance at the time.

## Components

### Autocomplete

Material-UI doesn't provide any high-level API for solving this problem.
We encourage people relying on [the solutions the React community has built](https://material-ui-next.com/demos/autocomplete/).

In the future, we will look into providing a simple component to solve the simple use cases: [#9997](https://github.com/mui-org/material-ui/issues/9997).

### Svg Icon

First, run [the migration helper](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui-codemod) on your project.

However, this might not be enough when using the svg icons.
The `material-ui-icons` package has a dependency on the `material-ui/SvgIcon` module.
The `SvgIcon` component slightly changed between the two versions.
You might see some missing context errors and wrong colors.

You can fix those issues with the following code.
Apply it before all the other imports:

```js
import SvgIcon from 'material-ui-next/SvgIcon';

// Tells `material-ui-icons` to use `material-ui-next/SvgIcon` module
// instead of `material-ui/SvgIcon`.
global.__MUI_SvgIcon__ = SvgIcon;
```

### Flat Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from 'material-ui-next/Button';

-<FlatButton />
+<Button />
```

### Raised Button

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from 'material-ui-next/Button';

-<RaisedButton />
+<Button variant="raised" />
```

### To be continued…

You successfully migrated your app and wish to help the community?
Please help us! We have an open issue in order to finish this migration guide [#7195](https://github.com/mui-org/material-ui/issues/7195). Any pull request is welcomed 😊.
