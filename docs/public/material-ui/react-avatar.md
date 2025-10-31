---
productId: material-ui
title: React Avatar component
components: Avatar, AvatarGroup, Badge
githubLabel: 'scope: avatar'
githubSource: packages/mui-material/src/Avatar
---

# Avatar

Avatars are found throughout material design with uses in everything from tables to dialog menus.

## Image avatars

Image avatars can be created by passing standard `img` props `src` or `srcSet` to the component.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    </Stack>
  );
}
```

## Letter avatars

Avatars containing simple characters can be created by passing a string as `children`.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>H</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    </Stack>
  );
}
```

You can use different background colors for the avatar.
The following demo generates the color based on the name of the person.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('Kent Dodds')} />
      <Avatar {...stringAvatar('Jed Watson')} />
      <Avatar {...stringAvatar('Tim Neutkens')} />
    </Stack>
  );
}
```

## Sizes

You can change the size of the avatar with the `height` and `width` CSS properties.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function SizeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  );
}
```

## Icon avatars

Icon avatars are created by passing an icon as `children`.

```tsx
import * as React from 'react';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function IconAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>
        <FolderIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: pink[500] }}>
        <PageviewIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: green[500] }}>
        <AssignmentIcon />
      </Avatar>
    </Stack>
  );
}
```

## Variants

If you need square or rounded avatars, use the `variant` prop.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function VariantAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
        N
      </Avatar>
      <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
        <AssignmentIcon />
      </Avatar>
    </Stack>
  );
}
```

## Fallbacks

If there is an error loading the avatar image, the component falls back to an alternative in the following order:

- the provided children
- the first letter of the `alt` text
- a generic avatar icon

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

export default function FallbackAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        B
      </Avatar>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      />
      <Avatar src="/broken-image.jpg" />
    </Stack>
  );
}
```

## Grouped

`AvatarGroup` renders its children as a stack. Use the `max` prop to limit the number of avatars.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
  );
}
```

### Total avatars

If you need to control the total number of avatars not shown, you can use the `total` prop.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function TotalAvatars() {
  return (
    <AvatarGroup total={24}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
  );
}
```

### Custom surplus

Set the `renderSurplus` prop as a callback to customize the surplus avatar. The callback will receive the surplus number as an argument based on the children and the `max` prop, and should return a `React.ReactNode`.

The `renderSurplus` prop is useful when you need to render the surplus based on the data sent from the server.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function CustomSurplusAvatars() {
  return (
    <AvatarGroup
      renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
      total={4251}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
  );
}
```

### Spacing

You can change the spacing between avatars using the `spacing` prop. You can use one of the presets (`"medium"`, the default, or `"small"`) or set a custom numeric value.

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';

export default function Spacing() {
  return (
    <Stack spacing={4}>
      <AvatarGroup spacing="medium">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </AvatarGroup>
      <AvatarGroup spacing="small">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </AvatarGroup>
      <AvatarGroup spacing={24}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </AvatarGroup>
    </Stack>
  );
}
```

## With badge

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        }
      >
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </Badge>
    </Stack>
  );
}
```

## Avatar upload

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

export default function UploadAvatars() {
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={avatarSrc} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
```

# Avatar API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Avatar](https://mui.com/material-ui/react-avatar/)

## Import

```jsx
import Avatar from '@mui/material/Avatar';
// or
import { Avatar } from '@mui/material';
```

## Props

