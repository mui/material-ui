---
productId: material-ui
title: React Icon Component
components: Icon, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://m2.material.io/design/iconography/system-icons.html
---

# Icons

Guidance and suggestions for using icons with Material UI.

Material UI provides icon support in three ways:

1. With [Material Icons](#material-svg-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Material SVG icons

Google has created over 2,100 official [Material icons](https://fonts.google.com/icons?icon.set=Material+Icons), each in five different "themes" (see below).
For each SVG icon, we export the respective React component from the `@mui/icons-material` package.
You can [search the full list of these icons](/material-ui/material-icons/).

### Installation

Run one of the following commands to install it and save it to your `package.json` dependencies:

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">
```bash npm
npm install @mui/icons-material
```

```bash pnpm
pnpm add @mui/icons-material
```

```bash yarn
yarn add @mui/icons-material
```

</codeblock>

These components use the Material UI `SvgIcon` component to render the SVG path for each icon, and so have a peer-dependency on `@mui/material`.

If you aren't already using Material UI in your project, you can add it following the [installation guide](/material-ui/getting-started/installation/).

### Usage

Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
  import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
  ```

The safest for bundle size is Option 1, but some developers prefer Option 2.
Make sure you read the [minimizing bundle size guide](/material-ui/guides/minimizing-bundle-size/) before using the second approach.

Each Material icon also has a "theme": Filled (default), Outlined, Rounded, Two-tone, and Sharp. To import the icon component with a theme other than the default, append the theme name to the icon name. For example `@mui/icons-material/Delete` icon with:

- Filled theme (default) is exported as `@mui/icons-material/Delete`,
- Outlined theme is exported as `@mui/icons-material/DeleteOutlined`,
- Rounded theme is exported as `@mui/icons-material/DeleteRounded`,
- Twotone theme is exported as `@mui/icons-material/DeleteTwoTone`,
- Sharp theme is exported as `@mui/icons-material/DeleteSharp`.

:::warning
The Material Design guidelines name the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@mui/icons-material` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.
:::

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import FourKIcon from '@mui/icons-material/FourK';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export default function SvgMaterialIcons() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ color: 'text.primary' }}>
        <Grid size={4}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteIcon />
          <DeleteForeverIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Outlined</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteOutlinedIcon />
          <DeleteForeverOutlinedIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Rounded</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteRoundedIcon />
          <DeleteForeverRoundedIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Two Tone</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteTwoToneIcon />
          <DeleteForeverTwoToneIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Sharp</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteSharpIcon />
          <DeleteForeverSharpIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Edge-cases</Typography>
        </Grid>
        <Grid size={8}>
          <ThreeDRotationIcon />
          <FourKIcon />
          <ThreeSixtyIcon />
        </Grid>
      </Grid>
    </Box>
  );
}
```

## SvgIcon

If you need a custom SVG icon (not available in the [Material Icons](/material-ui/material-icons/)) you can use the `SvgIcon` wrapper.
This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material UI components that use icons.
  This can be customized with the `viewBox` attribute.
  To inherit the `viewBox` value from the original image, the `inheritViewBox` prop can be used.
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.
- It supports `<svg>` element as a child so you can copy and paste your SVG directly to `SvgIcon` component.

```tsx
import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function SvgIconChildren() {
  return (
    <SvgIcon>
      {/* credit: cog icon from https://heroicons.com */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    </SvgIcon>
  );
}
```

### Color

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SvgIconsColor() {
  return (
    <Stack direction="row" spacing={3}>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </Stack>
  );
}
```

### Size

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SvgIconsSize() {
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-end' }}>
      <HomeIcon fontSize="small" />
      <HomeIcon />
      <HomeIcon fontSize="large" />
      <HomeIcon sx={{ fontSize: 40 }} />
    </Stack>
  );
}
```

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format.
[svgr](https://github.com/gregberge/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} inheritViewBox />
```

It's also possible to use it with "url-loader" or "file-loader". This is the approach used by Create React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} inheritViewBox />
```

### createSvgIcon

The `createSvgIcon` utility component is used to create the [Material Icons](#material-icons). It can be used to wrap an `<svg>` element or an SVG path which is passed as a child to the [`SvgIcon`](#svgicon) component.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

// or with custom SVG
const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);
```

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

export default function CreateSvgIcon() {
  return (
    <Stack direction="row" spacing={3}>
      <HomeIcon />
      <HomeIcon color="primary" />
      <PlusIcon />
      <PlusIcon color="secondary" />
    </Stack>
  );
}
```

### Font Awesome

If you find that there are layout issues when using FontAwesomeIcon from `@fortawesome/react-fontawesome`, you can try passing the Font Awesome SVG data directly to SvgIcon.

Below is a comparison of the `FontAwesomeIcon` component and a wrapped `SvgIcon` component.

```tsx
import * as React from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

type FontAwesomeSvgIconProps = {
  icon: any;
};

