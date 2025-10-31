---
productId: material-ui
title: React Tooltip component
components: Tooltip
githubLabel: 'scope: tooltip'
materialDesign: https://m2.material.io/components/tooltips
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
githubSource: packages/mui-material/src/Tooltip
---

# Tooltip

Tooltips display informative text when users hover over, focus on, or tap an element.

When activated, Tooltips display a text label identifying an element, such as a description of its function.

## Basic tooltip

```tsx
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip() {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
```

## Positioned tooltips

The `Tooltip` has 12 **placement** choices.
They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function PositionedTooltips() {
  return (
    <Box sx={{ width: 500 }}>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
          <Tooltip title="Add" placement="top-start">
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid size={6}>
          <Tooltip title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Grid>
        <Grid container direction="column" sx={{ alignItems: 'flex-end' }} size={6}>
          <Grid>
            <Tooltip title="Add" placement="right-start">
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title="Add" placement="right">
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title="Add" placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
          <Tooltip title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom">
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function CustomizedTooltips() {
  return (
    <div>
      <LightTooltip title="Add">
        <Button>Light</Button>
      </LightTooltip>
      <BootstrapTooltip title="Add">
        <Button>Bootstrap</Button>
      </BootstrapTooltip>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
        <Button>HTML</Button>
      </HtmlTooltip>
    </div>
  );
}
```

## Arrow tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  return (
    <Tooltip title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
  );
}
```

## Distance from anchor

To adjust the distance between the tooltip and its anchor, you can use the `slotProps` prop to modify the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popper.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function TooltipOffset() {
  return (
    <Tooltip
      title="Add"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      <Button>Offset</Button>
    </Tooltip>
  );
}
```

Alternatively, you can use the `slotProps` prop to customize the margin of the popper.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function TooltipMargin() {
  return (
    <Tooltip
      title="Add"
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
              {
                marginLeft: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
              {
                marginRight: '0px',
              },
          },
        },
      }}
    >
      <Button>Margin</Button>
    </Tooltip>
  );
}
```

## Custom child element

The tooltip needs to apply DOM event listeners to its child element.
If the child is a custom React element, you need to make sure that it spreads its props to the underlying DOM element.

```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      Bin
    </div>
  );
});

// ...

<Tooltip title="Delete">
  <MyComponent />
</Tooltip>;
```

If using a class component as a child, you'll also need to ensure that the ref is forwarded to the underlying DOM element. (A ref to the class component itself will not work.)

```jsx
class MyComponent extends React.Component {
  render() {
    const { innerRef, ...props } = this.props;
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={innerRef}>
        Bin
      </div>
    );
  }
}

// Wrap MyComponent to forward the ref as expected by Tooltip
const WrappedMyComponent = React.forwardRef(function WrappedMyComponent(props, ref) {
  return <MyComponent {...props} innerRef={ref} />;
});

// ...

<Tooltip title="Delete">
  <WrappedMyComponent />
</Tooltip>;
```

## Triggers

You can define the types of events that cause a tooltip to show.

The touch action requires a long press due to the `enterTouchDelay` prop being set to `700`ms by default.

```tsx
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function TriggersTooltips() {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
          <Tooltip disableFocusListener title="Add">
            <Button>Hover or touch</Button>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip disableHoverListener title="Add">
            <Button>Focus or touch</Button>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip disableFocusListener disableTouchListener title="Add">
            <Button>Hover</Button>
          </Tooltip>
        </Grid>
        <Grid>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Add"
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Button onClick={handleTooltipOpen}>Click</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </div>
  );
}
```

## Controlled tooltips

You can use the `open`, `onOpen` and `onClose` props to control the behavior of the tooltip.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ControlledTooltips() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
      <Button>Controlled</Button>
    </Tooltip>
  );
}
```

## Variable width

The `Tooltip` wraps long text by default to make it readable.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

export default function VariableWidth() {
  return (
    <div>
      <Tooltip title={longText}>
        <Button sx={{ m: 1 }}>Default Width [300px]</Button>
      </Tooltip>
      <CustomWidthTooltip title={longText}>
        <Button sx={{ m: 1 }}>Custom Width [500px]</Button>
      </CustomWidthTooltip>
      <NoMaxWidthTooltip title={longText}>
        <Button sx={{ m: 1 }}>No wrapping</Button>
      </NoMaxWidthTooltip>
    </div>
  );
}
```

