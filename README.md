# Material-UI pickers
[![npm package](https://img.shields.io/npm/v/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![npm download](https://img.shields.io/npm/dm/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![Build Status](https://api.travis-ci.org/dmtrKovalenko/material-ui-pickers.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/material-ui-pickers)
> Components, that implements material design date and time pickers for material-ui v1

### Installation
Available as npm package.
```sh
npm install material-ui-pickers -S
```

Now choose the library that pickers will use to work with date. We are providing interfaces for [moment](https://momentjs.com/) and [date-fns](https://date-fns.org/). If you are not using moment in the project (or dont have it in the bundle already) we suggest using date-fns, because it much more lightweight and will be correctly tree-shaked from the bundle.

```sh
npm install date-fns@next -s
// or
npm install moment -S
```

## Documentation
Check out material-ui-picker's [documentation](https://material-ui-pickers.firebaseapp.com/)

### Recently updated?
Changelog available [here](https://github.com/dmtrKovalenko/material-ui-pickers/releases)

<!-- Delay support of material-ui-pickers probably to rc-2
### Jalali Calendar
We are fully supporting Jalali calendar system and [right-to-left](https://material-ui-next.com/guides/right-to-left/) material-ui api. Special thanks to @alitaheri.
Here is a little example of how to use it

Don't forget to install [material-ui-pickers-jalali-utils](https://github.com/alitaheri/material-ui-pickers-jalali-utils).

```sh
npm install material-ui-pickers-jalali-utils
```

```jsx
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import jalaliUtils from 'material-ui-pickers-jalali-utils';

function App() {
  return ( 
    <MuiPickersUtilsProvider utils={jalaliUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}
``` -->

### Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/CONTRIBUTING.md) file.

### LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/LICENSE)
