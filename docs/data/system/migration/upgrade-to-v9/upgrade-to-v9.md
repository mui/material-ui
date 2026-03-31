# Upgrade to v9

<p class="description">This guide explains how to upgrade from MUI System v7 to v9.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/system": "latest",
+"@mui/system": "next",
```

Using `next` ensures your project always uses the latest v9 pre-releases.
Alternatively, you can also target and fix it to a specific version, for example, `9.0.0-alpha.0`.

## Breaking changes

Since v9 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from MUI System v7 to v9 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Grid

The Grid component no longer supports system props.
Use the `sx` prop instead:

```diff
-<Grid mt={2} mr={1} />
+<Grid sx={{ mt: 2, mr: 1 }} />
```
