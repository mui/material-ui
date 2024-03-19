# Migrating to v6

<p class="description">This guide explains how and why to migrate from Material UI v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the version of the package to `next`.

```diff
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures that it will always use the latest v6 alpha release, but you can also use a fixed version, like `6.0.0-alpha.0`.

## Breaking changes

Since v6 is a major release, it contains some changes that affect the public API.
Below are described the steps you need to make to migrate from Material UI v5 to v6.

:::info
This list is a work in progress.
It will be updated as new breaking changes are introduced.
:::
