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

### Removal of deprecated ListItem props

## ListItem

### Removed deprecated props

`ListItem`'s props `autoFocus`, `button`, `disabled`, and `selected`, deprecated in v5, have been removed. To replace the `button` prop, use `ListItemButton` instead. The other removed props are available in the `ListItemButton` component as well.

```diff
-<ListItem button />
+<ListItemButton />
```
