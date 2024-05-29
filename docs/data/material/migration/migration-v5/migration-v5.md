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
