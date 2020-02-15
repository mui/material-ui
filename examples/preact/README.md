# Preact example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/preact
cd preact
```

Install it and run:

```sh
npm install
npm run start
```
or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/preact)

## The idea behind the example

[Preact](https://github.com/developit/preact) is a fast 3kB alternative to React with the same modern API.

This example uses an ejected version of CRA.
It's ejected to change the webpack configuration:

```js
alias: {
  // Use Preact instead of React.
  'react': 'preact/compat',
  'react-dom': 'preact/compat',
}
```