## Interactive

Tooltips are interactive by default (to pass [WCAG 2.1 success criterion 1.4.13](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)).
It won't close when the user hovers over the tooltip before the `leaveDelay` is expired.
You can disable this behavior (thus failing the success criterion which is required to reach level AA) by passing `disableInteractive`.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function NonInteractiveTooltips() {
  return (
    <Tooltip title="Add" disableInteractive>
      <Button>Not interactive</Button>
    </Tooltip>
  );
}
```

## Disabled elements

By default disabled elements like `<button>` do not trigger user interactions so a `Tooltip` will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element, such as a `span`.

:::warning
In order to work with Safari, you need at least one display block or flex item below the tooltip wrapper.
:::

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DisabledTooltips() {
  return (
    <Tooltip title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>
  );
}
```

:::warning
If you're not wrapping a Material UI component that inherits from `ButtonBase`, for instance, a native `<button>` element, you should also add the CSS property _pointer-events: none;_ to your element when disabled:
:::

```jsx
<Tooltip title="You don't have permission to do this">
  <span>
    <button disabled={disabled} style={disabled ? { pointerEvents: 'none' } : {}}>
      A disabled button
    </button>
  </span>
</Tooltip>
```

## Transitions

Use a different transition.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

export default function TransitionsTooltips() {
  return (
    <div>
      <Tooltip title="Add">
        <Button>Grow</Button>
      </Tooltip>
      <Tooltip
        title="Add"
        slots={{
          transition: Fade,
        }}
        slotProps={{
          transition: { timeout: 600 },
        }}
      >
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip
        title="Add"
        slots={{
          transition: Zoom,
        }}
      >
        <Button>Zoom</Button>
      </Tooltip>
    </div>
  );
}
```

## Follow cursor

You can enable the tooltip to follow the cursor by setting `followCursor={true}`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export default function FollowCursorTooltips() {
  return (
    <Tooltip title="You don't have permission to do this" followCursor>
      <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
        Disabled Action
      </Box>
    </Tooltip>
  );
}
```

## Virtual element

In the event you need to implement a custom placement, you can use the `anchorEl` prop:
The value of the `anchorEl` prop can be a reference to a fake DOM element.
You need to create an object shaped like the [`VirtualElement`](https://popper.js.org/docs/v2/virtual-elements/).

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Instance } from '@popperjs/core';

