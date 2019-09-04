<p align="center">
  <a href="https://material-ui.com/" rel="noopener" target="_blank"><img width="200" src="https://material-ui-pickers.dev/static/meta-image.png" alt="Material-ui-pickers logo"></a></p>
</p>

<h1 align="center">Material-UI pickers</h1>

<div align="center">

Accessible, customizable, delightful date & time pickers for [@material-ui/core](https://material-ui.com/)

[![npm package](https://img.shields.io/npm/v/@material-ui/pickers.svg)](https://www.npmjs.org/package/@material-ui/pickers)
[![npm download](https://img.shields.io/npm/dm/@material-ui/pickers.svg)](https://www.npmjs.org/package/@material-ui/pickers)
[![codecov](https://codecov.io/gh/mui-org/material-ui-pickers/branch/next/graph/badge.svg)](https://codecov.io/gh/mui-org/material-ui-pickers)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/@material-ui/pickers)](https://bundlephobia.com/result?p=@material-ui/pickers@latest)
[![CircleCI](https://circleci.com/gh/mui-org/material-ui-pickers.svg?style=svg)](https://circleci.com/gh/mui-org/material-ui-pickers)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://dashboard.cypress.io/#/projects/qow28y/runs)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/mui-org/material-ui-pickers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

### Installation

Note that this package requires `@material-ui/core` **v4**. It will not work with the old v3. Please read the [migration guide](https://material-ui-pickers.dev/guides/upgrading-to-v3) if you are updating from v2

```sh
// via npm
npm i @material-ui/pickers

// via yarn
yarn add @material-ui/pickers
```

Now choose the library that pickers will use to work with date. We are providing interfaces for [moment](https://momentjs.com/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs) and [date-fns v2](https://date-fns.org/). If you are not using moment in the project (or don’t have it in the bundle already) we suggest using date-fns or luxon, because they are much lighter and will be correctly tree-shaked from the bundle. Note, that we are fully relying on [date-io](https://github.com/dmtrKovalenko/date-io) for supporting different libraries.

```sh
npm i date-fns@next @date-io/date-fns
// or
npm i moment @date-io/moment
// or
npm i luxon @date-io/luxon
// or
npm i dayjs @date-io/dayjs
```

Then teach pickers which library to use with `MuiPickerUtilsProvider`. This component takes a utils property, and makes it available down the React tree thanks to React context. It should preferably be used at the root of your component tree.

```jsx
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

## Documentation

Check out the [documentation website](https://material-ui-pickers.dev/)

### Recently updated?

Changelog available [here](https://github.com/mui-org/material-ui-pickers/releases)

### Contributing

For information about how to contribute, see the [CONTRIBUTING](https://github.com/mui-org/material-ui-pickers/blob/master/CONTRIBUTING.md) file.

### LICENSE

The project is licensed under the terms of [MIT license](https://github.com/mui-org/material-ui-pickers/blob/master/LICENSE)
