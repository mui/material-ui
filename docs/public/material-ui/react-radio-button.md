---
productId: material-ui
title: React Radio Group component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
githubLabel: 'scope: radio'
materialDesign: https://m2.material.io/components/selection-controls#radio-buttons
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
githubSource: packages/mui-material/src/RadioGroup
---

# Radio Group

The Radio Group allows the user to select one option from a set.

Use radio buttons when the user needs to see all available options.
If available options can be collapsed, consider using a [Select component](/material-ui/react-select/) because it uses less space.

Radio buttons should have the most commonly used option selected by default.

## Radio group

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}
```

### Direction

To lay out the buttons horizontally, set the `row` prop:

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        />
      </RadioGroup>
    </FormControl>
  );
}
```

### Controlled

You can control the radio with the `value` and `onChange` props:

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
}
```

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
    </div>
  );
}
```

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the radios.

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function SizeRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio {...controlProps('a')} size="small" />
      <Radio {...controlProps('b')} />
      <Radio
        {...controlProps('c')}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }}
      />
    </div>
  );
}
```

## Color

```tsx
import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function ColorRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <Radio {...controlProps('a')} />
      <Radio {...controlProps('b')} color="secondary" />
      <Radio {...controlProps('c')} color="success" />
      <Radio {...controlProps('d')} color="default" />
      <Radio
        {...controlProps('e')}
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

## Label placement

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPlacement() {
  return (
    <FormControl>
      <FormLabel id="demo-form-control-label-placement">Label placement</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel
          value="bottom"
          control={<Radio />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<Radio />} label="End" />
      </RadioGroup>
    </FormControl>
  );
}
```

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

```tsx
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function ErrorRadios() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="best" control={<Radio />} label="The best!" />
          <FormControlLabel value="worst" control={<Radio />} label="The worst." />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
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
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function CustomizedRadios() {
  return (
    <FormControl>
      <FormLabel id="demo-customized-radios">Gender</FormLabel>
      <RadioGroup
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        <FormControlLabel value="female" control={<BpRadio />} label="Female" />
        <FormControlLabel value="male" control={<BpRadio />} label="Male" />
        <FormControlLabel value="other" control={<BpRadio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<BpRadio />}
          label="(Disabled option)"
        />
      </RadioGroup>
    </FormControl>
  );
}
```

## `useRadioGroup`

For advanced customization use cases, a `useRadioGroup()` hook is exposed.
It returns the context value of the parent radio group.
The Radio component uses this hook internally.

### API

```jsx
import { useRadioGroup } from '@mui/material/RadioGroup';
```

#### Returns

`value` (_object_):

- `value.name` (_string_ [optional]): The name used to reference the value of the control.
- `value.onChange` (_func_ [optional]): Callback fired when a radio button is selected.
- `value.value` (_any_ [optional]): Value of the selected radio button.

#### Example

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        '.MuiFormControlLabel-label': {
          color: theme.palette.primary.main,
        },
      },
    },
  ],
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function UseRadioGroup() {
  return (
    <RadioGroup name="use-radio-group" defaultValue="first">
      <MyFormControlLabel value="first" label="First" control={<Radio />} />
      <MyFormControlLabel value="second" label="Second" control={<Radio />} />
    </RadioGroup>
  );
}
```

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).

- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (for example `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Radio
  value="radioA"
  inputProps={{
    'aria-label': 'Radio A',
  }}
/>
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

# Radio API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Radio Group](https://mui.com/material-ui/react-radio-button/)

## Import

```jsx
import Radio from '@mui/material/Radio';
// or
import { Radio } from '@mui/material';
```

## Props

| Name                    | Type                                                                                             | Default                       | Required | Description                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| checked                 | `bool`                                                                                           | -                             | No       |                                                                                                                                                                                                                          |
| checkedIcon             | `node`                                                                                           | `<RadioButtonIcon checked />` | No       |                                                                                                                                                                                                                          |
| classes                 | `object`                                                                                         | -                             | No       | Override or extend the styles applied to the component.                                                                                                                                                                  |
| color                   | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'primary'`                   | No       |                                                                                                                                                                                                                          |
| disabled                | `bool`                                                                                           | -                             | No       |                                                                                                                                                                                                                          |
| disableRipple           | `bool`                                                                                           | `false`                       | No       |                                                                                                                                                                                                                          |
| icon                    | `node`                                                                                           | `<RadioButtonIcon />`         | No       |                                                                                                                                                                                                                          |
| id                      | `string`                                                                                         | -                             | No       |                                                                                                                                                                                                                          |
| inputProps (deprecated) | `object`                                                                                         | -                             | No       | ⚠️ Use `slotProps.input` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| inputRef (deprecated)   | `ref`                                                                                            | -                             | No       | ⚠️ Use `slotProps.input.ref` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| name                    | `string`                                                                                         | -                             | No       |                                                                                                                                                                                                                          |
| onChange                | `function(event: React.ChangeEvent<HTMLInputElement>) => void`                                   | -                             | No       |                                                                                                                                                                                                                          |
| required                | `bool`                                                                                           | `false`                       | No       |                                                                                                                                                                                                                          |
| size                    | `'medium' \| 'small' \| string`                                                                  | `'medium'`                    | No       |                                                                                                                                                                                                                          |
| slotProps               | `{ input?: func \| object, root?: func \| object }`                                              | `{}`                          | No       |                                                                                                                                                                                                                          |
| slots                   | `{ input?: elementType, root?: elementType }`                                                    | `{}`                          | No       |                                                                                                                                                                                                                          |
| sx                      | `Array<func \| object \| bool> \| func \| object`                                                | -                             | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                  |
| value                   | `any`                                                                                            | -                             | No       |                                                                                                                                                                                                                          |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on Radio.

## Theme default props

You can use `MuiRadio` to change the default props of this component with the theme.

## Slots

| Name  | Default              | Class            | Description                                |
| ----- | -------------------- | ---------------- | ------------------------------------------ |
| root  | `SwitchBase`         | `.MuiRadio-root` | The component that renders the root slot.  |
| input | `SwitchBase's input` | -                | The component that renders the input slot. |

## CSS

### Rule name

| Global class    | Rule name      | Description                                                   |
| --------------- | -------------- | ------------------------------------------------------------- |
| `.Mui-checked`  | -              | State class applied to the root element if `checked={true}`.  |
| -               | colorPrimary   | Styles applied to the root element if `color="primary"`.      |
| -               | colorSecondary | Styles applied to the root element if `color="secondary"`.    |
| `.Mui-disabled` | -              | State class applied to the root element if `disabled={true}`. |
| -               | sizeSmall      | Styles applied to the root element if `size="small"`.         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Radio/Radio.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Radio/Radio.js)

# RadioGroup API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Radio Group](https://mui.com/material-ui/react-radio-button/)

## Import

```jsx
import RadioGroup from '@mui/material/RadioGroup';
// or
import { RadioGroup } from '@mui/material';
```

## Props

| Name         | Type                                                                          | Default | Required | Description |
| ------------ | ----------------------------------------------------------------------------- | ------- | -------- | ----------- |
| children     | `node`                                                                        | -       | No       |             |
| defaultValue | `any`                                                                         | -       | No       |             |
| name         | `string`                                                                      | -       | No       |             |
| onChange     | `function(event: React.ChangeEvent<HTMLInputElement>, value: string) => void` | -       | No       |             |
| value        | `any`                                                                         | -       | No       |             |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([FormGroup](https://mui.com/material-ui/api/form-group/)).

## Inheritance

While not explicitly documented above, the props of the [FormGroup](https://mui.com/material-ui/api/form-group/) component are also available on RadioGroup.

## CSS

### Rule name

| Global class | Rule name | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| `.Mui-error` | -         | State class applied to the root element if `error={true}`. |
| -            | root      | Styles applied to the root element.                        |
| -            | row       | Styles applied to the root element if `row={true}`.        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/RadioGroup/RadioGroup.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/RadioGroup/RadioGroup.js)
