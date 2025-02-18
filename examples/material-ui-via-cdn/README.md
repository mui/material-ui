# Material UI - CDN example

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/v5.x | tar -xz --strip=2  material-ui-5.x/examples/material-ui-via-cdn
cd material-ui-via-cdn
```

Run:

```bash
open index.html
```

## The idea behind the example

You can start using Material UI with minimal front-end infrastructure, which is great for prototyping.
We discourage using this approach in production, though.
The client has to download the entire library, regardless of which components are used, affecting performance and bandwidth usage.

<!-- #default-branch-switch -->

[The live preview.](https://raw.githack.com/mui/material-ui/v5.x/examples/material-ui-via-cdn/index.html)

## UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@mui/material@5/umd/material-ui.development.js
- one for production: https://unpkg.com/@mui/material@5/umd/material-ui.production.min.js

<!-- #default-branch-switch -->

## What's next?

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://v5.mui.com/material-ui/getting-started/templates/) section.

<!-- #default-branch-switch -->
