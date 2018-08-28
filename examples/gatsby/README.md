# Gatsby example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```bash
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/gatsby
cd gatsby
```

Install it and run:

```bash
npm install
npm run develop
```

## Providing the theme

To propagate the theme to a component tree use the `src/withRoot.js` HOC.
You should wrap **only** your top-level components with this HOC otherwise you risk re-rendering your React tree multiple times and styling issues during the build phase.


## The idea behind the example

[Gatsby](https://github.com/gatsbyjs/gatsby) is a static site generator for React.
