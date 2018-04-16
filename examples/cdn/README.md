# CDN example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```bash
curl https://codeload.github.com/mui-org/material-ui/tar.gz/v1-beta | tar -xz --strip=2  material-ui-1-beta/examples/cdn
cd cdn
```

Run:

```bash
open index.html
```

## The idea behind the example

You can start using Material-UI with minimal Front-end infrastructure,
which is great for prototyping. Don't use this approach in production though -
the client has to download the entire library, regardless of which components are actually used,
affecting performance and bandwidth utilisation.
