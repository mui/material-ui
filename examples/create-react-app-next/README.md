# Create React App v4-alpha example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2 material-ui-next/examples/create-react-app
cd create-react-app
```

Install it and run:

```sh
npm install
npm start
```

## The idea behind the example

This example demonstrates how you can use [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

```
/src
    /components
```

- `src:` Contains the minimum number of files necessary to bootstrap the application.

  - `index.js` wraps the `App` with `ThemeProvider`. This allows us to access our
    theme anywhere in our component tree (using `makeStyles()`). `index.js` also
    provides the `CssBaseline`.
  - `App.js` is the root of our component tree. In this simple example, it contains
    the layout of our landing page. In a more complex applications, you might want to
    place your router here along with other providers.

- `components:` This is where we keep the components that are used in the app - one
  folder per component or a set of tightly related components.
