---
productId: material-ui
title: React Chip component
components: Chip
githubLabel: 'scope: chip'
materialDesign: https://m2.material.io/components/chips
githubSource: packages/mui-material/src/Chip
---

# Chip

Chips are compact elements that represent an input, attribute, or action.

Chips allow users to enter information, make selections, filter content, or trigger actions.

While included here as a standalone component, the most common use will
be in some form of input, so some of the behavior demonstrated here is
not shown in context.

## Basic chip

The `Chip` component supports outlined and filled styling.

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function BasicChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Chip Filled" />
      <Chip label="Chip Outlined" variant="outlined" />
    </Stack>
  );
}
```

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickable

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}
```

### Deletable

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function DeletableChips() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Deletable" onDelete={handleDelete} />
      <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
    </Stack>
  );
}
```

### Clickable and deletable

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableAndDeletableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Clickable Deletable"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Clickable Deletable"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
```

### Clickable link

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableLinkChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />
      <Chip
        label="Clickable Link"
        component="a"
        href="#basic-chip"
        variant="outlined"
        clickable
      />
    </Stack>
  );
}
```

### Custom delete icon

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomDeleteIconChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Custom delete icon"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        label="Custom delete icon"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DeleteIcon />}
        variant="outlined"
      />
    </Stack>
  );
}
```

## Chip adornments

You can add ornaments to the beginning of the component.

Use the `avatar` prop to add an avatar or use the `icon` prop to add an icon.

### Avatar chip

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AvatarChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
        variant="outlined"
      />
    </Stack>
  );
}
```

### Icon chip

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

export default function IconChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip icon={<FaceIcon />} label="With Icon" />
      <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
    </Stack>
  );
}
```

## Color chip

You can use the `color` prop to define a color from theme palette.

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ColorChips() {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="success" color="success" variant="outlined" />
      </Stack>
    </Stack>
  );
}
```

## Sizes chip

You can use the `size` prop to define a small Chip.

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function SizesChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Small" size="small" />
      <Chip label="Small" size="small" variant="outlined" />
    </Stack>
  );
}
```

## Multiline chip

By default, Chips displays labels only in a single line.
To have them support multiline content, use the `sx` prop to add `height:auto` to the Chip component, and `whiteSpace: normal` to the `label` styles.

```tsx
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export default function MultilineChips() {
  return (
    <Box sx={{ width: 100 }}>
      <Chip
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
        label="This is a chip that has multiple lines."
      />
    </Box>
  );
}
```

## Chip array

An example of rendering multiple chips from an array of values.
Deleting a chip removes it from the array. Note that since no
`onClick` prop is defined, the `Chip` can be focused, but does not
gain depth while clicked or touched.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
```

## Chip playground

```jsx
import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

