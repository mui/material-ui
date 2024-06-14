# Migrating to v6

<p class="description">This guide explains how and why to migrate from Material UI v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Optionally, if you are using one of these packages, be sure to change the version to `next` too:

- `@mui/icons-material`
- `@mui/system`
- `@mui/lab`
- `@mui/material-nextjs`
- `@mui/styled-engine-sc`
- `@mui/utils`

Using `next` ensures your project always uses the latest v6 alpha release.
Alternatively, you can also target and fix it to a specific version, for example, `6.0.0-alpha.0`.

## Why you should migrate

Material UI v6's biggest highlight is the inclusion of Pigment CSS, a next-gen zero-runtime CSS-in-JS library, as an opt-in styling engine.
Using it will make your project compatible with React Server Components and reduce its bundle size due to the styles extraction, avoiding client-side recalculation.

Aside from that, the CSS variables API for Material UI is now stable in v6.
Relying on CSS variables allows for more intricate customization possibilities and better overall DX.

A major feedback we've learned from the v5 cycle is to reduce the number of breaking changes to the smallest.
Material UI v6 does exactly that: minimal breaking changes, including only browser support updates and a Node.js version bump.
These updates can, for the most part, be migrated automatically via codemods.

Last but not least, Material UI v6 also includes new features, such as container queries and a theme utility for styling different color schemes.

## Supported browsers and Node versions

The targets of the default bundle have changed in v6.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, safari >= 15.4, iOS >= 15.4"`.

<!-- #stable-snapshot -->

- Node.js 18 (up from 12)
- Chrome 109 (up from 90)
- Edge 121 (up from 91)
- Firefox 115 (up from 78)
- Safari 15.4 in both macOS and iOS (up from 14 in macOS and 12.5 in iOS)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui/material-ui/blob/v6.0.0/.browserslistrc#L11))

### Removed support for IE 11

Support for IE 11 is completely removed, by dropping the legacy bundle and all IE 11 related code.
This allows us to decrease bundle size and keep the scope manageable.
If you need to support IE 11, you can use Material UI v5's [legacy bundle](https://v5.mui.com/material-ui/guides/minimizing-bundle-size/#legacy-bundle), but it won't get updates or bug fixes.

## Update React & TypeScript version

### Update React

The minimum supported version of React is v17.0.0 (the same as v5).

### Update TypeScript

The minimum supported version of TypeScript has been increased from v3.5 to 4.1.

:::info
We try to align with types released by [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (that is packages published on npm under the `@types` namespace).

We will not change the minimum supported version in a minor version of Material UI.
However, we recommend not using a TypeScript version older than the lowest supported version by DefinitelyTyped.
:::

If your project includes these packages, you'll need to update them:

- `@types/react`
- `@types/react-dom`

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## Breaking changes

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
    if (event.key === 'Escape' && chipRef.current) {
      chipRef.current.blur();
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
- <Grid disableEqualOverflow />
+ <Grid />
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

## Stabilized APIs

### CssVarsProvider and extendTheme

The `CssVarsProvider` and `extendTheme` APIs are now stable.
If you already use them in v5, you can now drop the experimental prefix.

```diff
- import { experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
+ import { extendTheme, CssVarsProvider } from '@mui/material/styles';
```

Check out the [CSS theme variables page](/material-ui/customization/css-theme-variables/overview/) to learn more about it.

### Specific mode styles

The `theme.applyStyles` is a new utility for creating style for a specific mode.
It's designed to replace the use of `theme.palette.mode` when applying light or dark styles.

```diff
 const MyComponent = styled('button')(({ theme }) => ({
   padding: '0.5rem 1rem',
   border: '1px solid,
-  borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
+  borderColor: '#000',
+  ...theme.applyStyles('dark', {
+    borderColor: '#fff',
+  })
 }))
```

Use these codemods to migrate your project to `theme.applyStyles`:

```bash
npx @mui/codemod@next v6.0.0/styled <path/to/folder-or-file>
npx @mui/codemod@next v6.0.0/sx-prop <path/to/folder-or-file>
npx @mui/codemod@next v6.0.0/theme-v6 <path/to/theme-file>
```

> Run `v6.0.0/theme-v6` against the file that contains the custom `styleOverrides`. Ignore this codemod if you don't have a custom theme.

## Deprecations

### Components props

The `components` and `componentsProps` props have been deprecated for the analogous `slots` and `slotProps`.
This brings consistency between the components.

For more details on each component, check out the [deprecations page](/material-ui/migration/migrating-from-deprecated-apis/).

### System props

System props, such as `mt={*}`, `bgcolor={*}`, and others, are deprecated in the Box, Typography, Link, Grid, and Stack components.
Move all system props into the `sx` prop by using the codemod below:

```bash
npx @mui/codemod@next v6.0.0/system-props <path/to/folder>
```

Or do it manually like the example below:

```diff
- <Button mr={2}>...</Button>
+ <Button sx={{ mr: 2 }}>...</Button>
```

### Theme component variants

Custom component variants defined in the theme are now merged with the theme style overrides, defined within the `root` slot of the component.
Update the theme file using the codemod:

```bash
npx @mui/codemod@next v6.0.0/theme-v6 <path/to/theme>
```

Or do it manually like the example below:

```diff
 createTheme({
   components: {
     MuiButton: {
-      variants: [ ... ],
+      styleOverrides: {
+        root: {
+          variants: [ ... ]
+        }
+      }
     }
   }
 })
```

This reduces the API surface and lets you define variants in other slots of the component.

## Pigment CSS integration (optional)

:::info
⏳ This section is under construction
:::
