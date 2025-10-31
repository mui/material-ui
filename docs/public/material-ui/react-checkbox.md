---
productId: material-ui
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: https://m2.material.io/components/selection-controls#checkboxes
githubLabel: 'scope: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
githubSource: packages/mui-material/src/Checkbox
---

# Checkbox

Checkboxes allow the user to select one or more items from a set.

Checkboxes can be used to turn an option on or off.

If you have multiple options appearing in a list,
you can preserve space by using checkboxes instead of on/off switches.
If you have a single option, avoid using a checkbox and use an on/off switch instead.

## Basic checkboxes

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function Checkboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} />
      <Checkbox {...label} disabled />
      <Checkbox {...label} disabled checked />
    </div>
  );
}
```

## Label

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

```tsx
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel required control={<Checkbox />} label="Required" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
  );
}
```

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function SizeCheckboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked size="small" />
      <Checkbox {...label} defaultChecked />
      <Checkbox
        {...label}
        defaultChecked
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
    </div>
  );
}
```

## Color

```tsx
import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function ColorCheckboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} defaultChecked color="secondary" />
      <Checkbox {...label} defaultChecked color="success" />
      <Checkbox {...label} defaultChecked color="default" />
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
    </div>
  );
}
```

## Icon

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function IconCheckboxes() {
  return (
    <div>
      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
    </div>
  );
}
```

## Controlled

You can control the checkbox with the `checked` and `onChange` props:

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      slotProps={{
        input: { 'aria-label': 'controlled' },
      }}
    />
  );
}
```

## Indeterminate

A checkbox input can only have two states in a form: checked or unchecked.
It either submits its value or doesn't.
Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

You can change the indeterminate icon using the `indeterminateIcon` prop.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
```

:::warning
When indeterminate is set, the value of the `checked` prop only impacts the form submitted values.
It has no accessibility or UX implications.
:::

## FormGroup

`FormGroup` is a helpful wrapper used to group selection control components.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </Box>
  );
}
```

## Label placement

You can change the placement of the label:

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
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
          control={<Checkbox />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="End"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
    ...theme.applyStyles('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ '&:hover': { bgcolor: 'transparent' } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      slotProps={{ input: { 'aria-label': 'Checkbox demo' } }}
      {...props}
    />
  );
}

export default function CustomizedCheckbox() {
  return (
    <div>
      <BpCheckbox />
      <BpCheckbox defaultChecked />
      <BpCheckbox disabled />
    </div>
  );
}
```

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/checkbox-introduction--docs).

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `slotProps.input` prop.

```jsx
<Checkbox
  value="checkedA"
  slotProps={{
    input: { 'aria-label': 'Checkbox A' },
  }}
/>
```

# Checkbox API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Checkbox](https://mui.com/material-ui/react-checkbox/)
- [Transfer List](https://mui.com/material-ui/react-transfer-list/)

## Import

```jsx
import Checkbox from '@mui/material/Checkbox';
// or
import { Checkbox } from '@mui/material';
```

## Props

| Name                    | Type                                                                                             | Default                         | Required | Description                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| checked                 | `bool`                                                                                           | -                               | No       |                                                                                                                                                                                                                      |
| checkedIcon             | `node`                                                                                           | `<CheckBoxIcon />`              | No       |                                                                                                                                                                                                                      |
| classes                 | `object`                                                                                         | -                               | No       | Override or extend the styles applied to the component.                                                                                                                                                              |
| color                   | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'primary'`                     | No       |                                                                                                                                                                                                                      |
| defaultChecked          | `bool`                                                                                           | -                               | No       |                                                                                                                                                                                                                      |
| disabled                | `bool`                                                                                           | `false`                         | No       |                                                                                                                                                                                                                      |
| disableRipple           | `bool`                                                                                           | `false`                         | No       |                                                                                                                                                                                                                      |
| icon                    | `node`                                                                                           | `<CheckBoxOutlineBlankIcon />`  | No       |                                                                                                                                                                                                                      |
| id                      | `string`                                                                                         | -                               | No       |                                                                                                                                                                                                                      |
| indeterminate           | `bool`                                                                                           | `false`                         | No       |                                                                                                                                                                                                                      |
| indeterminateIcon       | `node`                                                                                           | `<IndeterminateCheckBoxIcon />` | No       |                                                                                                                                                                                                                      |
| inputProps (deprecated) | `object`                                                                                         | -                               | No       | ⚠️ Use `slotProps.input` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| onChange                | `function(event: React.ChangeEvent<HTMLInputElement>) => void`                                   | -                               | No       |                                                                                                                                                                                                                      |
| required                | `bool`                                                                                           | `false`                         | No       |                                                                                                                                                                                                                      |
| size                    | `'medium' \| 'small' \| string`                                                                  | `'medium'`                      | No       |                                                                                                                                                                                                                      |
| slotProps               | `{ input?: func \| object, root?: func \| object }`                                              | `{}`                            | No       |                                                                                                                                                                                                                      |
| slots                   | `{ input?: elementType, root?: elementType }`                                                    | `{}`                            | No       |                                                                                                                                                                                                                      |
| sx                      | `Array<func \| object \| bool> \| func \| object`                                                | -                               | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                              |
| value                   | `any`                                                                                            | -                               | No       |                                                                                                                                                                                                                      |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on Checkbox.

## Theme default props

You can use `MuiCheckbox` to change the default props of this component with the theme.

## Slots

| Name  | Default              | Class               | Description                                |
| ----- | -------------------- | ------------------- | ------------------------------------------ |
| root  | `SwitchBase`         | `.MuiCheckbox-root` | The component that renders the root slot.  |
| input | `SwitchBase's input` | -                   | The component that renders the input slot. |

## CSS

### Rule name

| Global class    | Rule name      | Description                                                        |
| --------------- | -------------- | ------------------------------------------------------------------ |
| `.Mui-checked`  | -              | State class applied to the root element if `checked={true}`.       |
| -               | colorPrimary   | State class applied to the root element if `color="primary"`.      |
| -               | colorSecondary | State class applied to the root element if `color="secondary"`.    |
| `.Mui-disabled` | -              | State class applied to the root element if `disabled={true}`.      |
| -               | indeterminate  | State class applied to the root element if `indeterminate={true}`. |
| -               | sizeMedium     | State class applied to the root element if `size="medium"`.        |
| -               | sizeSmall      | State class applied to the root element if `size="small"`.         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Checkbox/Checkbox.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Checkbox/Checkbox.js)

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
