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

### Dialog & Modal

The deprecated `disableEscapeKeyDown` has been removed. The same behaviour could be achieved
by checking the `reason` argument in `onClose`. These are equivalent:

```tsx
// old usage with the disableEscapeKeyDown

const [open, setOpen] = React.useState(true);

const handleClose = () => {
  setOpen(false);
};

return (
  <Dialog open={open} disableEscapeKeyDown onClose={handleClose}>
    {/* ... */}
  </Dialog>
);
```

```tsx
// new usage by checking the reason argument

const [open, setOpen] = React.useState(true);

const handleClose = (_event: React.SyntheticEvent<unknown>, reason: string) => {
  if (reason !== 'escapeKeyDown') {
    setOpen(false);
  }
};

return (
  <Dialog open={open} onClose={handleClose}>
    {/* ... */}
  </Dialog>
);
```

The `Modal` change is the same.
