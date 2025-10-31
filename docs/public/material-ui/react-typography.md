---
productId: material-ui
title: React Typography component
components: Typography
githubLabel: 'scope: typography'
materialDesign: https://m2.material.io/design/typography/the-type-system.html
githubSource: packages/mui-material/src/Typography
---

# Typography

Use typography to present your design and content as clearly and efficiently as possible.

## Roboto font

Material UI uses the [Roboto](https://fonts.google.com/specimen/Roboto) font by default.
Add it to your project via Fontsource, or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/roboto
```

```bash pnpm
pnpm add @fontsource/roboto
```

```bash yarn
yarn add @fontsource/roboto
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

:::info
Fontsource can be configured to load specific subsets, weights, and styles. Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
:::

### Google Web Fonts

To install Roboto through the Google Web Fonts CDN, add the following code inside your project's `<head />` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
```

## Component

### Usage

The Typography component follows the [Material Design typographic scale](https://m2.material.io/design/typography/#type-scale) that provides a limited set of type sizes that work well together for a consistent layout.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Types() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
        button text
      </Typography>
      <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
        caption text
      </Typography>
      <Typography variant="overline" gutterBottom sx={{ display: 'block' }}>
        overline text
      </Typography>
    </Box>
  );
}
```

### Theme keys

In some situations you might not be able to use the Typography component.
Hopefully, you might be able to take advantage of the [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) keys of the theme.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TypographyTheme() {
  return <Div>{"This div's text looks like that of a button."}</Div>;
}
```

## Customization

### Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/material-ui/customization/typography/#adding-amp-disabling-variants) page for more info.

### Changing the semantic element

The Typography component uses the `variantMapping` prop to associate a UI variant with a semantic element.
It's important to realize that the style of a typography component is independent from the semantic underlying element.

To change the underlying element for a one-off situation, like avoiding two `h1` elements in your page, use the `component` prop:

```jsx
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>
```

To change the typography element mapping globally, [use the theme](/material-ui/customization/typography/#adding-amp-disabling-variants):

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
```

### System props

:::info
System props are deprecated and will be removed in the next major release. Please use the `sx` prop instead.

```diff
- <Typography mt={2} />
+ <Typography sx={{ mt: 2 }} />
```

:::

## Accessibility

Key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/material-ui/customization/typography/#font-size), instead of pixels, to accommodate the user's browser settings.
- **Heading hierarchy**. Based on [the W3 guidelines](https://www.w3.org/WAI/tutorials/page-structure/headings/), don't skip heading levels. Make sure to [separate the semantics from the style](#changing-the-semantic-element).

# Typography API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)
- [Typography](https://mui.com/material-ui/react-typography/)

## Import

```jsx
import Typography from '@mui/material/Typography';
// or
import { Typography } from '@mui/material';
```

## Props

| Name                   | Type                                                                                                                                                             | Default     | Required | Description                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align                  | `'center' \| 'inherit' \| 'justify' \| 'left' \| 'right'`                                                                                                        | `'inherit'` | No       |                                                                                                                                                                                                                         |
| children               | `node`                                                                                                                                                           | -           | No       |                                                                                                                                                                                                                         |
| classes                | `object`                                                                                                                                                         | -           | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| color                  | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning' \| 'textPrimary' \| 'textSecondary' \| 'textDisabled' \| string`                        | -           | No       |                                                                                                                                                                                                                         |
| component              | `elementType`                                                                                                                                                    | -           | No       |                                                                                                                                                                                                                         |
| gutterBottom           | `bool`                                                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                         |
| noWrap                 | `bool`                                                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                         |
| paragraph (deprecated) | `bool`                                                                                                                                                           | `false`     | No       | ⚠️ Use the `component` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| sx                     | `Array<func \| object \| bool> \| func \| object`                                                                                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| variant                | `'body1' \| 'body2' \| 'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'overline' \| 'subtitle1' \| 'subtitle2' \| string` | `'body1'`   | No       |                                                                                                                                                                                                                         |
| variantMapping         | `object`                                                                                                                                                         | `{          |

h1: 'h1',
h2: 'h2',
h3: 'h3',
h4: 'h4',
h5: 'h5',
h6: 'h6',
subtitle1: 'h6',
subtitle2: 'h6',
body1: 'p',
body2: 'p',
inherit: 'p',
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLParagraphElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTypography` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                  |
| ------------ | ------------ | ------------------------------------------------------------ |
| -            | alignCenter  | Styles applied to the root element if `align="center"`.      |
| -            | alignJustify | Styles applied to the root element if `align="justify"`.     |
| -            | alignLeft    | Styles applied to the root element if `align="left"`.        |
| -            | alignRight   | Styles applied to the root element if `align="right"`.       |
| -            | body1        | Styles applied to the root element if `variant="body1"`.     |
| -            | body2        | Styles applied to the root element if `variant="body2"`.     |
| -            | button       | Styles applied to the root element if `variant="button"`.    |
| -            | caption      | Styles applied to the root element if `variant="caption"`.   |
| -            | gutterBottom | Styles applied to the root element if `gutterBottom={true}`. |
| -            | h1           | Styles applied to the root element if `variant="h1"`.        |
| -            | h2           | Styles applied to the root element if `variant="h2"`.        |
| -            | h3           | Styles applied to the root element if `variant="h3"`.        |
| -            | h4           | Styles applied to the root element if `variant="h4"`.        |
| -            | h5           | Styles applied to the root element if `variant="h5"`.        |
| -            | h6           | Styles applied to the root element if `variant="h6"`.        |
| -            | inherit      | Styles applied to the root element if `variant="inherit"`.   |
| -            | noWrap       | Styles applied to the root element if `nowrap={true}`.       |
| -            | overline     | Styles applied to the root element if `variant="overline"`.  |
| -            | paragraph    | Styles applied to the root element if `paragraph={true}`.    |
| -            | root         | Styles applied to the root element.                          |
| -            | subtitle1    | Styles applied to the root element if `variant="subtitle1"`. |
| -            | subtitle2    | Styles applied to the root element if `variant="subtitle2"`. |

> **Note**: As a CSS utility, the `Typography` component also supports all system properties. You can use them as props directly on the component.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Typography/Typography.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Typography/Typography.js)
