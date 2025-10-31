---
productId: material-ui
title: React Speed Dial component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'scope: speed dial'
materialDesign: https://m2.material.io/components/buttons-floating-action-button#types-of-transitions
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
githubSource: packages/mui-material/src/SpeedDial
---

# Speed Dial

When pressed, a floating action button can display three to six related actions in the form of a Speed Dial.

If more than six actions are needed, something other than a FAB should be used to present them.

## Basic speed dial

The floating action button can display related actions.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
```

## Playground

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function PlaygroundSpeedDial() {
  const [direction, setDirection] =
    React.useState<SpeedDialProps['direction']>('up');
  const [hidden, setHidden] = React.useState(false);

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(
      (event.target as HTMLInputElement).value as SpeedDialProps['direction'],
    );
  };

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <FormControlLabel
        control={
          <Switch checked={hidden} onChange={handleHiddenChange} color="primary" />
        }
        label="Hidden"
      />
      <FormControl component="fieldset" sx={{ mt: 1, display: 'flex' }}>
        <FormLabel component="legend">Direction</FormLabel>
        <RadioGroup
          aria-label="direction"
          name="direction"
          value={direction}
          onChange={handleDirectionChange}
          row
        >
          <FormControlLabel value="up" control={<Radio />} label="Up" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
          <FormControlLabel value="down" control={<Radio />} label="Down" />
          <FormControlLabel value="left" control={<Radio />} label="Left" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              slotProps={{
                tooltip: {
                  title: action.name,
                },
              }}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
```

## Controlled speed dial

The open state of the component can be controlled with the `open`/`onOpen`/`onClose` props.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
```

## Custom close icon

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props
of the `SpeedDialIcon` component.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function OpenIconSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
```

## Persistent action tooltips

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name,
              },
            }}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
```

## Accessibility

### ARIA

#### Required

- You should provide an `ariaLabel` for the speed dial component.
- You should provide a tooltip title using `slotProps.tooltip.title` for each speed dial action.

#### Provided

- The Fab has `aria-haspopup`, `aria-expanded` and `aria-controls` attributes.
- The speed dial actions container has `role="menu"` and `aria-orientation` set according to the direction.
- The speed dial actions have `role="menuitem"`, and an `aria-describedby` attribute that references the associated tooltip.

### Keyboard

- The speed dial opens on focus.
- The Space and Enter keys trigger the selected speed dial action, and toggle the speed dial open state.
- The cursor keys move focus to the next or previous speed dial action. (Note that any cursor direction can be used initially to open the speed dial. This enables the expected behavior for the actual or perceived orientation of the speed dial, for example for a screen reader user who perceives the speed dial as a drop-down menu.)
- The Escape key closes the speed dial and, if a speed dial action was focused, returns focus to the Fab.

# SpeedDial API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Speed Dial](https://mui.com/material-ui/react-speed-dial/)

## Import

```jsx
import SpeedDial from '@mui/material/SpeedDial';
// or
import { SpeedDial } from '@mui/material';
```

## Props

| Name                                                                                                                                                                          | Type                                                           | Default                                                                                                                                                                         | Required | Description                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| ariaLabel                                                                                                                                                                     | `string`                                                       | -                                                                                                                                                                               | Yes      |                                                                                         |
| children                                                                                                                                                                      | `node`                                                         | -                                                                                                                                                                               | No       |                                                                                         |
| classes                                                                                                                                                                       | `object`                                                       | -                                                                                                                                                                               | No       | Override or extend the styles applied to the component.                                 |
| direction                                                                                                                                                                     | `'down' \| 'left' \| 'right' \| 'up'`                          | `'up'`                                                                                                                                                                          | No       |                                                                                         |
| FabProps                                                                                                                                                                      | `object`                                                       | `{}`                                                                                                                                                                            | No       |                                                                                         |
| hidden                                                                                                                                                                        | `bool`                                                         | `false`                                                                                                                                                                         | No       |                                                                                         |
| icon                                                                                                                                                                          | `node`                                                         | -                                                                                                                                                                               | No       |                                                                                         |
| onClose                                                                                                                                                                       | `function(event: object, reason: string) => void`              | -                                                                                                                                                                               | No       |                                                                                         |
| onOpen                                                                                                                                                                        | `function(event: object, reason: string) => void`              | -                                                                                                                                                                               | No       |                                                                                         |
| open                                                                                                                                                                          | `bool`                                                         | -                                                                                                                                                                               | No       |                                                                                         |
| openIcon                                                                                                                                                                      | `node`                                                         | -                                                                                                                                                                               | No       |                                                                                         |
| slotProps                                                                                                                                                                     | `{ root?: func \| object, transition?: func \| object }`       | `{}`                                                                                                                                                                            | No       |                                                                                         |
| slots                                                                                                                                                                         | `{ root?: elementType, transition?: elementType }`             | `{}`                                                                                                                                                                            | No       |                                                                                         |
| sx                                                                                                                                                                            | `Array<func \| object \| bool> \| func \| object`              | -                                                                                                                                                                               | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| TransitionComponent (deprecated)                                                                                                                                              | `elementType`                                                  | `Zoom                                                                                                                                                                           |
| \* @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)` | No                                                             | ⚠️ Use `slots.transition` instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) |
| transitionDuration                                                                                                                                                            | `number \| { appear?: number, enter?: number, exit?: number }` | `{                                                                                                                                                                              |

enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}`| No |  |
| TransitionProps (deprecated) |`object`| - | No | ⚠️ Use`slotProps.transition` instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSpeedDial` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                                            | Default | Class                | Description                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------- | ------------------------------------------ |
| root                                                                                                                                            | `'div'` | `.MuiSpeedDial-root` | The component that renders the root slot.  |
| transition                                                                                                                                      | `Zoom`  | -                    | The component that renders the transition. |
| [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |

## CSS

### Rule name

| Global class | Rule name      | Description                                                                   |
| ------------ | -------------- | ----------------------------------------------------------------------------- |
| -            | actions        | Styles applied to the actions (`children` wrapper) element.                   |
| -            | actionsClosed  | Styles applied to the actions (`children` wrapper) element if `open={false}`. |
| -            | directionDown  | Styles applied to the root element if direction="down"                        |
| -            | directionLeft  | Styles applied to the root element if direction="left"                        |
| -            | directionRight | Styles applied to the root element if direction="right"                       |
| -            | directionUp    | Styles applied to the root element if direction="up"                          |
| -            | fab            | Styles applied to the Fab component.                                          |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/SpeedDial/SpeedDial.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/SpeedDial/SpeedDial.js)

