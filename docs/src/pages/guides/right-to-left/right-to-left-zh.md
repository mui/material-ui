# Right-to-left

<p class="description">To change the direction of Material-UI components you must follow the following steps.</p>

## Steps

### 1. HTML

Make sure `dir="rtl"` is set on **body**, otherwise native components and portals will break.

### 2. Theme

Set `direction: 'rtl'` on your custom theme.

### 3. jss-rtl

We are relying on a JSS plugin to flip the styles: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Internally, we are dynamically enabling this plugin when `direction: 'rtl'` is set on the theme. The [CSS-in-JS documentation](/customization/css-in-js/#opting-out-of-rtl-transformation) explains a bit more how this plugin is working. Head to the [plugin README](https://github.com/alitaheri/jss-rtl) to know everything about it.

Once you have created a new JSS instance with the plugin, you need to make it available to all components in the component tree. JSS has a [`JssProvider`](https://github.com/cssinjs/react-jss) component for this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

function RTL(props) {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {props.children}
    </JssProvider>
  );
}
```

## Demo

*Use the direction toggle button on the top right corner to flip the whole documentation*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Opting out of rtl transformation

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the begining:

*Use the direction toggle button on the top right corner to see the effect*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}