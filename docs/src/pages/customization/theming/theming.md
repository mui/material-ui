# Theming

<p class="description">Customize Material-UI with your theme. You can change the colors, the typography and much more.</p>

The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

To promote greater consistency between apps, light and dark theme types are available to choose from. By default, components use the light theme type.

## Theme provider

If you wish to customize the theme, you need to use the `ThemeProvider` component in order to inject a theme into your application.
However, this is optional; Material-UI components come with a default theme.

`ThemeProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize.
You can learn more about this in [the API section](/styles/api/#themeprovider).

## Theme configuration variables

Changing the theme configuration variables is the most effective way to match Material-UI to your needs.
The following sections cover the most important theme variables:

- [Palette](/customization/palette/)
- [Typography](/customization/typography/)
- [Spacing](/customization/spacing/)
- [Breakpoints](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globals](/customization/globals/)

You can check out the [default theme section](/customization/default-theme/) to view the default theme in full.

### Custom variables

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere.
For instance:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accessing the theme in a component

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Nesting the theme

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

The inner theme will **override** the outer theme.
You can extend the outer theme by providing a function:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### A note on performance

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes.
The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options, ...args) => theme`

Generate a theme base on the options received.

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Examples

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Arguments

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

  - `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
  - `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line
    heights are preserved and align to Material Design's 4px line height grid.
    This requires a unitless line height in the theme's styles.
  - `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens.
  The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
  - `variants` (*Array\<String\>* [optional]): Default to all. The typography variants to handle.

#### Returns

`theme` (*Object*): The new theme with a responsive typography.

#### Examples

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

##### `component` prop

The component used in the `component` prop of the following components need to forward their ref:

- [`Collapse`](/api/collapse/)

Otherwise you'll encounter `Error: Function component cannot be given refs`.
See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

##### `children` prop

The `children` of the following components need to forward their ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Otherwise the component will not animate properly and you'll encounter the warning that `Function components cannot be given refs`.

#### Disable StrictMode compatibility partially

If you still see `Error: Function component cannot be given refs` then you're probably using a third-party component for which the previously mentioned fixes aren't applicable.
You can fix this by applying `disableStrictModeCompat`. You'll see deprecation warnings again but these are only warnings while
`Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Examples

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```
