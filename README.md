# Material-UI pickers
[![npm package](https://img.shields.io/npm/v/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![npm download](https://img.shields.io/npm/dm/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![codecov](https://codecov.io/gh/dmtrKovalenko/material-ui-pickers/branch/develop/graph/badge.svg)](https://codecov.io/gh/dmtrKovalenko/material-ui-pickers)
[![Bundle Size](https://img.shields.io/badge/gzip-14.7%20KB-brightgreen.svg)](https://unpkg.com/material-ui-pickers@1.0.0-rc.10/dist/material-ui-pickers.cjs.js)
[![Build Status](https://api.travis-ci.org/dmtrKovalenko/material-ui-pickers.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/material-ui-pickers)
[![npm package](https://img.shields.io/npm/types/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
> Accessible, customizable, delightful date & time pickers for @material-ui/core

### Installation
Available as npm package.
```sh
npm i material-ui-pickers
```

Now choose the library that pickers will use to work with date. We are providing interfaces for [moment](https://momentjs.com/), [luxon](https://moment.github.io/luxon/) and [date-fns](https://date-fns.org/). If you are not using moment in the project (or dont have it in the bundle already) we suggest using date-fns or luxon, because they are much lighter and will be correctly tree-shaked from the bundle. Note, that we support only the 2.0.0-alpha.16 version of date-fns for now. Stay tuned!

```sh
npm i date-fns@2.0.0-alpha.16
// or
npm i moment
// or
npm i luxon
```

Then teach pickers which library to use with `MuiPickerUtilsProvider`. This component takes a utils property, and makes it available down the React tree thanks to React context. It should preferably be used at the root of your component tree.

```jsx
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

And the last step of installation would be an icon font. By default, we are relying on material-icons font, but it's possible to override any icons with the help of corresponding props.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

## Documentation
Check out the [documentation website](https://material-ui-pickers.firebaseapp.com/)

### Recently updated?
Changelog available [here](https://github.com/dmtrKovalenko/material-ui-pickers/releases)

### Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/CONTRIBUTING.md) file.

### LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/LICENSE)
