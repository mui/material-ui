---
productId: material-ui
title: React Badge component
components: Badge
githubLabel: 'scope: badge'
githubSource: packages/mui-material/src/Badge
---

# Badge

Badge generates a small badge to the top-right of its child(ren).

## Basic badge

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

```tsx
import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge() {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
```

## Color

Use `color` prop to apply theme palette to component.

```tsx
import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      <Badge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="success">
        <MailIcon color="action" />
      </Badge>
    </Stack>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges() {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
```

## Badge visibility

The visibility of badges can be controlled using the `invisible` prop.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge color="secondary" badgeContent={count}>
          <MailIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Badge color="secondary" variant="dot" invisible={invisible}>
          <MailIcon />
        </Badge>
        <FormControlLabel
          sx={{ color: 'text.primary' }}
          control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </div>
    </Box>
  );
}
```

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function ShowZeroBadge() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
      <Badge color="secondary" badgeContent={0}>
        <MailIcon />
      </Badge>
      <Badge color="secondary" badgeContent={0} showZero>
        <MailIcon />
      </Badge>
    </Stack>
  );
}
```

## Maximum value

You can use the `max` prop to cap the value of the badge content.

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function BadgeMax() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
      <Badge color="secondary" badgeContent={99}>
        <MailIcon />
      </Badge>
      <Badge color="secondary" badgeContent={100}>
        <MailIcon />
      </Badge>
      <Badge color="secondary" badgeContent={1000} max={999}>
        <MailIcon />
      </Badge>
    </Stack>
  );
}
```

## Dot badge

The `dot` prop changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function DotBadge() {
  return (
    <Box sx={{ color: 'action.active' }}>
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
    </Box>
  );
}
```

## Badge overlap

You can use the `overlap` prop to place the badge relative to the corner of the wrapped element.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const rectangle = <Box component="span" sx={shapeStyles} />;
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);
export default function BadgeOverlap() {
  return (
    <Stack spacing={3} direction="row">
      <Badge color="secondary" badgeContent=" ">
        {rectangle}
      </Badge>
      <Badge color="secondary" badgeContent=" " variant="dot">
        {rectangle}
      </Badge>
      <Badge color="secondary" overlap="circular" badgeContent=" ">
        {circle}
      </Badge>
      <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
        {circle}
      </Badge>
    </Stack>
  );
}
```

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

```jsx
import * as React from 'react';
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

