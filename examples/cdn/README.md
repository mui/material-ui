# CDN example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/cdn
cd cdn
```

Run:

```sh
open index.html
```

## The idea behind the example

You can start using Material-UI with minimal Front-end infrastructure,
which is great for prototyping. We discourage using this approach in production though -
the client has to download the entire library, regardless of which components are actually used,
affecting performance and bandwidth utilisation.

[The live preview.](https://combinatronics.com/mui-org/material-ui/master/examples/cdn/index.html)

## UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js
