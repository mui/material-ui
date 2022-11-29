---
product: material-ui
title: No SSR React component
components: NoSsr
---

# No SSR

<p class="description">The No-SSR component defers the rendering of children components from the server to the client.</p>

## Migrate to MUI Base

:::warning
No-SSR is now part of the standalone [MUI Base](/base/getting-started/overview/) component library.
It is currently re-exported in `@mui/material` for convenience, but it may be deprecated in a future major version of Material UI.

To continue using this component and avoid future breaking changes, we strongly recommend that you [install MUI Base](/base/getting-started/installation/) and import this component from the `@mui/base` package:

```js
import NoSsr from '@mui/base/NoSsr';
```

Please refer to the [No-SSR](/base/react-no-ssr/) component page in the MUI Base docs for examples and details on usage.
:::
