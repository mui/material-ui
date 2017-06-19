# Minimizing Bundle Size

For convenience, Material-UI exposes its full API on the top-level `material-ui` import.
This will work fine if you have tree shaking working.

However, **in case tree shaking is not supported**, this causes the entire library and its dependencies to be included in client bundles that include code that imports from the top-level bundle.

You have couple of options to overcome this situation:

## Option 1

You can import directly from `material-ui/` to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from 'material-ui';
```

use:

```js
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
```

The public API available in this manner is defined as the set of imports available from the top-level `material-ui` module. Anything not available through the top-level `material-ui` module is a **private API**, and is subject to change without notice.

## Option 2

Another option to keep using the shorten import like the following:

```js
import { Button, TextField } from 'material-ui';
```

But still have the size of the bundle optimized thanks to a **Babel plugin**. Pick one of the following plugin:

- [babel-plugin-material-ui](https://github.com/umidbekkarimov/babel-plugin-material-ui) that targets specifically Material-UI.
- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is quite customizable and with enough tweaks works with Material-UI.
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) aims to work out of the box with all the `package.json`.

**Important note**: Both of the options **should be temporary** until you'll add tree shaking capabilities to your project.