| Name                  | Type                                                                         | Default      | Required | Description                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| alt                   | `string`                                                                     | -            | No       |                                                                                                                                                                                                                    |
| children              | `node`                                                                       | -            | No       |                                                                                                                                                                                                                    |
| classes               | `object`                                                                     | -            | No       | Override or extend the styles applied to the component.                                                                                                                                                            |
| component             | `elementType`                                                                | -            | No       |                                                                                                                                                                                                                    |
| imgProps (deprecated) | `object`                                                                     | -            | No       | ⚠️ Use `slotProps.img` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| sizes                 | `string`                                                                     | -            | No       |                                                                                                                                                                                                                    |
| slotProps             | `{ fallback?: func \| object, img?: func \| object, root?: func \| object }` | `{}`         | No       |                                                                                                                                                                                                                    |
| slots                 | `{ fallback?: elementType, img?: elementType, root?: elementType }`          | `{}`         | No       |                                                                                                                                                                                                                    |
| src                   | `string`                                                                     | -            | No       |                                                                                                                                                                                                                    |
| srcSet                | `string`                                                                     | -            | No       |                                                                                                                                                                                                                    |
| sx                    | `Array<func \| object \| bool> \| func \| object`                            | -            | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                            |
| variant               | `'circular' \| 'rounded' \| 'square' \| string`                              | `'circular'` | No       |                                                                                                                                                                                                                    |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiAvatar` to change the default props of this component with the theme.

## Slots

| Name     | Default       | Class                 | Description                                   |
| -------- | ------------- | --------------------- | --------------------------------------------- |
| root     | `'div'`       | `.MuiAvatar-root`     | The component that renders the root slot.     |
| img      | `'img'`       | `.MuiAvatar-img`      | The component that renders the img slot.      |
| fallback | `Person icon` | `.MuiAvatar-fallback` | The component that renders the fallback slot. |

## CSS

### Rule name

| Global class | Rule name    | Description                                                  |
| ------------ | ------------ | ------------------------------------------------------------ |
| -            | circular     | Styles applied to the root element if `variant="circular"`.  |
| -            | colorDefault | Styles applied to the root element if not `src` or `srcSet`. |
| -            | rounded      | Styles applied to the root element if `variant="rounded"`.   |
| -            | square       | Styles applied to the root element if `variant="square"`.    |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Avatar/Avatar.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Avatar/Avatar.js)

# AvatarGroup API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Avatar](https://mui.com/material-ui/react-avatar/)

## Import

```jsx
import AvatarGroup from '@mui/material/AvatarGroup';
// or
import { AvatarGroup } from '@mui/material';
```

## Props

| Name                         | Type                                                      | Default           | Required | Description                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------- | ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                     | `node`                                                    | -                 | No       |                                                                                                                                                                                                                         |
| classes                      | `object`                                                  | -                 | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| component                    | `elementType`                                             | -                 | No       |                                                                                                                                                                                                                         |
| componentsProps (deprecated) | `{ additionalAvatar?: object }`                           | -                 | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| max                          | `number`                                                  | `5`               | No       |                                                                                                                                                                                                                         |
| renderSurplus                | `function(surplus: number) => React.ReactNode`            | -                 | No       |                                                                                                                                                                                                                         |
| slotProps                    | `{ additionalAvatar?: object, surplus?: func \| object }` | `{}`              | No       |                                                                                                                                                                                                                         |
| slots                        | `{ surplus?: elementType }`                               | `{}`              | No       |                                                                                                                                                                                                                         |
| spacing                      | `'medium' \| 'small' \| number`                           | `'medium'`        | No       |                                                                                                                                                                                                                         |
| sx                           | `Array<func \| object \| bool> \| func \| object`         | -                 | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| total                        | `number`                                                  | `children.length` | No       |                                                                                                                                                                                                                         |
| variant                      | `'circular' \| 'rounded' \| 'square' \| string`           | `'circular'`      | No       |                                                                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element.

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiAvatarGroup` to change the default props of this component with the theme.

## Slots

| Name    | Default     | Class | Description |
| ------- | ----------- | ----- | ----------- |
| surplus | `undefined` | -     |             |

## CSS

### Rule name

| Global class | Rule name | Description                            |
| ------------ | --------- | -------------------------------------- |
| -            | avatar    | Styles applied to the avatar elements. |
| -            | root      | Styles applied to the root element.    |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/AvatarGroup/AvatarGroup.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/AvatarGroup/AvatarGroup.js)

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
