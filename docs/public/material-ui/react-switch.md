---
productId: material-ui
title: React Switch component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'scope: switch'
materialDesign: https://m2.material.io/components/selection-controls#switches
githubSource: packages/mui-material/src/Switch
---

# Switch

Switches toggle the state of a single setting on or off.

Switches are the preferred way to adjust settings on mobile.
The option that the switch controls, as well as the state it's in,
should be made clear from the corresponding inline label.

## Basic switches

```tsx
import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitches() {
  return (
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
      <Switch {...label} disabled />
    </div>
  );
}
```

## Label

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

```tsx
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      <FormControlLabel required control={<Switch />} label="Required" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
    </FormGroup>
  );
}
```

## Size

Use the `size` prop to change the size of the switch.

```tsx
import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function SwitchesSize() {
  return (
    <div>
      <Switch {...label} defaultChecked size="small" />
      <Switch {...label} defaultChecked />
    </div>
  );
}
```

## Color

```tsx
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches() {
  return (
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} defaultChecked color="secondary" />
      <Switch {...label} defaultChecked color="warning" />
      <Switch {...label} defaultChecked color="default" />
      <PinkSwitch {...label} defaultChecked />
    </div>
  );
}
```

## Controlled

You can control the switch with the `checked` and `onChange` props:

```tsx
import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      slotProps={{ input: { 'aria-label': 'controlled' } }}
    />
  );
}
```

