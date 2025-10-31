---
productId: material-ui
title: React Transition component
components: Collapse, Fade, Grow, Slide, Zoom
githubLabel: 'scope: transitions'
githubSource: packages/mui-material/src/transitions
---

# Transitions

Transitions help to make a UI expressive and easy to use.

Material UI provides transitions that can be used to introduce some basic [motion](https://m2.material.io/design/motion/) to your applications.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Collapse

Expand from the start edge of the child element.
Use the `orientation` prop if you need a horizontal collapse.
The `collapsedSize` prop can be used to set the minimum width/height when not expanded.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SimpleCollapse() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 300 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box
        sx={{
          '& > :not(style)': {
            display: 'flex',
            justifyContent: 'space-around',
            height: 120,
            width: 250,
          },
        }}
      >
        <div>
          <Collapse in={checked}>{icon}</Collapse>
          <Collapse in={checked} collapsedSize={40}>
            {icon}
          </Collapse>
        </div>
        <div>
          <Box sx={{ width: '50%' }}>
            <Collapse orientation="horizontal" in={checked}>
              {icon}
            </Collapse>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Collapse orientation="horizontal" in={checked} collapsedSize={40}>
              {icon}
            </Collapse>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
```

## Fade

Fade in from transparent to opaque.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SimpleFade() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <Fade in={checked}>{icon}</Fade>
      </Box>
    </Box>
  );
}
```

## Grow

Expands outwards from the center of the child element, while also fading in from transparent to opaque.

The second example demonstrates how to change the `transform-origin`, and conditionally applies
the `timeout` prop to change the entry speed.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SimpleGrow() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <Grow in={checked}>{icon}</Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          {icon}
        </Grow>
      </Box>
    </Box>
  );
}
```

## Slide

Slide in from the edge of the screen.
The `direction` prop controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` prop prevents the child component from being mounted
until `in` is `true`.
This prevents the relatively positioned component from scrolling into view
from its off-screen position.
Similarly, the `unmountOnExit` prop removes the component from the DOM after it has been transition off-screen.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SimpleSlide() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180, width: 130, position: 'relative', zIndex: 1 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        {icon}
      </Slide>
    </Box>
  );
}
```

### Slide relative to a container

The Slide component also accepts `container` prop, which is a reference to a DOM node.
If this prop is set, the Slide component will slide from the edge of that DOM node.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SlideFromContainer() {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef<HTMLElement>(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: 240,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ p: 2, height: 200, overflow: 'hidden' }} ref={containerRef}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show from target"
        />
        <Slide in={checked} container={containerRef.current}>
          {icon}
        </Slide>
      </Box>
    </Box>
  );
}
```

## Zoom

Expand outwards from the center of the child element.

This example also demonstrates how to delay the enter transition.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={(theme) => ({
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        })}
      />
    </svg>
  </Paper>
);

export default function SimpleZoom() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <Zoom in={checked}>{icon}</Zoom>
        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          {icon}
        </Zoom>
      </Box>
    </Box>
  );
}
```

## Child requirement

- **Forward the style**: To better support server rendering, Material UI provides a `style` prop to the children of some transition components (Fade, Grow, Zoom, Slide).
  The `style` prop must be applied to the DOM for the animation to work as expected.
- **Forward the ref**: The transition components require the first child element to forward its ref to the DOM node. For more details about ref, check out [Caveat with refs](/material-ui/guides/composition/#caveat-with-refs)
- **Single element**: The transition components require only one child element (`React.Fragment` is not allowed).

```jsx
// The `props` object contains a `style` prop.
// You need to provide it to the `div` element as shown here.
const MyComponent = React.forwardRef(function (props, ref) {
  return (
    <div ref={ref} {...props}>
      Fade
    </div>
  );
});

export default function Main() {
  return (
    <Fade>
      {/* MyComponent must be the only child */}
      <MyComponent />
    </Fade>
  );
}
```

## TransitionGroup

To animate a component when it is mounted or unmounted, you can use the [`TransitionGroup`](https://reactcommunity.org/react-transition-group/transition-group/) component from _react-transition-group_.
As components are added or removed, the `in` prop is toggled automatically by `TransitionGroup`.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

const FRUITS = [
  '🍏 Apple',
  '🍌 Banana',
  '🍍 Pineapple',
  '🥥 Coconut',
  '🍉 Watermelon',
];

interface RenderItemOptions {
  item: string;
  handleRemoveFruit: (item: string) => void;
}

function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveFruit(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

export default function TransitionGroupExample() {
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addFruitButton = (
    <Button
      variant="contained"
      disabled={fruitsInBasket.length >= FRUITS.length}
      onClick={handleAddFruit}
    >
      Add fruit to basket
    </Button>
  );

  return (
    <div>
      {addFruitButton}
      <List sx={{ mt: 1 }}>
        <TransitionGroup>
          {fruitsInBasket.map((item) => (
            <Collapse key={item}>{renderItem({ item, handleRemoveFruit })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
```

## TransitionComponent prop

Some Material UI components use these transitions internally. These accept a `TransitionComponent` prop to customize the default transition.
You can use any of the above components or your own.
It should respect the following conditions:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed.
  These two callbacks allow to unmount the children when in a closed state and fully transitioned.

