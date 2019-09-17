---
filename: /packages/material-ui-lab/src/Autocomplete/Autocomplete.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Autocomplete API

<p class="description">The API documentation of the Autocomplete React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Autocomplete from '@material-ui/lab/Autocomplete';
// or
import { Autocomplete } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the portion of the selected suggestion that has not been typed by the user, known as the completion string, appears inline after the input cursor in the textbox. The inline completion string is visually highlighted and has a selected state. |
| <span class="prop-name">autoHightlight</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the first option is automatically highlighted. |
| <span class="prop-name">autoSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">clearOnEscape</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clear all values when the user presses escape and the popup is closed. |
| <span class="prop-name">debug</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup will ignore the blur event if the input if filled. You can inspect the popup markup with your browser tools. Consider this option when you need to customize the component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default input value. Use when the component is not controlled. |
| <span class="prop-name">disableClearable</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input can't be cleared. |
| <span class="prop-name">disableCloseOnSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't close when a value is selected. |
| <span class="prop-name">disableListWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list box in the popup will not wrap focus. |
| <span class="prop-name">disableOpenOnFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't open on input focus. |
| <span class="prop-name">filterOptions</span> | <span class="prop-type">func</span> | <span class="prop-default">createFilterOptions()</span> | A filter function that determins the options that are eligible.<br><br>**Signature:**<br>`function(options: any, state: object) => boolean`<br>*options:* The options to render.<br>*state:* The state of the component. |
| <span class="prop-name">filterSelectedOptions</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the selected options from the list box. |
| <span class="prop-name">freeSolo</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options. |
| <span class="prop-name">getOptionLabel</span> | <span class="prop-type">func</span> | <span class="prop-default">x => x</span> | Used to determine the string value for a given option. It's used to fill the input (and the list box options if `renderOption` is not provided). |
| <span class="prop-name">groupBy</span> | <span class="prop-type">func</span> |  | If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.<br><br>**Signature:**<br>`function(options: any) => string`<br>*options:* The option to group. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">includeInputInList</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the highlight can move to the input. |
| <span class="prop-name">ListComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">List</span> | The component used for the ul element. |
| <span class="prop-name">loading</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component is in a loading state. |
| <span class="prop-name">loadingText</span> | <span class="prop-type">node</span> | <span class="prop-default">'Loading…'</span> | Text to display when in a loading state. |
| <span class="prop-name">multiple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If true, `value` must be an array and the menu will support multiple selections. |
| <span class="prop-name">noOptionsText</span> | <span class="prop-type">node</span> | <span class="prop-default">'No options'</span> | Text to display when there are no options. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* null |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be closed. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">onInputChange</span> | <span class="prop-type">func</span> |  | Callback fired when the input value changes. |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be opened. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | Control the popup` open state. |
| <span class="prop-name">options</span> | <span class="prop-type">array</span> | <span class="prop-default">[]</span> | Array of options. |
| <span class="prop-name">renderGroup</span> | <span class="prop-type">func</span> |  | Render the group.<br><br>**Signature:**<br>`function(option: any) => ReactNode`<br>*option:* The group to render. |
| <span class="prop-name">renderOption</span> | <span class="prop-type">func</span> |  | Render the option, use `getOptionLabel` by default.<br><br>**Signature:**<br>`function(option: any, state: object) => ReactNode`<br>*option:* The option to render.<br>*state:* The state of the component. |
| <span class="prop-name">renderValue</span> | <span class="prop-type">func</span> |  | Render the selected value.<br><br>**Signature:**<br>`function(value: any) => ReactNode`<br>*value:* The `value` provided to the component. |
| <span class="prop-name">TextFieldProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`TextField`](/api/text-field/) element. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The input value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Autocomplete](/components/autocomplete/)

