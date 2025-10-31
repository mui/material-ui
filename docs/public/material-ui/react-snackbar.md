---
productId: material-ui
title: React Snackbar component
components: Snackbar, SnackbarContent
githubLabel: 'scope: snackbar'
materialDesign: https://m2.material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
githubSource: packages/mui-material/src/Snackbar
---

# Snackbar

Snackbars (also known as toasts) are used for brief notifications of processes that have been or will be performed.

## Introduction

The Snackbar component appears temporarily and floats above the UI to provide users with (non-critical) updates on an app's processes.
The demo below, inspired by Google Keep, shows a basic Snackbar with a text element and two actions:

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}
```

### Usage

Snackbars differ from [Alerts](/material-ui/react-alert/) in that Snackbars have a fixed position and a high z-index, so they're intended to break out of the document flow; Alerts, on the other hand, are usually part of the flow—except when they're [used as children of a Snackbar](#use-with-alerts).

Snackbars also differ from [Dialogs](/material-ui/react-dialog/) in that Snackbars are not intended to convey _critical_ information or block the user from interacting with the rest of the app; Dialogs, by contrast, require input from the user in order to be dismissed.

## Basics

### Import

```jsx
import Snackbar from '@mui/material/Snackbar';
```

### Position

Use the `anchorOrigin` prop to control the Snackbar's position on the screen.

```tsx
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
          Top-Center
        </Button>
      </Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={6}>
          <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>
            Top-Left
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }} size={6}>
          <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
            Top-Right
          </Button>
        </Grid>
        <Grid size={6}>
          <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>
            Bottom-Left
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }} size={6}>
          <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
            Bottom-Right
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
          Bottom-Center
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </Box>
  );
}
```

### Content

```jsx
import SnackbarContent from '@mui/material/SnackbarContent';
```

Use the Snackbar Content component to add text and actions to the Snackbar.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

export default function LongTextSnackbar() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <SnackbarContent message="I love snacks." action={action} />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
      />
      <SnackbarContent
        message="I love candy. I love cookies. I love cupcakes."
        action={action}
      />
      <SnackbarContent
        message={
          'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'
        }
        action={action}
      />
    </Stack>
  );
}
```

### Automatic dismiss

Use the `autoHideDuration` prop to automatically trigger the Snackbar's `onClose` function after a set period of time (in milliseconds).

Make sure to [provide sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) for the user to process the information displayed on it.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function AutohideSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="This Snackbar will be dismissed in 5 seconds."
      />
    </div>
  );
}
```

### Transitions

You can use the `TransitionComponent` prop to change the transition of the Snackbar from [Grow](/material-ui/transitions/#grow) (the default) to others such as [Slide](/material-ui/transitions/#slide).

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

export default function TransitionsSnackbar() {
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >,
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
      <Button onClick={handleClick(Fade)}>Fade Transition</Button>
      <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        slots={{ transition: state.Transition }}
        message="I love snacks"
        key={state.Transition.name}
        autoHideDuration={1200}
      />
    </div>
  );
}
```

## Customization

### Preventing default click away event

If you would like to prevent the default onClickAway behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Snackbar
  slotProps={{
    clickAwayListener: {
      onClickAway: (event) => {
        // Prevent's default 'onClickAway' behavior.
        event.defaultMuiPrevented = true;
      },
    },
  }}
/>
```

### Use with Alerts

Use an Alert inside a Snackbar for messages that communicate a certain severity.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
}
```

### Use with Floating Action Buttons

If you're using a [Floating Action Button](/material-ui/react-floating-action-button/) on mobile, Material Design recommends positioning snackbars directly above it, as shown in the demo below:

```tsx
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';

export default function FabIntegrationSnackbar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              App bar
            </Typography>
          </Toolbar>
        </AppBar>
        <Fab
          color="secondary"
          sx={(theme) => ({
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          })}
        >
          <AddIcon />
        </Fab>
        <Snackbar
          open
          autoHideDuration={6000}
          message="Archived"
          action={
            <Button color="inherit" size="small">
              Undo
            </Button>
          }
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      </div>
    </React.Fragment>
  );
}
```

## Common examples

### Consecutive Snackbars

This demo shows how to display multiple Snackbars without stacking them by using a consecutive animation.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface SnackbarMessage {
  message: string;
  key: number;
}