const FontAwesomeSvgIcon = React.forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>(
  (props, ref) => {
    const { icon } = props;

    const {
      icon: [width, height, , , svgPathData],
    } = icon;

    return (
      <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
        {typeof svgPathData === 'string' ? (
          <path d={svgPathData} />
        ) : (
          /**
           * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
           * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
           * of a duotone icon. 40% is the default opacity.
           *
           * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
           */
          svgPathData.map((d: string, i: number) => (
            <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
          ))
        )}
      </SvgIcon>
    );
  },
);

export default function FontAwesomeSvgIconDemo() {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton aria-label="Example">
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
      <IconButton aria-label="Example">
        <FontAwesomeSvgIcon icon={faEllipsisV} />
      </IconButton>
      <Button variant="contained" startIcon={<FontAwesomeIcon icon={faInfo} />}>
        Example
      </Button>
      <Button variant="contained" startIcon={<FontAwesomeSvgIcon icon={faInfo} />}>
        Example
      </Button>
    </Stack>
  );
}
```

FontAwesomeIcon's `fullWidth` prop can also be used to approximate the correct dimensions, but it isn't perfect.

### Other libraries

#### MDI

[materialdesignicons.com](https://pictogrammers.com/library/mdi/) provides over 2,000 icons.
For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component, or with `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

