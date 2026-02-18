# Upgrade to v9

<p class="description">This guide explains how to upgrade from Material UI v7 to v9.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v9 pre-releases.
Alternatively, you can also target and fix it to a specific version, for example, `9.0.0-alpha.0`.

## Breaking changes

Since v9 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v7 to v9 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### TablePagination numbers are formatted by default

Pagination numbers in `TablePagination` are now formatted using `Intl.NumberFormat` according to the locale.
For example, `103177` is displayed as `103,177` in `en-US` or `103.177` in `de-DE`.

To opt out of number formatting, provide a custom `labelDisplayedRows` function:

```jsx
<TablePagination
  labelDisplayedRows={({ from, to, count }) =>
    `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
  }
/>
```

Or when using a locale:

```jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
  },
});
```