export default function AnchorElTooltips() {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <Tooltip
      title="Add"
      placement="top"
      arrow
      slotProps={{
        popper: {
          popperRef,
          anchorEl: {
            getBoundingClientRect: () => {
              return new DOMRect(
                positionRef.current.x,
                areaRef.current!.getBoundingClientRect().y,
                0,
                0,
              );
            },
          },
        },
      }}
    >
      <Box
        ref={areaRef}
        onMouseMove={handleMouseMove}
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}
      >
        Hover
      </Box>
    </Tooltip>
  );
}
```

## Showing and hiding

The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the `enterDelay` and `leaveDelay` props.

On mobile, the tooltip is displayed when the user longpresses the element and hides after a delay of 1500ms. You can disable this feature with the `disableTouchListener` prop.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DelayTooltips() {
  return (
    <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
      <Button>[500ms, 200ms]</Button>
    </Tooltip>
  );
}
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

By default, the tooltip only labels its child element.
This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label.
For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description.
If you want the tooltip to act as an accessible description you can pass `describeChild`.
Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

```tsx
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function AccessibilityTooltips() {
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip describeChild title="Does not add if it already exists.">
        <Button>Add</Button>
      </Tooltip>
    </div>
  );
}
```

# Tooltip API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tooltip](https://mui.com/material-ui/react-tooltip/)

## Import

```jsx
import Tooltip from '@mui/material/Tooltip';
// or
import { Tooltip } from '@mui/material';
```

## Props

| Name                             | Type                                                                                                                                                                                                         | Default    | Required | Description                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                         | `element`                                                                                                                                                                                                    | -          | Yes      |                                                                                                                                                                                                                                    |
| arrow                            | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| classes                          | `object`                                                                                                                                                                                                     | -          | No       | Override or extend the styles applied to the component.                                                                                                                                                                            |
| components (deprecated)          | `{ Arrow?: elementType, Popper?: elementType, Tooltip?: elementType, Transition?: elementType }`                                                                                                             | `{}`       | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.                |
| componentsProps (deprecated)     | `{ arrow?: object, popper?: object, tooltip?: object, transition?: object }`                                                                                                                                 | `{}`       | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.            |
| describeChild                    | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| disableFocusListener             | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| disableHoverListener             | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| disableInteractive               | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| disableTouchListener             | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| enterDelay                       | `number`                                                                                                                                                                                                     | `100`      | No       |                                                                                                                                                                                                                                    |
| enterNextDelay                   | `number`                                                                                                                                                                                                     | `0`        | No       |                                                                                                                                                                                                                                    |
| enterTouchDelay                  | `number`                                                                                                                                                                                                     | `700`      | No       |                                                                                                                                                                                                                                    |
| followCursor                     | `bool`                                                                                                                                                                                                       | `false`    | No       |                                                                                                                                                                                                                                    |
| id                               | `string`                                                                                                                                                                                                     | -          | No       |                                                                                                                                                                                                                                    |
| leaveDelay                       | `number`                                                                                                                                                                                                     | `0`        | No       |                                                                                                                                                                                                                                    |
| leaveTouchDelay                  | `number`                                                                                                                                                                                                     | `1500`     | No       |                                                                                                                                                                                                                                    |
| onClose                          | `function(event: React.SyntheticEvent) => void`                                                                                                                                                              | -          | No       |                                                                                                                                                                                                                                    |
| onOpen                           | `function(event: React.SyntheticEvent) => void`                                                                                                                                                              | -          | No       |                                                                                                                                                                                                                                    |
| open                             | `bool`                                                                                                                                                                                                       | -          | No       |                                                                                                                                                                                                                                    |
| placement                        | `'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top'` | `'bottom'` | No       |                                                                                                                                                                                                                                    |
| PopperComponent (deprecated)     | `elementType`                                                                                                                                                                                                | -          | No       | ⚠️ use the `slots.popper` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.         |
| PopperProps (deprecated)         | `object`                                                                                                                                                                                                     | `{}`       | No       | ⚠️ use the `slotProps.popper` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| slotProps                        | `{ arrow?: func \| object, popper?: func \| object, tooltip?: func \| object, transition?: func \| object }`                                                                                                 | `{}`       | No       |                                                                                                                                                                                                                                    |
| slots                            | `{ arrow?: elementType, popper?: elementType, tooltip?: elementType, transition?: elementType }`                                                                                                             | `{}`       | No       |                                                                                                                                                                                                                                    |
| sx                               | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                            | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                            |
| title                            | `node`                                                                                                                                                                                                       | -          | No       |                                                                                                                                                                                                                                    |
| TransitionComponent (deprecated) | `elementType`                                                                                                                                                                                                | -          | No       | ⚠️ use the `slots.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| TransitionProps (deprecated)     | `object`                                                                                                                                                                                                     | `{}`       | No       | ⚠️ use the `slotProps.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTooltip` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                                            | Default     | Class                 | Description                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------- | -------------------------------------- |
| popper                                                                                                                                          | `Popper`    | `.MuiTooltip-popper`  | The component used for the popper.     |
| transition                                                                                                                                      | `Grow`      | -                     | The component used for the transition. |
| [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| tooltip                                                                                                                                         | `undefined` | `.MuiTooltip-tooltip` | The component used for the tooltip.    |
| arrow                                                                                                                                           | `undefined` | `.MuiTooltip-arrow`   | The component used for the arrow.      |

## CSS

### Rule name

| Global class | Rule name              | Description                                                                              |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------- |
| -            | popperArrow            | Styles applied to the Popper component if `arrow={true}`.                                |
| -            | popperClose            | Styles applied to the Popper component unless the tooltip is open.                       |
| -            | popperInteractive      | Styles applied to the Popper component unless `disableInteractive={true}`.               |
| -            | tooltipArrow           | Styles applied to the tooltip (label wrapper) element if `arrow={true}`.                 |
| -            | tooltipPlacementBottom | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".  |
| -            | tooltipPlacementLeft   | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".    |
| -            | tooltipPlacementRight  | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".   |
| -            | tooltipPlacementTop    | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".     |
| -            | touch                  | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Tooltip/Tooltip.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Tooltip/Tooltip.js)