The `Icon` component will display an icon from any icon font that supports ligatures.
As a prerequisite, you must include one, such as the
[Material Icons font](https://google.github.io/material-design-icons/#icon-font-for-the-web) in your project.
To use an icon simply wrap the icon name (font ligature) with the `Icon` component,
for example:

```jsx
import Icon from '@mui/material/Icon';

<Icon>star</Icon>;
```

By default, an Icon will inherit the current text color.
Optionally, you can set the icon color using one of the theme color properties: `primary`, `secondary`, `action`, `error` & `disabled`.

### Font Material Icons

`Icon` will by default set the correct base class name for the Material Icons font (filled variant).
All you need to do is load the font, for instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

export default function Icons() {
  return (
    <Stack direction="row" spacing={3}>
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon sx={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
    </Stack>
  );
}
```

### Custom font

For other fonts, you can customize the baseline class name using the `baseClassName` prop.
For instance, you can display two-tone icons with Material Design:

```jsx
import Icon from '@mui/material/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Import the two tones MD variant                           ^^^^^^^^
/>;
```

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
};

export default function TwoToneIcons() {
  const isDarkMode = useIsDarkMode();

  return (
    <Icon
      sx={[isDarkMode && { filter: 'invert(1)' }]}
      baseClassName="material-icons-two-tone"
    >
      add_circle
    </Icon>
  );
}
```

#### Global base class name

Modifying the `baseClassName` prop for each component usage is repetitive.
You can change the default prop globally with the theme

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Then, you can use the two-tone font directly:

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) can be used with the `Icon` component as follows:

```tsx
import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

export default function FontAwesomeIcon() {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      (document.querySelector('#font-awesome-css') ||
        document.head.firstChild) as HTMLElement,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-end' }}>
      <Icon baseClassName="fas" className="fa-plus-circle" />
      <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        sx={{ color: green[500] }}
      />
      <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
      <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
    </Stack>
  );
}
```

Note that the Font Awesome icons weren't designed like the Material Icons (compare the two previous demos).
The fa icons are cropped to use all the space available. You can adjust for this with a global override:

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

```tsx
import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import MdPhone from '@mui/icons-material/Phone';
import Chip from '@mui/material/Chip';

const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});

export default function FontAwesomeIconSize() {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      (document.querySelector('#font-awesome-css') ||
        document.head.firstChild) as HTMLElement,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <ThemeProvider theme={theme}>
        <Chip icon={<MdPhone />} label="Call me" />
        <Chip icon={<Icon className="fas fa-phone-alt" />} label="Call me" />
      </ThemeProvider>
    </Stack>
  );
}
```

## Font vs. SVGs: Which approach to use?

Both approaches work fine, however, there are some subtle differences, especially in terms of performance and rendering quality.
Whenever possible SVG is preferred as it allows code splitting, supports more icons, and renders faster and better.

For more details, take a look at [why GitHub migrated from font icons to SVG icons](https://github.blog/engineering/delivering-octicons-with-svg/).

## Accessibility

Icons can convey all sorts of meaningful information, so it's important to ensure they are accessible where appropriate.
There are two use cases you'll want to consider:

- **Decorative icons** that are only being used for visual or branding reinforcement.
  If they were removed from the page, users would still understand and be able to use your page.
- **Semantic icons** are ones that you're using to convey meaning, rather than just pure decoration.
  This includes icons without text next to them that are used as interactive controls — buttons, form elements, toggles, etc.

### Decorative icons

If your icons are purely decorative, you're already done!
The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Semantic icons

#### Semantic SVG icons

You should include the `titleAccess` prop with a meaningful value.
The `role="img"` attribute and the `<title>` element are added so that your icons are correctly accessible.

In the case of focusable interactive elements, for example when used with an icon button, you can use the `aria-label` prop:

```jsx
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>;
```

#### Semantic font icons

You need to provide a text alternative that is only visible to assistive technologies.

```jsx
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import { visuallyHidden } from '@mui/utils';

// ...

<Icon>add_circle</Icon>
<Box component="span" sx={visuallyHidden}>Create a user</Box>
```

#### Reference

- https://www.tpgi.com/using-aria-enhance-svg-accessibility/

# Icon API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Icons](https://mui.com/material-ui/icons/)
- [Material Icons](https://mui.com/material-ui/material-icons/)

## Import

```jsx
import Icon from '@mui/material/Icon';
// or
import { Icon } from '@mui/material';
```

## Props

| Name          | Type                                                                                                                       | Default            | Required | Description                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- | --------------------------------------------------------------------------------------- |
| baseClassName | `string`                                                                                                                   | `'material-icons'` | No       |                                                                                         |
| children      | `node`                                                                                                                     | -                  | No       |                                                                                         |
| classes       | `object`                                                                                                                   | -                  | No       | Override or extend the styles applied to the component.                                 |
| color         | `'inherit' \| 'action' \| 'disabled' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'inherit'`        | No       |                                                                                         |
| component     | `elementType`                                                                                                              | -                  | No       |                                                                                         |
| fontSize      | `'inherit' \| 'large' \| 'medium' \| 'small' \| string`                                                                    | `'medium'`         | No       |                                                                                         |
| sx            | `Array<func \| object \| bool> \| func \| object`                                                                          | -                  | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiIcon` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name       | Description                                                 |
| ------------ | --------------- | ----------------------------------------------------------- |
| -            | colorAction     | Styles applied to the root element if `color="action"`.     |
| -            | colorDisabled   | Styles applied to the root element if `color="disabled"`.   |
| -            | colorError      | Styles applied to the root element if `color="error"`.      |
| -            | colorPrimary    | Styles applied to the root element if `color="primary"`.    |
| -            | colorSecondary  | Styles applied to the root element if `color="secondary"`.  |
| -            | fontSizeInherit | Styles applied to the root element if `fontSize="inherit"`. |
| -            | fontSizeLarge   | Styles applied to the root element if `fontSize="large"`.   |
| -            | fontSizeSmall   | Styles applied to the root element if `fontSize="small"`.   |
| -            | root            | Styles applied to the root element.                         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Icon/Icon.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Icon/Icon.js)

# SvgIcon API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Icons](https://mui.com/material-ui/icons/)
- [Material Icons](https://mui.com/material-ui/material-icons/)

## Import

```jsx
import SvgIcon from '@mui/material/SvgIcon';
// or
import { SvgIcon } from '@mui/material';
```

## Props

| Name           | Type                                                                                                                       | Default       | Required | Description                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- | --------------------------------------------------------------------------------------- |
| children       | `node`                                                                                                                     | -             | No       |                                                                                         |
| classes        | `object`                                                                                                                   | -             | No       | Override or extend the styles applied to the component.                                 |
| color          | `'inherit' \| 'action' \| 'disabled' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'inherit'`   | No       |                                                                                         |
| component      | `elementType`                                                                                                              | -             | No       |                                                                                         |
| fontSize       | `'inherit' \| 'large' \| 'medium' \| 'small' \| string`                                                                    | `'medium'`    | No       |                                                                                         |
| htmlColor      | `string`                                                                                                                   | -             | No       |                                                                                         |
| inheritViewBox | `bool`                                                                                                                     | `false`       | No       |                                                                                         |
| shapeRendering | `string`                                                                                                                   | -             | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object`                                                                          | -             | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| titleAccess    | `string`                                                                                                                   | -             | No       |                                                                                         |
| viewBox        | `string`                                                                                                                   | `'0 0 24 24'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (SVGSVGElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSvgIcon` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name       | Description                                                 |
| ------------ | --------------- | ----------------------------------------------------------- |
| -            | colorAction     | Styles applied to the root element if `color="action"`.     |
| -            | colorDisabled   | Styles applied to the root element if `color="disabled"`.   |
| -            | colorError      | Styles applied to the root element if `color="error"`.      |
| -            | colorPrimary    | Styles applied to the root element if `color="primary"`.    |
| -            | colorSecondary  | Styles applied to the root element if `color="secondary"`.  |
| -            | fontSizeInherit | Styles applied to the root element if `fontSize="inherit"`. |
| -            | fontSizeLarge   | Styles applied to the root element if `fontSize="large"`.   |
| -            | fontSizeMedium  | Styles applied to the root element if `fontSize="medium"`.  |
| -            | fontSizeSmall   | Styles applied to the root element if `fontSize="small"`.   |
| -            | root            | Styles applied to the root element.                         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/SvgIcon/SvgIcon.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/SvgIcon/SvgIcon.js)