# SpeedDialAction API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Speed Dial](https://mui.com/material-ui/react-speed-dial/)

## Import

```jsx
import SpeedDialAction from '@mui/material/SpeedDialAction';
// or
import { SpeedDialAction } from '@mui/material';
```

## Props

| Name                          | Type                                                                                                                                                                                                         | Default  | Required | Description                                                                                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| classes                       | `object`                                                                                                                                                                                                     | -        | No       | Override or extend the styles applied to the component.                                                                                                                                                                          |
| delay                         | `number`                                                                                                                                                                                                     | `0`      | No       |                                                                                                                                                                                                                                  |
| FabProps (deprecated)         | `object`                                                                                                                                                                                                     | `{}`     | No       | ⚠️ Use `slotProps.fab` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.               |
| icon                          | `node`                                                                                                                                                                                                       | -        | No       |                                                                                                                                                                                                                                  |
| id                            | `string`                                                                                                                                                                                                     | -        | No       |                                                                                                                                                                                                                                  |
| open                          | `bool`                                                                                                                                                                                                       | -        | No       |                                                                                                                                                                                                                                  |
| slotProps                     | `{ fab?: func \| object, staticTooltip?: func \| object, staticTooltipLabel?: func \| object, tooltip?: func \| object }`                                                                                    | `{}`     | No       |                                                                                                                                                                                                                                  |
| slots                         | `{ fab?: elementType, staticTooltip?: elementType, staticTooltipLabel?: elementType, tooltip?: elementType }`                                                                                                | `{}`     | No       |                                                                                                                                                                                                                                  |
| sx                            | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                            | -        | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                          |
| TooltipClasses (deprecated)   | `object`                                                                                                                                                                                                     | -        | No       | ⚠️ Use `slotProps.tooltip.classes` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.   |
| tooltipOpen (deprecated)      | `bool`                                                                                                                                                                                                       | `false`  | No       | ⚠️ Use `slotProps.tooltip.open` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.      |
| tooltipPlacement (deprecated) | `'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top'` | `'left'` | No       | ⚠️ Use `slotProps.tooltip.placement` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| tooltipTitle (deprecated)     | `node`                                                                                                                                                                                                       | -        | No       | ⚠️ Use `slotProps.tooltip.title` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([Tooltip](https://mui.com/material-ui/api/tooltip/)).

## Inheritance

While not explicitly documented above, the props of the [Tooltip](https://mui.com/material-ui/api/tooltip/) component are also available on SpeedDialAction.

## Theme default props

You can use `MuiSpeedDialAction` to change the default props of this component with the theme.

## Slots

| Name               | Default   | Class                                    | Description                                          |
| ------------------ | --------- | ---------------------------------------- | ---------------------------------------------------- |
| fab                | `Fab`     | `.MuiSpeedDialAction-fab`                | The component that renders the fab.                  |
| tooltip            | `Tooltip` | -                                        | The component that renders the tooltip.              |
| staticTooltip      | `'span'`  | `.MuiSpeedDialAction-staticTooltip`      | The component that renders the static tooltip.       |
| staticTooltipLabel | `'span'`  | `.MuiSpeedDialAction-staticTooltipLabel` | The component that renders the static tooltip label. |

## CSS

### Rule name

| Global class | Rule name             | Description                                                                                |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------ |
| -            | fabClosed             | Styles applied to the Fab component if `open={false}`.                                     |
| -            | staticTooltipClosed   | Styles applied to the root element if `tooltipOpen={true}` and `open={false}`.             |
| -            | tooltipPlacementLeft  | Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="left"``  |
| -            | tooltipPlacementRight | Styles applied to the root element if `tooltipOpen={true}` and `tooltipPlacement="right"`` |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/SpeedDialAction/SpeedDialAction.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/SpeedDialAction/SpeedDialAction.js)

# SpeedDialIcon API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Speed Dial](https://mui.com/material-ui/react-speed-dial/)

## Import

```jsx
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// or
import { SpeedDialIcon } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| icon     | `node`                                            | -       | No       |                                                                                         |
| openIcon | `node`                                            | -       | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSpeedDialIcon` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name            | Description                                                                     |
| ------------ | -------------------- | ------------------------------------------------------------------------------- |
| -            | icon                 | Styles applied to the icon component.                                           |
| -            | iconOpen             | Styles applied to the icon component if `open={true}`.                          |
| -            | iconWithOpenIconOpen | Styles applied to the icon when an `openIcon` is provided and if `open={true}`. |
| -            | openIcon             | Styles applied to the `openIcon` if provided.                                   |
| -            | openIconOpen         | Styles applied to the `openIcon` if provided and if `open={true}`.              |
| -            | root                 | Styles applied to the root element.                                             |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/SpeedDialIcon/SpeedDialIcon.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/SpeedDialIcon/SpeedDialIcon.js)
