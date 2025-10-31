---
productId: material-ui
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'scope: alert'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
githubSource: packages/mui-material/src/Alert
---

# Alert

Alerts display brief messages for the user without interrupting their use of the app.

## Introduction

Alerts give users brief and potentially time-sensitive information in an unobtrusive manner.

The Material UI Alert component includes several props for quickly customizing its styles to provide immediate visual cues about its contents.

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>
  );
}
```

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

### Usage

A key trait of the alert pattern is that [it should not interrupt the user's experience](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) of the app.
Alerts should not be confused with alert _dialogs_ ([ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)), which _are_ intended to interrupt the user to obtain a response.
Use the Material UI [Dialog](/material-ui/react-dialog/) component if you need this behavior.

## Basics

```jsx
import Alert from '@mui/material/Alert';
```

The Alert component wraps around its content, and stretches to fill its enclosing container.

### Severity

The `severity` prop accepts four values representing different states—`success` (the default), `info`, `warning`, and `error`–with corresponding icon and color combinations for each:

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert>
    </Stack>
  );
}
```

### Variants

The Alert component comes with two alternative style options—`filled` and `outlined`—which you can set using the `variant` prop.

#### Filled

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function FilledAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
      <Alert variant="filled" severity="info">
        This is a filled info Alert.
      </Alert>
      <Alert variant="filled" severity="warning">
        This is a filled warning Alert.
      </Alert>
      <Alert variant="filled" severity="error">
        This is a filled error Alert.
      </Alert>
    </Stack>
  );
}
```

#### Outlined

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function OutlinedAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="success">
        This is an outlined success Alert.
      </Alert>
      <Alert variant="outlined" severity="info">
        This is an outlined info Alert.
      </Alert>
      <Alert variant="outlined" severity="warning">
        This is an outlined warning Alert.
      </Alert>
      <Alert variant="outlined" severity="error">
        This is an outlined error Alert.
      </Alert>
    </Stack>
  );
}
```

:::warning
When using an outlined Alert with the [Snackbar](/material-ui/react-snackbar/) component, background content will be visible and bleed through the Alert by default.
You can prevent this by adding `bgcolor: 'background.paper'` to [the `sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) on the Alert component:

```jsx
<Alert sx={{ bgcolor: 'background.paper' }} />
```

Check out the [Snackbar—customization](/material-ui/react-snackbar/#customization) doc for an example of how to use these two components together.
:::

### Color

Use the `color` prop to override the default color for the specified [`severity`](#severity)—for instance, to apply `warning` colors to a `success` Alert:

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts() {
  return (
    <Alert severity="success" color="warning">
      This is a success Alert with warning colors.
    </Alert>
  );
}
```

### Actions

Add an action to your Alert with the `action` prop.
This lets you insert any element—an HTML tag, an SVG icon, or a React component such as a Material UI Button—after the Alert's message, justified to the right.

If you provide an `onClose` callback to the Alert without setting the `action` prop, the component will display a close icon (&#x2715;) by default.

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning" onClose={() => {}}>
        This Alert displays the default close icon.
      </Alert>
      <Alert
        severity="success"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This Alert uses a Button component for its action.
      </Alert>
    </Stack>
  );
}
```

### Icons

Use the `icon` prop to override an Alert's icon.
As with the [`action`](#actions) prop, your `icon` can be an HTML element, an SVG icon, or a React component.
Set this prop to `false` to remove the icon altogether.

If you need to override all instances of an icon for a given [`severity`](#severity), you can use the `iconMapping` prop instead.
You can define this prop globally by customizing your app's theme. See [Theme components—Default props](/material-ui/customization/theme-components/#theme-default-props) for details.

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

export default function IconAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        This success Alert has a custom icon.
      </Alert>
      <Alert icon={false} severity="success">
        This success Alert has no icon.
      </Alert>
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        This success Alert uses `iconMapping` to override the default icon.
      </Alert>
    </Stack>
  );
}
```

## Customization

### Titles

To add a title to an Alert, import the Alert Title component:

```jsx
import AlertTitle from '@mui/material/AlertTitle';
```

You can nest this component above the message in your Alert for a neatly styled and properly aligned title, as shown below:

```tsx
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info Alert with an informative title.
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert with a cautious title.
      </Alert>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>
    </Stack>
  );
}
```

### Transitions

You can use [Transition components](/material-ui/transitions/) like [Collapse](/material-ui/transitions/#collapse) to add motion to an Alert's entrance and exit.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Click the close icon to see the Collapse transition in action!
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button>
    </Box>
  );
}
```

## Accessibility

Here are some factors to consider to ensure that your Alert is accessible:

- Because alerts are not intended to interfere with the use of the app, your Alert component should _never_ affect the keyboard focus.
- If an alert contains an action, that action must have a `tabindex` of `0` so it can be reached by keyboard-only users.
- Essential alerts should not disappear automatically—[timed interactions](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html) can make your app inaccessible to users who need extra time to understand or locate the alert.
- Alerts that occur too frequently can [inhibit the usability](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html) of your app.
- Dynamically rendered alerts are announced by screen readers; alerts that are already present on the page when it loads are _not_ announced.
- Color does not add meaning to the UI for users who require assistive technology. You must ensure that any information conveyed through color is also denoted in other ways, such as within the text of the alert itself, or with additional hidden text that's read by screen readers.

## Anatomy

The Alert component is composed of a root [Paper](/material-ui/react-paper/) component (which renders as a `<div>`) that houses an icon, a message, and an optional [action](#actions):

```html
<div class="MuiPaper-root MuiAlert-root" role="alert">
  <div class="MuiAlert-icon">
    <!-- svg icon here -->
  </div>
  <div class="MuiAlert-message">This is how an Alert renders in the DOM.</div>
  <div class="MuiAlert-action">
    <!-- optional action element here -->
  </div>
