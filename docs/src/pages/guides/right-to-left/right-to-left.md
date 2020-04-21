# Right-to-left

<p class="description">Right-to-left languages such as Arabic, Persian or Hebrew are supported. To change the direction of Material-UI components you must follow the following steps.</p>

## Steps

### 1. HTML

Make sure the `dir` attribute is set on the body, otherwise native components will break:
```html
<body dir="rtl">
```

### 2. Theme

Set the direction in your custom theme:
```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. jss-rtl

You need this JSS plugin to flip the styles: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```
Having installed the plugin in your project, Material-UI components still require it to be loaded by the jss instance, as described below.
Internally, withStyles is using this JSS plugin when `direction: 'rtl'` is set on the theme.
Head to the [plugin README](https://github.com/alitaheri/jss-rtl) to learn more about it.

Once you have created a new JSS instance with the plugin, you need to make it available to all the components in the component tree.
The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

## Demo

*Use the direction toggle button on the top right corner to flip the whole documentation*

{{"demo": "pages/guides/right-to-left/Direction.js"}}


## Opting out of rtl transformation

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

*Use the direction toggle button on the top right corner to see the effect.*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}
