# Create React App v4-alpha example with TypeScript

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2 material-ui-next/examples/create-react-app-with-typescript-next
cd create-react-app-with-typescript-next
```

Install it and run:

```sh
npm install
npm start
```

## The idea behind the example

This example demonstrates how you can use
[Create React App](https://github.com/facebookincubator/create-react-app) with
[TypeScript](https://github.com/Microsoft/TypeScript).

## Folder Structure

```
/src
    /components
```

-   `src:` Contains the minimum number of files necessary to bootstrap the application.

    -   `index.tsx` wraps the `App` with `ThemeProvider`. This allows us to access our
        theme anywhere in our component tree (using `makeStyles()`). `index.tsx` also
        provides the `CssBaseline`.
    -   `App.tsx` is the root of our component tree. In this simple example, it contains
        the layout of our landing page. In a more complex applications, you might want to
        place your router here along with other providers.

-   `components:` This is where we keep the components that are used in the app - one
    folder per component or a set of tightly related components.

When reviewing the above folder structure, note how we control the items exposed by a
folder. Each folder has an `index.ts` file which exports only what is needed by external
consumers - nothing more, nothing less! If everything needs to be exported, we simply use
`export * from './xyz';` - instead of repeating each item individually. This makes it
easier to manage the index files.

## To Do

- Reomove `.env` file when a new version of react-scripts is released. Current version
  (2.1.8) uses a lower version of babel-eslint than Material-UI and `npm start` throws
  an exception. 