## Switches with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.
However, you are encouraged to use [Checkboxes](/material-ui/react-checkbox/) instead if multiple related controls are required. (See: [When to use](#when-to-use)).

```tsx
import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

export default function SwitchesGroup() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
          }
          label="Gilad Gray"
        />
        <FormControlLabel
          control={
            <Switch checked={state.jason} onChange={handleChange} name="jason" />
          }
          label="Jason Killian"
        />
        <FormControlLabel
          control={
            <Switch checked={state.antoine} onChange={handleChange} name="antoine" />
          }
          label="Antoine Llorca"
        />
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
  );
}
```

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

export default function CustomizedSwitches() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label="MUI switch"
      />
      <FormControlLabel
        control={<Android12Switch defaultChecked />}
        label="Android 12"
      />
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label="iOS style"
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography>Off</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
      </Stack>
    </FormGroup>
  );
}
```

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/switch-introduction--docs).

## Label placement

You can change the placement of the label:

```tsx
import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPosition() {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Label placement</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="bottom"
          control={<Switch color="primary" />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="end"
          control={<Switch color="primary" />}
          label="End"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
```

## When to use

- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `inputProps` prop.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```

# FormControl API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Checkbox](https://mui.com/material-ui/react-checkbox/)
- [Radio Group](https://mui.com/material-ui/react-radio-button/)
- [Switch](https://mui.com/material-ui/react-switch/)
- [Text Field](https://mui.com/material-ui/react-text-field/)

## Import

```jsx
import FormControl from '@mui/material/FormControl';
// or
import { FormControl } from '@mui/material';
```

## Props

| Name        | Type                                                                                | Default      | Required | Description                                                                             |
| ----------- | ----------------------------------------------------------------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| children    | `node`                                                                              | -            | No       |                                                                                         |
| classes     | `object`                                                                            | -            | No       | Override or extend the styles applied to the component.                                 |
| color       | `'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'primary'`  | No       |                                                                                         |
| component   | `elementType`                                                                       | -            | No       |                                                                                         |
| disabled    | `bool`                                                                              | `false`      | No       |                                                                                         |
| error       | `bool`                                                                              | `false`      | No       |                                                                                         |
| focused     | `bool`                                                                              | -            | No       |                                                                                         |
| fullWidth   | `bool`                                                                              | `false`      | No       |                                                                                         |
| hiddenLabel | `bool`                                                                              | `false`      | No       |                                                                                         |
| margin      | `'dense' \| 'none' \| 'normal'`                                                     | `'none'`     | No       |                                                                                         |
| required    | `bool`                                                                              | `false`      | No       |                                                                                         |
| size        | `'medium' \| 'small' \| string`                                                     | `'medium'`   | No       |                                                                                         |
| sx          | `Array<func \| object \| bool> \| func \| object`                                   | -            | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant     | `'filled' \| 'outlined' \| 'standard'`                                              | `'outlined'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiFormControl` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                               |
| ------------ | ------------ | --------------------------------------------------------- |
| -            | fullWidth    | Styles applied to the root element if `fullWidth={true}`. |
| -            | marginDense  | Styles applied to the root element if `margin="dense"`.   |
| -            | marginNormal | Styles applied to the root element if `margin="normal"`.  |
| -            | root         | Styles applied to the root element.                       |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/FormControl/FormControl.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/FormControl/FormControl.js)

# FormControlLabel API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Checkbox](https://mui.com/material-ui/react-checkbox/)
- [Radio Group](https://mui.com/material-ui/react-radio-button/)
- [Switch](https://mui.com/material-ui/react-switch/)

## Import

```jsx
import FormControlLabel from '@mui/material/FormControlLabel';
// or
import { FormControlLabel } from '@mui/material';
```

## Props

| Name                         | Type                                              | Default | Required | Description                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| control                      | `element`                                         | -       | Yes      |                                                                                                                                                                                                                         |
| checked                      | `bool`                                            | -       | No       |                                                                                                                                                                                                                         |
| classes                      | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| componentsProps (deprecated) | `{ typography?: object }`                         | `{}`    | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| disabled                     | `bool`                                            | -       | No       |                                                                                                                                                                                                                         |
| disableTypography            | `bool`                                            | -       | No       |                                                                                                                                                                                                                         |
| inputRef                     | `ref`                                             | -       | No       |                                                                                                                                                                                                                         |
| label                        | `node`                                            | -       | No       |                                                                                                                                                                                                                         |
| labelPlacement               | `'bottom' \| 'end' \| 'start' \| 'top'`           | `'end'` | No       |                                                                                                                                                                                                                         |
| onChange                     | `function(event: React.SyntheticEvent) => void`   | -       | No       |                                                                                                                                                                                                                         |
| required                     | `bool`                                            | -       | No       |                                                                                                                                                                                                                         |
| slotProps                    | `{ typography?: func \| object }`                 | `{}`    | No       |                                                                                                                                                                                                                         |
| slots                        | `{ typography?: elementType }`                    | `{}`    | No       |                                                                                                                                                                                                                         |
| sx                           | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| value                        | `any`                                             | -       | No       |                                                                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLLabelElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiFormControlLabel` to change the default props of this component with the theme.

## Slots

| Name                                           | Default      | Class | Description                           |
| ---------------------------------------------- | ------------ | ----- | ------------------------------------- |
| typography                                     | `Typography` | -     | The component that renders the label. |
| This is unused if `disableTypography` is true. |

## CSS

### Rule name

| Global class    | Rule name            | Description                                                      |
| --------------- | -------------------- | ---------------------------------------------------------------- |
| -               | asterisk             | Styles applied to the asterisk element.                          |
| `.Mui-disabled` | -                    | State class applied to the root element if `disabled={true}`.    |
| `.Mui-error`    | -                    | State class applied to the root element if `error={true}`.       |
| -               | label                | Styles applied to the label's Typography component.              |
| -               | labelPlacementBottom | Styles applied to the root element if `labelPlacement="bottom"`. |
| -               | labelPlacementStart  | Styles applied to the root element if `labelPlacement="start"`.  |
| -               | labelPlacementTop    | Styles applied to the root element if `labelPlacement="top"`.    |
| `.Mui-required` | -                    | State class applied to the root element if `required={true}`.    |
| -               | root                 | Styles applied to the root element.                              |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/FormControlLabel/FormControlLabel.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/FormControlLabel/FormControlLabel.js)

# FormGroup API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Checkbox](https://mui.com/material-ui/react-checkbox/)
- [Switch](https://mui.com/material-ui/react-switch/)

## Import

```jsx
import FormGroup from '@mui/material/FormGroup';
// or
import { FormGroup } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| row      | `bool`                                            | `false` | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiFormGroup` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| `.Mui-error` | -         | State class applied to the root element if `error={true}`. |
| -            | root      | Styles applied to the root element.                        |
| -            | row       | Styles applied to the root element if `row={true}`.        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/FormGroup/FormGroup.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/FormGroup/FormGroup.js)

# FormLabel API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Checkbox](https://mui.com/material-ui/react-checkbox/)
- [Radio Group](https://mui.com/material-ui/react-radio-button/)
- [Switch](https://mui.com/material-ui/react-switch/)

## Import

```jsx
import FormLabel from '@mui/material/FormLabel';
// or
import { FormLabel } from '@mui/material';
```

## Props

| Name      | Type                                                                                | Default | Required | Description                                                                             |
| --------- | ----------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                                                              | -       | No       |                                                                                         |
| classes   | `object`                                                                            | -       | No       | Override or extend the styles applied to the component.                                 |
| color     | `'error' \| 'info' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| string` | -       | No       |                                                                                         |
| component | `elementType`                                                                       | -       | No       |                                                                                         |
| disabled  | `bool`                                                                              | -       | No       |                                                                                         |
| error     | `bool`                                                                              | -       | No       |                                                                                         |
| filled    | `bool`                                                                              | -       | No       |                                                                                         |
| focused   | `bool`                                                                              | -       | No       |                                                                                         |
| required  | `bool`                                                                              | -       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`                                   | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLLabelElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiFormLabel` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class    | Rule name      | Description                                                   |
| --------------- | -------------- | ------------------------------------------------------------- |
| -               | asterisk       | Styles applied to the asterisk element.                       |
| -               | colorSecondary | Styles applied to the root element if the color is secondary. |
| `.Mui-disabled` | -              | State class applied to the root element if `disabled={true}`. |
| `.Mui-error`    | -              | State class applied to the root element if `error={true}`.    |
| -               | filled         | State class applied to the root element if `filled={true}`.   |
| `.Mui-focused`  | -              | State class applied to the root element if `focused={true}`.  |
| `.Mui-required` | -              | State class applied to the root element if `required={true}`. |
| -               | root           | Styles applied to the root element.                           |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/FormLabel/FormLabel.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/FormLabel/FormLabel.js)

# Switch API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Switch](https://mui.com/material-ui/react-switch/)
- [Transfer List](https://mui.com/material-ui/react-transfer-list/)

## Import

```jsx
import Switch from '@mui/material/Switch';
// or
import { Switch } from '@mui/material';
```

## Props

| Name                    | Type                                                                                                                             | Default     | Required | Description                                                                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| checked                 | `bool`                                                                                                                           | -           | No       |                                                                                                                                                                                                                          |
| checkedIcon             | `node`                                                                                                                           | -           | No       |                                                                                                                                                                                                                          |
| classes                 | `object`                                                                                                                         | -           | No       | Override or extend the styles applied to the component.                                                                                                                                                                  |
| color                   | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string`                                 | `'primary'` | No       |                                                                                                                                                                                                                          |
| defaultChecked          | `bool`                                                                                                                           | -           | No       |                                                                                                                                                                                                                          |
| disabled                | `bool`                                                                                                                           | -           | No       |                                                                                                                                                                                                                          |
| disableRipple           | `bool`                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                          |
| edge                    | `'end' \| 'start' \| false`                                                                                                      | `false`     | No       |                                                                                                                                                                                                                          |
| icon                    | `node`                                                                                                                           | -           | No       |                                                                                                                                                                                                                          |
| id                      | `string`                                                                                                                         | -           | No       |                                                                                                                                                                                                                          |
| inputProps (deprecated) | `object`                                                                                                                         | -           | No       | ⚠️ Use `slotProps.input` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| inputRef (deprecated)   | `ref`                                                                                                                            | -           | No       | ⚠️ Use `slotProps.input.ref` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| onChange                | `function(event: React.ChangeEvent<HTMLInputElement>) => void`                                                                   | -           | No       |                                                                                                                                                                                                                          |
| required                | `bool`                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                          |
| size                    | `'medium' \| 'small' \| string`                                                                                                  | `'medium'`  | No       |                                                                                                                                                                                                                          |
| slotProps               | `{ input?: func \| object, root?: func \| object, switchBase?: func \| object, thumb?: func \| object, track?: func \| object }` | `{}`        | No       |                                                                                                                                                                                                                          |
| slots                   | `{ input?: elementType, root?: elementType, switchBase?: elementType, thumb?: elementType, track?: elementType }`                | `{}`        | No       |                                                                                                                                                                                                                          |
| sx                      | `Array<func \| object \| bool> \| func \| object`                                                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                  |
| value                   | `any`                                                                                                                            | -           | No       |                                                                                                                                                                                                                          |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element ([IconButton](https://mui.com/material-ui/api/icon-button/)).

## Inheritance

While not explicitly documented above, the props of the [IconButton](https://mui.com/material-ui/api/icon-button/) component are also available on Switch.

## Slots

| Name       | Default           | Class                   | Description                                             |
| ---------- | ----------------- | ----------------------- | ------------------------------------------------------- |
| root       | `'span'`          | `.MuiSwitch-root`       | The component that renders the root slot.               |
| track      | `'span'`          | `.MuiSwitch-track`      | The component that renders the track slot.              |
| thumb      | `'span'`          | `.MuiSwitch-thumb`      | The component that renders the thumb slot.              |
| switchBase | `SwitchBase`      | `.MuiSwitch-switchBase` | The component that renders the switchBase slot.         |
| input      | `SwitchBaseInput` | `.MuiSwitch-input`      | The component that renders the switchBase's input slot. |

## CSS

### Rule name

| Global class    | Rule name      | Description                                                                                |
| --------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `.Mui-checked`  | -              | State class applied to the internal `SwitchBase` component's `checked` class.              |
| -               | colorPrimary   | Styles applied to the internal SwitchBase component's root element if `color="primary"`.   |
| -               | colorSecondary | Styles applied to the internal SwitchBase component's root element if `color="secondary"`. |
| `.Mui-disabled` | -              | State class applied to the internal SwitchBase component's disabled class.                 |
| -               | edgeEnd        | Styles applied to the root element if `edge="end"`.                                        |
| -               | edgeStart      | Styles applied to the root element if `edge="start"`.                                      |
| -               | sizeMedium     | Styles applied to the root element if `size="medium"`.                                     |
| -               | sizeSmall      | Styles applied to the root element if `size="small"`.                                      |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Switch/Switch.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Switch/Switch.js)