</div>
```

# Alert API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Alert](https://mui.com/material-ui/react-alert/)

## Import

```jsx
import Alert from '@mui/material/Alert';
// or
import { Alert } from '@mui/material';
```

## Props

| Name                         | Type                                                                                                                                                            | Default      | Required | Description                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action                       | `node`                                                                                                                                                          | -            | No       |                                                                                                                                                                                                                         |
| children                     | `node`                                                                                                                                                          | -            | No       |                                                                                                                                                                                                                         |
| classes                      | `object`                                                                                                                                                        | -            | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| closeText                    | `string`                                                                                                                                                        | `'Close'`    | No       |                                                                                                                                                                                                                         |
| color                        | `'error' \| 'info' \| 'success' \| 'warning' \| string`                                                                                                         | -            | No       |                                                                                                                                                                                                                         |
| components (deprecated)      | `{ CloseButton?: elementType, CloseIcon?: elementType }`                                                                                                        | `{}`         | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| componentsProps (deprecated) | `{ closeButton?: object, closeIcon?: object }`                                                                                                                  | `{}`         | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| icon                         | `node`                                                                                                                                                          | -            | No       |                                                                                                                                                                                                                         |
| iconMapping                  | `{ error?: node, info?: node, success?: node, warning?: node }`                                                                                                 | -            | No       |                                                                                                                                                                                                                         |
| onClose                      | `function(event: React.SyntheticEvent) => void`                                                                                                                 | -            | No       |                                                                                                                                                                                                                         |
| role                         | `string`                                                                                                                                                        | `'alert'`    | No       |                                                                                                                                                                                                                         |
| severity                     | `'error' \| 'info' \| 'success' \| 'warning' \| string`                                                                                                         | `'success'`  | No       |                                                                                                                                                                                                                         |
| slotProps                    | `{ action?: func \| object, closeButton?: func \| object, closeIcon?: func \| object, icon?: func \| object, message?: func \| object, root?: func \| object }` | `{}`         | No       |                                                                                                                                                                                                                         |
| slots                        | `{ action?: elementType, closeButton?: elementType, closeIcon?: elementType, icon?: elementType, message?: elementType, root?: elementType }`                   | `{}`         | No       |                                                                                                                                                                                                                         |
| sx                           | `Array<func \| object \| bool> \| func \| object`                                                                                                               | -            | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| variant                      | `'filled' \| 'outlined' \| 'standard' \| string`                                                                                                                | `'standard'` | No       |                                                                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/)).

## Inheritance

While not explicitly documented above, the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on Alert.

## Theme default props

You can use `MuiAlert` to change the default props of this component with the theme.

## Slots

| Name        | Default      | Class               | Description                                  |
| ----------- | ------------ | ------------------- | -------------------------------------------- |
| root        | `Paper`      | `.MuiAlert-root`    | The component that renders the root slot.    |
| icon        | `div`        | `.MuiAlert-icon`    | The component that renders the icon slot.    |
| message     | `div`        | `.MuiAlert-message` | The component that renders the message slot. |
| action      | `div`        | `.MuiAlert-action`  | The component that renders the action slot.  |
| closeButton | `IconButton` | -                   | The component that renders the close button. |
| closeIcon   | `svg`        | -                   | The component that renders the close icon.   |

## CSS

### Rule name

| Global class | Rule name       | Description                                                                       |
| ------------ | --------------- | --------------------------------------------------------------------------------- |
| -            | colorError      | Styles applied to the root element if `color="error"`.                            |
| -            | colorInfo       | Styles applied to the root element if `color="info"`.                             |
| -            | colorSuccess    | Styles applied to the root element if `color="success"`.                          |
| -            | colorWarning    | Styles applied to the root element if `color="warning"`.                          |
| -            | filled          | Styles applied to the root element if `variant="filled"`.                         |
| -            | filledError     | Styles applied to the root element if `variant="filled"` and `color="error"`.     |
| -            | filledInfo      | Styles applied to the root element if `variant="filled"` and `color="info"`.      |
| -            | filledSuccess   | Styles applied to the root element if `variant="filled"` and `color="success"`.   |
| -            | filledWarning   | Styles applied to the root element if `variant="filled"` and `color="warning"`    |
| -            | outlined        | Styles applied to the root element if `variant="outlined"`.                       |
| -            | outlinedError   | Styles applied to the root element if `variant="outlined"` and `color="error"`.   |
| -            | outlinedInfo    | Styles applied to the root element if `variant="outlined"` and `color="info"`.    |
| -            | outlinedSuccess | Styles applied to the root element if `variant="outlined"` and `color="success"`. |
| -            | outlinedWarning | Styles applied to the root element if `variant="outlined"` and `color="warning"`. |
| -            | standard        | Styles applied to the root element if `variant="standard"`.                       |
| -            | standardError   | Styles applied to the root element if `variant="standard"` and `color="error"`.   |
| -            | standardInfo    | Styles applied to the root element if `variant="standard"` and `color="info"`.    |
| -            | standardSuccess | Styles applied to the root element if `variant="standard"` and `color="success"`. |
| -            | standardWarning | Styles applied to the root element if `variant="standard"` and `color="warning"`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Alert/Alert.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Alert/Alert.js)

# AlertTitle API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Alert](https://mui.com/material-ui/react-alert/)

## Import

```jsx
import AlertTitle from '@mui/material/AlertTitle';
// or
import { AlertTitle } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on AlertTitle.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/AlertTitle/AlertTitle.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/AlertTitle/AlertTitle.js)
