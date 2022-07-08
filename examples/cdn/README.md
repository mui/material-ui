# CDN example

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

```sh
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/cdn
cd cdn
```

Run:

```sh
open index.html
```

## The idea behind the example

You can start using MUI with minimal Front-end infrastructure, which is great for prototyping.
We discourage using this approach in production, though.
The client has to download the entire library, regardless of which components are used, affecting performance and bandwidth usage.

<!-- #default-branch-switch -->

[The live preview.](https://combinatronics.com/mui/material-ui/master/examples/cdn/index.html)

## UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

<!-- #default-branch-switch -->

## What's next?

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/material-ui/getting-started/templates/) section.

<!-- #default-branch-switch -->
