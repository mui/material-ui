# Minimizing Bundle Size

For convenience, Material-UI exposes its full API on the top-level `material-ui` import.
However, this causes the entire library and its dependencies to be included in client bundles that include code that imports from the top-level bundle.

You can import directly from `material-ui/` to avoid pulling in unused modules. For instance, instead of:

```js
import { Button, TextField } from 'material-ui'
```

use:

```js
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
```

The public API available in this manner is defined as the set of imports available from the top-level `material-ui` module. Anything not available through the top-level `material-ui` module is a **private API**, and is subject to change without notice.