export default function BadgeAlignment() {
  const [horizontal, setHorizontal] = React.useState('right');
  const [vertical, setVertical] = React.useState('top');

  const handleHorizontalChange = (event) => {
    setHorizontal(event.target.value);
  };

  const handleVerticalChange = (event) => {
    setVertical(event.target.value);
  };

  const jsx = `
<Badge
  anchorOrigin={{
    vertical: '${vertical}',
    horizontal: '${horizontal}',
  }}
>
`;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& fieldset': {
            margin: 3,
          },
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup
            name="vertical"
            value={vertical}
            onChange={handleVerticalChange}
          >
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup
            name="horizontal"
            value={horizontal}
            onChange={handleHorizontalChange}
          >
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'action.active',
          '& > *': {
            margin: 2,
          },
        }}
      >
        <Badge
          color="secondary"
          variant="dot"
          badgeContent={1}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={1}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={12}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={123}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          max={999}
          badgeContent={1337}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
      </Box>
      <HighlightedCode code={jsx} language="jsx" />
    </Box>
  );
}
```

## Accessibility

You can't rely on the content of the badge to be announced correctly.
You should provide a full description, for instance, with `aria-label`:

```tsx
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges() {
  return (
    <IconButton aria-label={notificationsLabel(100)}>
      <Badge badgeContent={100} color="secondary">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}
```

# Badge API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Avatar](https://mui.com/material-ui/react-avatar/)
- [Badge](https://mui.com/material-ui/react-badge/)

## Import

```jsx
import Badge from '@mui/material/Badge';
// or
import { Badge } from '@mui/material';
```

## Props

| Name         | Type                                                               | Default | Required | Description |
| ------------ | ------------------------------------------------------------------ | ------- | -------- | ----------- |
| anchorOrigin | `{ horizontal?: 'left' \| 'right', vertical?: 'bottom' \| 'top' }` | `{      |

vertical: 'top',
horizontal: 'right',
}`| No |  |
| badgeContent |`node`| - | No |  |
| children |`node`| - | No |  |
| classes |`object`| - | No | Override or extend the styles applied to the component. |
| color |`'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string`|`'default'`| No |  |
| component |`elementType`| - | No |  |
| components (deprecated) |`{ Badge?: elementType, Root?: elementType }`|`{}`| No | ⚠️ use the`slots`prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| componentsProps (deprecated) |`{ badge?: func \| object, root?: func \| object }`|`{}`| No | ⚠️ use the`slotProps`prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| invisible |`bool`|`false`| No |  |
| max |`number`|`99`| No |  |
| overlap |`'circular' \| 'rectangular'`|`'rectangular'`| No |  |
| showZero |`bool`|`false`| No |  |
| slotProps |`{ badge?: func \| object, root?: func \| object }`|`{}`| No |  |
| slots |`{ badge?: elementType, root?: elementType }`|`{}`| No |  |
| sx |`Array<func \| object \| bool> \| func \| object`| - | No | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant |`'dot' \| 'standard' \| string`|`'standard'` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiBadge` to change the default props of this component with the theme.

## Slots

| Name  | Default | Class             | Description                           |
| ----- | ------- | ----------------- | ------------------------------------- |
| root  | `span`  | `.MuiBadge-root`  | The component that renders the root.  |
| badge | `span`  | `.MuiBadge-badge` | The component that renders the badge. |

## CSS

### Rule name

| Global class | Rule name                          | Description                                                                                                 |
| ------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| -            | anchorOriginBottomLeft             | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`.                        |
| -            | anchorOriginBottomLeftCircular     | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`.     |
| -            | anchorOriginBottomLeftRectangular  | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`.  |
| -            | anchorOriginBottomRight            | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`.                       |
| -            | anchorOriginBottomRightCircular    | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`.    |
| -            | anchorOriginBottomRightRectangular | Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. |
| -            | anchorOriginTopLeft                | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`.                           |
| -            | anchorOriginTopLeftCircular        | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`.        |
| -            | anchorOriginTopLeftRectangular     | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`.     |
| -            | anchorOriginTopRight               | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`.                          |
| -            | anchorOriginTopRightCircular       | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`.       |
| -            | anchorOriginTopRightRectangular    | Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`.    |
| -            | colorError                         | Styles applied to the badge `span` element if `color="error"`.                                              |
| -            | colorInfo                          | Styles applied to the badge `span` element if `color="info"`.                                               |
| -            | colorPrimary                       | Styles applied to the badge `span` element if `color="primary"`.                                            |
| -            | colorSecondary                     | Styles applied to the badge `span` element if `color="secondary"`.                                          |
| -            | colorSuccess                       | Styles applied to the badge `span` element if `color="success"`.                                            |
| -            | colorWarning                       | Styles applied to the badge `span` element if `color="warning"`.                                            |
| -            | dot                                | Styles applied to the badge `span` element if `variant="dot"`.                                              |
| -            | invisible                          | State class applied to the badge `span` element if `invisible={true}`.                                      |
| -            | overlapCircular                    | Styles applied to the badge `span` element if `overlap="circular"`.                                         |
| -            | overlapRectangular                 | Styles applied to the badge `span` element if `overlap="rectangular"`.                                      |
| -            | standard                           | Styles applied to the badge `span` element if `variant="standard"`.                                         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Badge/Badge.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Badge/Badge.js)
