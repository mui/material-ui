---
title: Form Control Context Hook
githubLabel: 'hook: useFormControl'
---

# useFormControl

<p class="description">This is a custom React hook that provides form context such as `filled/focused/error/required` for children of the FormControl component.</p>

The context is used by the following `material-ui` components:

- [FormLabel](/api/form-label).
- [FormHelperText](/api/form-helper-text)
- [Input](/api/input)
- [InputLabel](/api/input-label)

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Usage

```jsx
import { useFormControl } from '@material-ui/core/FormControl';
```

Using the hook, you can access the form control context from inside your components that are children of `FormControl` component.

{{"demo": "pages/components/use-form-control/SimpleUseFormControl.js", "defaultCodeOpen": true}}

## Context value

Below is the full list of the form control context attributes that can be accessed using the custom hook.

| Name            | Type                                                                              | Default    | Description                                                                                                                                                                                |
| :-------------- | :-------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| adornedStart    | <span class="prop-type">bool</span>                                               | false      | Indicate whether the child `Input` or `Select` component has a start adornment                                                                                                             |
| setAdornedStart | <span class="prop-type">func</span>                                               |            | Setter function for `adornedStart` value                                                                                                                                                   |
| color           | <span class="prop-type">'primary'&nbsp;\|<br>'secondary'&nbsp;\|<br>string</span> | primary    | The theme color is being used, inherited from `FormControl` `color` prop                                                                                                                   |
| disabled        | <span class="prop-type">bool</span>                                               | false      | Indicate whether the child label, input and helper text are being displayed in a disabled state, inherited from `FormControl` `disabled` prop                                              |
| error           | <span class="prop-type">bool</span>                                               | false      | Indicate whether the child label, input and helper text are being displayed in an error state, inherited from `FormControl` `error` prop                                                   |
| filled          | <span class="prop-type">bool</span>                                               | false      | Indicate whether the child `Input` or `Select` component is being filled                                                                                                                   |
| focused         | <span class="prop-type">bool</span>                                               | false      | Indicate whether the component and its children are being displayed in a focused state                                                                                                     |
| fullWidth       | <span class="prop-type">bool</span>                                               | false      | Indicate whether the component is taking up the full width of its container, inherited from `FormControl` `fullWidth` prop                                                                 |
| hiddenLabel     | <span class="prop-type">bool</span>                                               | false      | Indicate whether the label is being hidden, inherited from `FormControl` `hiddenLabel` prop                                                                                                |
| required        | <span class="prop-type">bool</span>                                               | false      | Indicate whether the label is indicating that the input is required input, inherited from the `FormControl` `required` prop                                                                |
| size            | <span class="prop-type">'medium'&nbsp;\|<br>'small'&nbsp;\|<br>string</span>      | 'medium'   | The size of the `FormControl` component, inherited from the `FormControl` `size` prop                                                                                                      |
| variant         | <span class="prop-type">'filled', 'outlined', 'standard'</span>                   | 'outlined' | The variant is being used by the `FormControl` component and its children, inherited from `FormControl` `variant` prop                                                                     |
| onBlur          | <span class="prop-type">func</span>                                               |            | Set `focused` value to `false`                                                                                                                                                             |
| onFocus         | <span class="prop-type">func</span>                                               |            | Set `focused` value to `true`                                                                                                                                                              |
| onEmpty         | <span class="prop-type">func</span>                                               |            | Set `filled` value to `false`                                                                                                                                                              |
| onFilled        | <span class="prop-type">func</span>                                               |            | Set `filled` value to `true`                                                                                                                                                               |
| registerEffect  | <span class="prop-type">func</span>                                               |            | This function will be called inside child `InputBase` components in non `production` mode to log a console error if more than one `InputBase` component is included within a `FormControl` |