For more information on creating a custom transition, visit the _react-transition-group_ [`Transition` documentation](https://reactcommunity.org/react-transition-group/transition/).
You can also visit the dedicated sections of some of the components:

- [Modal](/material-ui/react-modal/#transitions)
- [Dialog](/material-ui/react-dialog/#transitions)
- [Popper](/material-ui/react-popper/#transitions)
- [Snackbar](/material-ui/react-snackbar/#transitions)
- [Tooltip](/material-ui/react-tooltip/#transitions)

## Performance & SEO

The content of transition component is mounted by default even if `in={false}`.
This default behavior has server-side rendering and SEO in mind.
If you render expensive component trees inside your transition it might be a good idea to change this default behavior by enabling the
`unmountOnExit` prop:

```jsx
<Fade in={false} unmountOnExit />
```

As with any performance optimization this is not a silver bullet.
Be sure to identify bottlenecks first and then try out these optimization strategies.

# Collapse API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)
- [Lists](https://mui.com/material-ui/react-list/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Collapse from '@mui/material/Collapse';
// or
import { Collapse } from '@mui/material';
```

## Props

| Name           | Type                                                                     | Default             | Required | Description                                                                             |
| -------------- | ------------------------------------------------------------------------ | ------------------- | -------- | --------------------------------------------------------------------------------------- |
| addEndListener | `func`                                                                   | -                   | No       |                                                                                         |
| children       | `node`                                                                   | -                   | No       |                                                                                         |
| classes        | `object`                                                                 | -                   | No       | Override or extend the styles applied to the component.                                 |
| collapsedSize  | `number \| string`                                                       | `'0px'`             | No       |                                                                                         |
| component      | `element type`                                                           | -                   | No       |                                                                                         |
| easing         | `{ enter?: string, exit?: string } \| string`                            | -                   | No       |                                                                                         |
| in             | `bool`                                                                   | -                   | No       |                                                                                         |
| orientation    | `'horizontal' \| 'vertical'`                                             | `'vertical'`        | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object`                        | -                   | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| timeout        | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }` | `duration.standard` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Collapse. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Theme default props

You can use `MuiCollapse` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                                                  |
| ------------ | ------------ | -------------------------------------------------------------------------------------------- |
| -            | entered      | Styles applied to the root element when the transition has entered.                          |
| -            | hidden       | Styles applied to the root element when the transition has exited and `collapsedSize` = 0px. |
| -            | horizontal   | State class applied to the root element if `orientation="horizontal"`.                       |
| -            | root         | Styles applied to the root element.                                                          |
| -            | wrapper      | Styles applied to the outer wrapper element.                                                 |
| -            | wrapperInner | Styles applied to the inner wrapper element.                                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Collapse/Collapse.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Collapse/Collapse.js)

# Fade API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Fade from '@mui/material/Fade';
// or
import { Fade } from '@mui/material';
```

## Props

| Name           | Type                                                           | Default | Required | Description |
| -------------- | -------------------------------------------------------------- | ------- | -------- | ----------- |
| children       | `element`                                                      | -       | Yes      |             |
| addEndListener | `func`                                                         | -       | No       |             |
| appear         | `bool`                                                         | `true`  | No       |             |
| easing         | `{ enter?: string, exit?: string } \| string`                  | -       | No       |             |
| in             | `bool`                                                         | -       | No       |             |
| timeout        | `number \| { appear?: number, enter?: number, exit?: number }` | `{      |

enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Fade. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Fade/Fade.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Fade/Fade.js)

# Grow API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Popover](https://mui.com/material-ui/react-popover/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Grow from '@mui/material/Grow';
// or
import { Grow } from '@mui/material';
```

## Props

| Name           | Type                                                                     | Default  | Required | Description |
| -------------- | ------------------------------------------------------------------------ | -------- | -------- | ----------- |
| children       | `element`                                                                | -        | Yes      |             |
| addEndListener | `func`                                                                   | -        | No       |             |
| appear         | `bool`                                                                   | `true`   | No       |             |
| easing         | `{ enter?: string, exit?: string } \| string`                            | -        | No       |             |
| in             | `bool`                                                                   | -        | No       |             |
| timeout        | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }` | `'auto'` | No       |             |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Grow. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Grow/Grow.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Grow/Grow.js)

# Slide API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Dialog](https://mui.com/material-ui/react-dialog/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Slide from '@mui/material/Slide';
// or
import { Slide } from '@mui/material';
```

## Props

| Name           | Type                                          | Default  | Required | Description |
| -------------- | --------------------------------------------- | -------- | -------- | ----------- |
| children       | `element`                                     | -        | Yes      |             |
| addEndListener | `func`                                        | -        | No       |             |
| appear         | `bool`                                        | `true`   | No       |             |
| container      | `HTML element \| func`                        | -        | No       |             |
| direction      | `'down' \| 'left' \| 'right' \| 'up'`         | `'down'` | No       |             |
| easing         | `{ enter?: string, exit?: string } \| string` | `{       |

enter: theme.transitions.easing.easeOut,
exit: theme.transitions.easing.sharp,
}`| No |  |
| in |`bool`| - | No |  |
| timeout |`number \| { appear?: number, enter?: number, exit?: number }`|`{
enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Slide. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Slide/Slide.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Slide/Slide.js)

# Zoom API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Zoom from '@mui/material/Zoom';
// or
import { Zoom } from '@mui/material';
```

## Props

| Name           | Type                                                           | Default | Required | Description |
| -------------- | -------------------------------------------------------------- | ------- | -------- | ----------- |
| children       | `element`                                                      | -       | Yes      |             |
| addEndListener | `func`                                                         | -       | No       |             |
| appear         | `bool`                                                         | `true`  | No       |             |
| easing         | `{ enter?: string, exit?: string } \| string`                  | -       | No       |             |
| in             | `bool`                                                         | -       | No       |             |
| timeout        | `number \| { appear?: number, enter?: number, exit?: number }` | `{      |

enter: theme.transitions.duration.enteringScreen,
exit: theme.transitions.duration.leavingScreen,
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Zoom. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Zoom/Zoom.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Zoom/Zoom.js)
