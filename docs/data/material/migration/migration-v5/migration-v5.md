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

## Supported browsers

The targets of the default bundle have changed in v6.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, safari >= 15.4, iOS >= 15.4"`.

The stable bundle supports the following minimum versions:

<!-- #stable-snapshot -->

- Chrome 109 (up from 90)
- Edge 121 (up from 91)
- Firefox 115 (up from 78)
- Safari 15.4 in both macOS and iOS (up from 14 in macOS and 12.5 in iOS)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui/material-ui/blob/v6.0.0/.browserslistrc#L16))

### Removed support for IE 11

Support for IE 11 is completely removed, by dropping the legacy bundle and all IE 11 related code.
This allows us to decrease bundle size and keep the scope manageable.
If you need to support IE 11, you can use Material UI v5's [legacy bundle](https://v5.mui.com/material-ui/guides/minimizing-bundle-size/#legacy-bundle), but it won't get updates or bug fixes.

## Breaking changes

Since v6 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v5 to v6 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### UMD bundle was removed

To align with React 19's removal of UMD builds, Material UI has also removed its UMD bundle.
This results in a reduction of the `@mui/material` package size by 2.5MB or 25% of the total package size.

Instead, using ESM-based CDNs such as [esm.sh](https://esm.sh/) is recommended.
For alternative installation methods, refer to the [CDN documentation](/material-ui/getting-started/installation/#cdn).

### Chip

The Chip component's behavior has been updated to match the standard behavior of other components like buttons.
Previously, the Chip component lost focus when the escape button was pressed, which differed from how other button-like components work.
This issue has been resolved, and the chip component retains focus as expected.

You can provide a custom `onKeyUp` handler to implement the previous behavior.

```js
import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function ChipExample() {
  const chipRef = React.useRef(null);
  const keyUpHandler = (event) => {
    if (event.key === 'Escape') {
      chipRef.current!.blur();
    }
  };
  return (
    <Chip
      label="Chip Outlined"
      variant="outlined"
      ref={chipRef}
      onKeyUp={keyUpHandler}
    />
  );
}
```

### Grid v2 (Unstable_Grid)

The spacing mechanism was reworked to use the `gap` CSS property.
This maps better with current layout practices and removes the need for using React Context.
It brings some breaking changes described in the following sections.

#### The Grid is contained inside parent's padding

Previously, the Grid overflowed its parent.
In v6, this is fixed:

<img src="/static/material-ui/migration-v5/grid-overflow-change.png" style="width: 814px;" alt="Before and after of the Grid no longer overflowing its parent in v6." width="1628" height="400" />

This removes the need for the `disableEqualOverflow` prop, so you can remove it:

```diff
 <Grid
-  disableEqualOverflow
 />
```

#### Spacing is no longer considered inside the Grid item's box

Previously, the Grid items included spacing in it's box.
In v6, this is fixed:

<img src="/static/material-ui/migration-v5/grid-spacing-change.png" style="width: 814px;" alt="Before and after of the Grid items no longer including spacing in their box." width="1628" height="400" />

:::warning
Both of these changes might slightly affect your layout.
Note that the items' position doesn't change.
We recommend adopting this new behavior and **not trying to replicate the old one**, as this is a more predictable and modern approach.
:::

### LoadingButton

#### Contents wrapped in a <span>

The `children` passed to the LoadingButton component is now wrapped in a `<span>` tag to avoid [issues](https://github.com/mui/material-ui/issues/27853) when using tools to translate websites.

### useMediaQuery

#### Removed types

The following deprecated types were removed:

- `MuiMediaQueryList`: use `MediaQueryList` (from lib.dom.d.ts) instead.
- `MuiMediaQueryListEvent`: use `MediaQueryListEvent` (from lib.dom.d.ts) instead.
- `MuiMediaQueryListListener`: use `(event: MediaQueryListEvent) => void` instead.