export default function ConsecutiveSnackbars() {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Button onClick={handleClick('Message A')}>Show message A</Button>
      <Button onClick={handleClick('Message B')}>Show message B</Button>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        slotProps={{ transition: { onExited: handleExited } }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
```

## Supplementary components

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

With an imperative API, [notistack](https://github.com/iamhosseindhv/notistack) lets you vertically stack multiple Snackbars without having to handle their open and close states.
Even though this is discouraged in the Material Design guidelines, it is still a common pattern.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
```

:::warning
Note that notistack prevents Snackbars from being [closed by pressing <kbd class="key">Escape</kbd>](#accessibility).
:::

## Accessibility

The user should be able to dismiss Snackbars by pressing <kbd class="key">Escape</kbd>. If there are multiple instances appearing at the same time and you want <kbd class="key">Escape</kbd> to dismiss only the oldest one that's currently open, call `event.preventDefault` in the `onClose` prop.

```jsx
export default function MyComponent() {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={(event, reason) => {
          // `reason === 'escapeKeyDown'` if `Escape` was pressed
          setOpen(false);
          // call `event.preventDefault` to only close one Snackbar at a time.
        }}
      />
      <Snackbar open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
```

## Anatomy

The Snackbar component is composed of a root `<div>` that houses interior elements like the Snackbar Content and other optional components (such as buttons or decorators).

```html
<div role="presentation" class="MuiSnackbar-root">
  <div class="MuiPaper-root MuiSnackbarContent-root" role="alert">
    <div class="MuiSnackbarContent-message">
      <!-- Snackbar content goes here -->
    </div>
  </div>
</div>
```

# Snackbar API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Snackbar](https://mui.com/material-ui/react-snackbar/)

## Import

```jsx
import Snackbar from '@mui/material/Snackbar';
// or
import { Snackbar } from '@mui/material';
```

## Props

| Name                                | Type                                                                                                                   | Default                                      | Required | Description                                                                                                                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action                              | `node`                                                                                                                 | -                                            | No       |                                                                                                                                                                                                                                  |
| anchorOrigin                        | `{ horizontal: 'center' \| 'left' \| 'right', vertical: 'bottom' \| 'top' }`                                           | `{ vertical: 'bottom', horizontal: 'left' }` | No       |                                                                                                                                                                                                                                  |
| autoHideDuration                    | `number`                                                                                                               | `null`                                       | No       |                                                                                                                                                                                                                                  |
| children                            | `element`                                                                                                              | -                                            | No       |                                                                                                                                                                                                                                  |
| classes                             | `object`                                                                                                               | -                                            | No       | Override or extend the styles applied to the component.                                                                                                                                                                          |
| ClickAwayListenerProps (deprecated) | `object`                                                                                                               | -                                            | No       | ⚠️ Use `slotProps.clickAwayListener` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| ContentProps (deprecated)           | `object`                                                                                                               | -                                            | No       | ⚠️ Use `slotProps.content` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.           |
| disableWindowBlurListener           | `bool`                                                                                                                 | `false`                                      | No       |                                                                                                                                                                                                                                  |
| key                                 | `any`                                                                                                                  | -                                            | No       |                                                                                                                                                                                                                                  |
| message                             | `node`                                                                                                                 | -                                            | No       |                                                                                                                                                                                                                                  |
| onClose                             | `function(event: React.SyntheticEvent<any> \| Event, reason: string) => void`                                          | -                                            | No       |                                                                                                                                                                                                                                  |
| open                                | `bool`                                                                                                                 | -                                            | No       |                                                                                                                                                                                                                                  |
| resumeHideDuration                  | `number`                                                                                                               | -                                            | No       |                                                                                                                                                                                                                                  |
| slotProps                           | `{ clickAwayListener?: func \| object, content?: func \| object, root?: func \| object, transition?: func \| object }` | `{}`                                         | No       |                                                                                                                                                                                                                                  |
| slots                               | `{ clickAwayListener?: elementType, content?: elementType, root?: elementType, transition?: elementType }`             | `{}`                                         | No       |                                                                                                                                                                                                                                  |
| sx                                  | `Array<func \| object \| bool> \| func \| object`                                                                      | -                                            | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                          |
| TransitionComponent (deprecated)    | `elementType`                                                                                                          | `Grow`                                       | No       | ⚠️ Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.            |
| transitionDuration                  | `number \| { appear?: number, enter?: number, exit?: number }`                                                         | `{                                           |

enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}`| No |  |
| TransitionProps (deprecated) |`object`|`{}`| No | ⚠️ Use`slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSnackbar` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                             | Default             | Class               | Description                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------- | ------------------------------------------------------ |
| root                                                                                                                             | `'div'`             | `.MuiSnackbar-root` | The component that renders the root slot.              |
| content                                                                                                                          | `SnackbarContent`   | -                   | The component that renders the content slot.           |
| clickAwayListener                                                                                                                | `ClickAwayListener` | -                   | The component that renders the clickAwayListener slot. |
| transition                                                                                                                       | `Grow`              | -                   | The component that renders the transition.             |
| [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |

## CSS

### Rule name

| Global class | Rule name                | Description                                                                    |
| ------------ | ------------------------ | ------------------------------------------------------------------------------ |
| -            | anchorOriginBottomCenter | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. |
| -            | anchorOriginBottomLeft   | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`.   |
| -            | anchorOriginBottomRight  | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`.  |
| -            | anchorOriginTopCenter    | Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`.    |
| -            | anchorOriginTopLeft      | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`.      |
| -            | anchorOriginTopRight     | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`.     |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Snackbar/Snackbar.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Snackbar/Snackbar.js)

# SnackbarContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Snackbar](https://mui.com/material-ui/react-snackbar/)

## Import

```jsx
import SnackbarContent from '@mui/material/SnackbarContent';
// or
import { SnackbarContent } from '@mui/material';
```

## Props

| Name    | Type                                              | Default   | Required | Description                                                                             |
| ------- | ------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------------------- |
| action  | `node`                                            | -         | No       |                                                                                         |
| classes | `object`                                          | -         | No       | Override or extend the styles applied to the component.                                 |
| message | `node`                                            | -         | No       |                                                                                         |
| role    | `string`                                          | `'alert'` | No       |                                                                                         |
| sx      | `Array<func \| object \| bool> \| func \| object` | -         | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/)).

## Inheritance

While not explicitly documented above, the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on SnackbarContent.

## Theme default props

You can use `MuiSnackbarContent` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                           |
| ------------ | --------- | --------------------------------------------------------------------- |
| -            | action    | Styles applied to the action wrapper element if `action` is provided. |
| -            | message   | Styles applied to the message wrapper element.                        |
| -            | root      | Styles applied to the root element.                                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/SnackbarContent/SnackbarContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/SnackbarContent/SnackbarContent.js)