function ChipsPlayground() {
  const [state, setState] = React.useState({
    color: 'default',
    onDelete: 'none',
    avatar: 'none',
    icon: 'none',
    variant: 'filled',
    size: 'medium',
  });
  const { color, onDelete, avatar, icon, variant, size } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteExample = () => {
    console.info('You clicked the delete icon.');
  };

  const colorToCode = color !== 'default' ? `color="${color}" ` : '';
  const sizeToCode = size === 'small' ? `size="small" ` : '';
  const variantToCode = variant !== 'filled' ? `variant="${variant}" ` : '';

  let onDeleteToCode;
  switch (onDelete) {
    case 'none':
      onDeleteToCode = '';
      break;
    case 'custom':
      onDeleteToCode = 'deleteIcon={<DoneIcon />} onDelete={handleDelete} ';
      break;
    default:
      onDeleteToCode = 'onDelete={handleDelete} ';
      break;
  }

  let iconToCode;
  let iconToPlayground;
  switch (icon) {
    case 'none':
      iconToCode = '';
      break;
    default:
      iconToCode = 'icon={<FaceIcon />} ';
      iconToPlayground = <FaceIcon />;
      break;
  }

  let avatarToCode;
  let avatarToPlayground;
  switch (avatar) {
    case 'none':
      avatarToCode = '';
      break;
    case 'img':
      avatarToCode = 'avatar={<Avatar src="/static/images/avatar/1.jpg" />} ';
      avatarToPlayground = <Avatar src="/static/images/avatar/1.jpg" />;
      break;
    case 'letter':
      avatarToCode = 'avatar={<Avatar>F</Avatar>} ';
      avatarToPlayground = <Avatar>F</Avatar>;
      break;
    default:
      break;
  }

  if (avatar !== 'none') {
    iconToCode = '';
    iconToPlayground = null;
  }

  const jsx = `
<Chip ${variantToCode}${colorToCode}${sizeToCode}${onDeleteToCode}${avatarToCode}${iconToCode}/>
`;

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid size={12}>
        <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid sx={(theme) => ({ height: theme.spacing(10) })}>
            <Chip
              label="Chip Component"
              color={color}
              deleteIcon={onDelete === 'custom' ? <DoneIcon /> : undefined}
              onDelete={onDelete !== 'none' ? handleDeleteExample : undefined}
              avatar={avatarToPlayground}
              icon={iconToPlayground}
              variant={variant}
              size={size}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>variant</FormLabel>
              <RadioGroup
                row
                name="variant"
                aria-label="variant"
                value={variant}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="filled"
                  control={<Radio />}
                  label="filled"
                />
                <FormControlLabel
                  value="outlined"
                  control={<Radio />}
                  label="outlined"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>color</FormLabel>
              <RadioGroup
                row
                name="color"
                aria-label="color"
                value={color}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="default"
                />
                <FormControlLabel
                  value="primary"
                  control={<Radio />}
                  label="primary"
                />
                <FormControlLabel
                  value="secondary"
                  control={<Radio />}
                  label="secondary"
                />
                <FormControlLabel value="error" control={<Radio />} label="error" />
                <FormControlLabel value="info" control={<Radio />} label="info" />
                <FormControlLabel
                  value="success"
                  control={<Radio />}
                  label="success"
                />
                <FormControlLabel
                  value="warning"
                  control={<Radio />}
                  label="warning"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>size</FormLabel>
              <RadioGroup
                row
                name="size"
                aria-label="size"
                value={size}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="medium"
                />
                <FormControlLabel value="small" control={<Radio />} label="small" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>icon</FormLabel>
              <RadioGroup
                row
                name="icon"
                aria-label="icon"
                value={icon}
                onChange={handleChange}
              >
                <FormControlLabel value="none" control={<Radio />} label="none" />
                <FormControlLabel value="icon" control={<Radio />} label="icon" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>avatar</FormLabel>
              <RadioGroup
                row
                name="avatar"
                aria-label="avatar"
                value={avatar}
                onChange={handleChange}
              >
                <FormControlLabel value="none" control={<Radio />} label="none" />
                <FormControlLabel
                  value="letter"
                  control={<Radio />}
                  label="letter"
                />
                <FormControlLabel value="img" control={<Radio />} label="img" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl component="fieldset">
              <FormLabel>onDelete</FormLabel>
              <RadioGroup
                row
                name="onDelete"
                aria-label="on delete"
                value={onDelete}
                onChange={handleChange}
              >
                <FormControlLabel value="none" control={<Radio />} label="none" />
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="default"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="custom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
export default ChipsPlayground;
```

## Accessibility

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (for example when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.

# Chip API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Chip](https://mui.com/material-ui/react-chip/)

## Import

```jsx
import Chip from '@mui/material/Chip';
// or
import { Chip } from '@mui/material';
```

## Props

| Name                  | Type                                                                                             | Default     | Required | Description                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------- | -------- | --------------------------------------------------------------------------------------- |
| avatar                | `element`                                                                                        | -           | No       |                                                                                         |
| children              | `unsupportedProp`                                                                                | -           | No       |                                                                                         |
| classes               | `object`                                                                                         | -           | No       | Override or extend the styles applied to the component.                                 |
| clickable             | `bool`                                                                                           | -           | No       |                                                                                         |
| color                 | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'default'` | No       |                                                                                         |
| component             | `elementType`                                                                                    | -           | No       |                                                                                         |
| deleteIcon            | `element`                                                                                        | -           | No       |                                                                                         |
| disabled              | `bool`                                                                                           | `false`     | No       |                                                                                         |
| icon                  | `element`                                                                                        | -           | No       |                                                                                         |
| label                 | `node`                                                                                           | -           | No       |                                                                                         |
| onDelete              | `func`                                                                                           | -           | No       |                                                                                         |
| size                  | `'medium' \| 'small' \| string`                                                                  | `'medium'`  | No       |                                                                                         |
| skipFocusWhenDisabled | `bool`                                                                                           | `false`     | No       |                                                                                         |
| slotProps             | `{ label?: func \| object, root?: func \| object }`                                              | `{}`        | No       |                                                                                         |
| slots                 | `{ label?: elementType, root?: elementType }`                                                    | `{}`        | No       |                                                                                         |
| sx                    | `Array<func \| object \| bool> \| func \| object`                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant               | `'filled' \| 'outlined' \| string`                                                               | `'filled'`  | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiChip` to change the default props of this component with the theme.

## Slots

| Name  | Default | Class            | Description                           |
| ----- | ------- | ---------------- | ------------------------------------- |
| root  | `div`   | `.MuiChip-root`  | The component that renders the root.  |
| label | `span`  | `.MuiChip-label` | The component that renders the label. |

## CSS

### Rule name

| Global class        | Rule name                        | Description                                                                                               |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| -                   | avatar                           | Styles applied to the avatar element.                                                                     |
| -                   | avatarColorPrimary               | Styles applied to the avatar element if `color="primary"`.                                                |
| -                   | avatarColorSecondary             | Styles applied to the avatar element if `color="secondary"`.                                              |
| -                   | avatarMedium                     | Styles applied to the avatar element if `size="medium"`.                                                  |
| -                   | avatarSmall                      | Styles applied to the avatar element if `size="small"`.                                                   |
| -                   | clickable                        | Styles applied to the root element if `onClick` is defined or `clickable={true}`.                         |
| -                   | clickableColorPrimary            | Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`.   |
| -                   | clickableColorSecondary          | Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. |
| -                   | colorDefault                     | Styles applied to the root element if `color="default"`.                                                  |
| -                   | colorError                       | Styles applied to the root element if `color="error"`.                                                    |
| -                   | colorInfo                        | Styles applied to the root element if `color="info"`.                                                     |
| -                   | colorPrimary                     | Styles applied to the root element if `color="primary"`.                                                  |
| -                   | colorSecondary                   | Styles applied to the root element if `color="secondary"`.                                                |
| -                   | colorSuccess                     | Styles applied to the root element if `color="success"`.                                                  |
| -                   | colorWarning                     | Styles applied to the root element if `color="warning"`.                                                  |
| -                   | deletable                        | Styles applied to the root element if `onDelete` is defined.                                              |
| -                   | deletableColorPrimary            | Styles applied to the root element if `onDelete` and `color="primary"` is defined.                        |
| -                   | deletableColorSecondary          | Styles applied to the root element if `onDelete` and `color="secondary"` is defined.                      |
| -                   | deleteIcon                       | Styles applied to the deleteIcon element.                                                                 |
| -                   | deleteIconColorPrimary           | Styles applied to the deleteIcon element if `color="primary"`.                                            |
| -                   | deleteIconColorSecondary         | Styles applied to the deleteIcon element if `color="secondary"`.                                          |
| -                   | deleteIconFilledColorPrimary     | Styles applied to the deleteIcon element if `color="primary"` and `variant="filled"`.                     |
| -                   | deleteIconFilledColorSecondary   | Styles applied to the deleteIcon element if `color="secondary"` and `variant="filled"`.                   |
| -                   | deleteIconMedium                 | Styles applied to the deleteIcon element if `size="medium"`.                                              |
| -                   | deleteIconOutlinedColorPrimary   | Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`.                   |
| -                   | deleteIconOutlinedColorSecondary | Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`.                 |
| -                   | deleteIconSmall                  | Styles applied to the deleteIcon element if `size="small"`.                                               |
| `.Mui-disabled`     | -                                | State class applied to the root element if `disabled={true}`.                                             |
| -                   | filled                           | Styles applied to the root element if `variant="filled"`.                                                 |
| -                   | filledPrimary                    | Styles applied to the root element if `variant="filled"` and `color="primary"`.                           |
| -                   | filledSecondary                  | Styles applied to the root element if `variant="filled"` and `color="secondary"`.                         |
| `.Mui-focusVisible` | -                                | State class applied to the root element if keyboard focused.                                              |
| -                   | icon                             | Styles applied to the icon element.                                                                       |
| -                   | iconColorPrimary                 | Styles applied to the icon element if `color="primary"`.                                                  |
| -                   | iconColorSecondary               | Styles applied to the icon element if `color="secondary"`.                                                |
| -                   | iconMedium                       | Styles applied to the icon element if `size="medium"`.                                                    |
| -                   | iconSmall                        | Styles applied to the icon element if `size="small"`.                                                     |
| -                   | labelMedium                      | Styles applied to the label `span` element if `size="medium"`.                                            |
| -                   | labelSmall                       | Styles applied to the label `span` element if `size="small"`.                                             |
| -                   | outlined                         | Styles applied to the root element if `variant="outlined"`.                                               |
| -                   | outlinedPrimary                  | Styles applied to the root element if `variant="outlined"` and `color="primary"`.                         |
| -                   | outlinedSecondary                | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.                       |
| -                   | sizeMedium                       | Styles applied to the root element if `size="medium"`.                                                    |
| -                   | sizeSmall                        | Styles applied to the root element if `size="small"`.                                                     |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Chip/Chip.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Chip/Chip.js)
