---
productId: material-ui
components: Link
githubLabel: 'scope: link'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/link/
githubSource: packages/mui-material/src/Link
---

# Links

The Link component allows you to easily customize anchor elements with your theme colors and typography styles.

## Basic links

The Link component is built on top of the [Typography](/material-ui/api/typography/) component, meaning that you can use its props.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function Links() {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link href="#">Link</Link>
      <Link href="#" color="inherit">
        {'color="inherit"'}
      </Link>
      <Link href="#" variant="body2">
        {'variant="body2"'}
      </Link>
    </Box>
  );
}
```

However, the Link component has some different default props than the Typography component:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Underline

The `underline` prop can be used to set the underline behavior. The default is `always`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function UnderlineLink() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link href="#" underline="none">
        {'underline="none"'}
      </Link>
      <Link href="#" underline="hover">
        {'underline="hover"'}
      </Link>
      <Link href="#" underline="always">
        {'underline="always"'}
      </Link>
    </Box>
  );
}
```

## Security

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process.
  Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the _Referer_ header from being sent to the new page.
  ⚠️ Removing the referrer header will affect analytics.

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `Link` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/#link).

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/link/)

- When providing the content for the link, avoid generic descriptions like "click here" or "go to".
  Instead, use [specific descriptions](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- For the best user experience, links should stand out from the text on the page. For instance, you can keep the default `underline="always"` behavior.
- If a link doesn't have a meaningful href, [it should be rendered using a `<button>` element](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md).
  The demo below illustrates how to properly link with a `<button>`:

```tsx
import * as React from 'react';
import Link from '@mui/material/Link';

export default function ButtonLink() {
  return (
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Button Link
    </Link>
  );
}
```

### Keyboard accessibility

- Interactive elements should receive focus in a coherent order when the user presses the <kbd class="key">Tab</kbd> key.
- Users should be able to open a link by pressing <kbd class="key">Enter</kbd>.

### Screen reader accessibility

- When a link receives focus, screen readers should announce a descriptive link name.
  If the link opens in a new window or browser tab, add an [`aria-label`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8) to inform screen reader users—for example, _"To learn more, visit the About page which opens in a new window."_

# Link API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)
- [Links](https://mui.com/material-ui/react-link/)

## Import

```jsx
import Link from '@mui/material/Link';
// or
import { Link } from '@mui/material';
```

## Props

| Name              | Type                                                                                                                                                             | Default     | Required | Description                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------- |
| children          | `node`                                                                                                                                                           | -           | No       |                                                                                         |
| classes           | `object`                                                                                                                                                         | -           | No       | Override or extend the styles applied to the component.                                 |
| color             | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning' \| 'textPrimary' \| 'textSecondary' \| 'textDisabled' \| string`                        | `'primary'` | No       |                                                                                         |
| component         | `element type`                                                                                                                                                   | -           | No       |                                                                                         |
| sx                | `Array<func \| object \| bool> \| func \| object`                                                                                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| TypographyClasses | `object`                                                                                                                                                         | -           | No       |                                                                                         |
| underline         | `'always' \| 'hover' \| 'none'`                                                                                                                                  | `'always'`  | No       |                                                                                         |
| variant           | `'body1' \| 'body2' \| 'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'overline' \| 'subtitle1' \| 'subtitle2' \| string` | `'inherit'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLAnchorElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on Link.

## Theme default props

You can use `MuiLink` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name       | Description                                                              |
| ------------------- | --------------- | ------------------------------------------------------------------------ |
| -                   | button          | Styles applied to the root element if `component="button"`.              |
| `.Mui-focusVisible` | -               | State class applied to the root element if the link is keyboard focused. |
| -                   | root            | Styles applied to the root element.                                      |
| -                   | underlineAlways | Styles applied to the root element if `underline="always"`.              |
| -                   | underlineHover  | Styles applied to the root element if `underline="hover"`.               |
| -                   | underlineNone   | Styles applied to the root element if `underline="none"`.                |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Link/Link.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Link/Link.js)
