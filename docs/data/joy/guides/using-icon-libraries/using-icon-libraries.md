# Using icon libraries

<p class="description">Learn how to use your favorite icon library with Joy UI.</p>

## MUI Material Icons

[@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material)
includes the 2,100+ official [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to [SVG Icon](/material-ui/api/svg-icon/) components.

### Installation

This section assumes that you've already installed Joy UI in your app—see [Installation](/joy-ui/getting-started/installation/) for instructions.

#### yarn

```sh
yarn add @mui/icons-material
```

#### npm

```sh
npm install @mui/icons-material
```

### Usage

By default, Joy UI components are able to control an icon's color, font size, and margins when its size or variant changes.

{{"demo": "JoyMaterialIcon.js"}}

### Size

To control the size of the icon, use `fontSize` prop. The value can be one of the keys in `theme.fontSize` (the default value is `"xl"`).

{{"demo": "IconFontSizes.js"}}

## Third-party icons

To use other icon libraries, web font icons, or plain SVG icons with Joy UI, apply the styles with specific CSS variables as shown in the example below:

```jsx
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
// The `GlobalStyles` component is used to create a global style sheet.
// You can replace it with your preferred CSS solution.

function App() {
  return (
    <CssVarsProvider>
      <GlobalStyles styles={{
        // The {selector} is the CSS selector to target the icon.
        // We recommend using a class over a tag if possible.
        '{selector}': {
          color: "var(--Icon-color)",
          margin: "var(--Icon-margin)",
          fontSize: "var(--Icon-fontSize, 20px)",
          width: "1em",
          height: "1em"
        }
      }}>
    </CssVarsProvider>
  )
}
```

Joy UI components can control those variables based on their size and variant to make the icons fit perfectly.

---

Here is a collection of well-known icon libraries that you can use with Joy UI.

### React Icons

- [Browse icons](https://react-icons.github.io/react-icons/search)
- [Installation](https://react-icons.github.io/react-icons)

<iframe src="https://codesandbox.io/embed/joy-ui-react-icons-n6jljq?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark"
     style="width:100%; height:250px; border:0; border-radius: 4px; overflow:hidden;"
     title="joy-ui-react-icons"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Ionicons

- [Browse icons](https://ionic.io/ionicons)
- [Installation](https://ionic.io/ionicons/usage)

<iframe src="https://codesandbox.io/embed/inspiring-visvesvaraya-etcc3x?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark"
     style="width:100%; height:250px; border:0; border-radius: 4px; overflow:hidden;"
     title="inspiring-visvesvaraya-etcc3x"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Heroicons

- [Browse icons](https://heroicons.com/)
- [Installation](https://github.com/tailwindlabs/heroicons#react)

<iframe src="https://codesandbox.io/embed/joy-ui-heroicons-wv2ev1?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark"
     style="width:100%; height:250px; border:0; border-radius: 4px; overflow:hidden;"
     title="joy-ui-heroicons"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Bootstrap Icons

- [Browse icons](https://icons.getbootstrap.com/)
- [Installation](https://icons.getbootstrap.com/#install)

<iframe src="https://codesandbox.io/embed/joy-ui-bootstrap-icons-x8g0cm?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark"
     style="width:100%; height:250px; border:0; border-radius: 4px; overflow:hidden;"
     title="joy-ui-bootstrap"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Font Awesome Icons

- [Browse icons](https://fontawesome.com/icons)
- [Installation](https://fontawesome.com/docs/web/use-with/react/)

<iframe src="https://codesandbox.io/embed/joy-ui-fontawesome-kjbnqj?fontsize=12&hidenavigation=1&module=%2Fdemo.tsx&theme=dark"
     style="width:100%; height:250px; border:0; border-radius: 4px; overflow:hidden;"
     title="joy-ui-fontawesome"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
