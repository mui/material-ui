# @mui/internal-babel-plugin-resolve-imports

A babel plugin that resolves import specifiers that are created under the Node.js resolution algorithm to specifiers that adhere to ESM resolution algorithm.

See https://nodejs.org/docs/v20.16.0/api/esm.html#mandatory-file-extensions

> A file extension must be provided when using the import keyword to resolve relative or absolute specifiers. Directory indexes (For example './startup/index.js') must also be fully specified.
>
> This behavior matches how import behaves in browser environments, assuming a typically configured server.

This changes imports in the build output from

```tsx
// packages/mui-material/build/index.js
export * from './Accordion';

// packages/mui-material/build/Breadcrumbs/BreadcrumbCollapsed.js
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
```

to

```tsx
// packages/mui-material/build/index.js
export * from './Accordion/index.js';

// packages/mui-material/build/Breadcrumbs/BreadcrumbCollapsed.js
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz.js';
```

## options

- `outExtension`: The extension to use when writing the output. Careful: if not specified, this plugin does not replace extensions at all, your bundles will likely be broken. We left this optional to allow for using this plugin together with the aliasing to source that we do everywhere. That way we can keep it in the pipeline even when not strictly necessary.
