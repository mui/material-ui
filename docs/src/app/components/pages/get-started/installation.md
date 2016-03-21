## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).
After npm install, you will find all the `.jsx` files in the `/src` folder and
their compiled versions in the pachage root.

### react-tap-event-plugin

Our components use [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)
to listen for touch / tap / clickevents.
This dependency is temporary and will go away once the official React version is released.
Until then, be sure to inject this plugin at the start of your app.

```js
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
```

`react-tap-event-plugin` provides `onTouchTap()` to all React Components.
It's a mobile-friendly `onClick()` alternative for components in Material-UI, especially useful for the buttons.

### Roboto Font

Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto)
font in mind.
So be sure to include it in your project.
Here are [some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500)
on how to do so.
