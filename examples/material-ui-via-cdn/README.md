# Material UI - CDN example

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/next | tar -xz --strip=2  material-ui-next/examples/material-ui-via-cdn
cd material-ui-via-cdn
```

Run:

```bash
open index.html
```

## The idea behind the example

You can start using Material UI with minimal front-end infrastructure, which is great for prototyping. It uses [ESM CDNs](https://esm.sh/).
We discourage using this approach in production, though.
The client has to download the entire library, regardless of which components are used, affecting performance and bandwidth usage.

<!-- #default-branch-switch -->

[The live preview.](https://rawcdn.githack.com/mui/material-ui/next/examples/material-ui-via-cdn/index.html)

## What's next?

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://next.mui.com/material-ui/getting-started/templates/) section.

<!-- #default-branch-switch -->
