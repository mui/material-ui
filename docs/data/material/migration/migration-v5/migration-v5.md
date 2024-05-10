# Migrating to v6

<p class="description">This guide explains how and why to migrate from Material UI v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v6 alpha release.
Alternatively, you can also target and fix it to a specific version, for example, `6.0.0-alpha.0`.

## Breaking changes

Since v6 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v5 to v6 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

## Chip Component Changes

The chip component's behavior has been updated to match the standard behavior of other components like buttons.
Previously, the chip component would lose focus when the escape button was pressed. This issue has been resolved, and the chip component retains focus as expected.

You can provide a custom `onKeyUp` handler to implement the previous behavior.

```js
import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function ChipExample() {
  const chipRef = React.useRef(null);
  const keyUpHandler= (event) => {
    if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
  }
  return (
      <Chip label="Chip Outlined" variant="outlined" ref={chipRef}
        onKeyUp={keyUpHandler}
      />
  );
}
```
