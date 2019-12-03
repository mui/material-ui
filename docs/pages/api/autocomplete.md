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
| <a class="anchor-link" id="props--autoComplete"></a><a href="#props--autoComplete" class="prop-name">autoComplete</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the portion of the selected suggestion that has not been typed by the user, known as the completion string, appears inline after the input cursor in the textbox. The inline completion string is visually highlighted and has a selected state. |
| <a class="anchor-link" id="props--autoHighlight"></a><a href="#props--autoHighlight" class="prop-name">autoHighlight</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the first option is automatically highlighted. |
| <a class="anchor-link" id="props--autoSelect"></a><a href="#props--autoSelect" class="prop-name">autoSelect</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--clearOnEscape"></a><a href="#props--clearOnEscape" class="prop-name">clearOnEscape</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clear all values when the user presses escape and the popup is closed. |
| <a class="anchor-link" id="props--clearText"></a><a href="#props--clearText" class="prop-name">clearText</a> | <span class="prop-type">string</span> | <span class="prop-default">'Clear'</span> | Override the default text for the *clear* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--closeIcon"></a><a href="#props--closeIcon" class="prop-name">closeIcon</a> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CloseIcon fontSize="small" /></span> | The icon to display in place of the default close icon. |
| <a class="anchor-link" id="props--closeText"></a><a href="#props--closeText" class="prop-name">closeText</a> | <span class="prop-type">string</span> | <span class="prop-default">'Close'</span> | Override the default text for the *close popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--debug"></a><a href="#props--debug" class="prop-name">debug</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup will ignore the blur event if the input if filled. You can inspect the popup markup with your browser tools. Consider this option when you need to customize the component. |
| <a class="anchor-link" id="props--defaultValue"></a><a href="#props--defaultValue" class="prop-name">defaultValue</a> | <span class="prop-type">any</span> |  | The default input value. Use when the component is not controlled. |
| <a class="anchor-link" id="props--disableClearable"></a><a href="#props--disableClearable" class="prop-name">disableClearable</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input can't be cleared. |
| <a class="anchor-link" id="props--disableCloseOnSelect"></a><a href="#props--disableCloseOnSelect" class="prop-name">disableCloseOnSelect</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't close when a value is selected. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will be disabled. |
| <a class="anchor-link" id="props--disableListWrap"></a><a href="#props--disableListWrap" class="prop-name">disableListWrap</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list box in the popup will not wrap focus. |
| <a class="anchor-link" id="props--disableOpenOnFocus"></a><a href="#props--disableOpenOnFocus" class="prop-name">disableOpenOnFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't open on input focus. |
| <a class="anchor-link" id="props--disablePortal"></a><a href="#props--disablePortal" class="prop-name">disablePortal</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <a class="anchor-link" id="props--filterOptions"></a><a href="#props--filterOptions" class="prop-name">filterOptions</a> | <span class="prop-type">func</span> |  | A filter function that determines the options that are eligible.<br><br>**Signature:**<br>`function(options: undefined, state: object) => undefined`<br>*options:* The options to render.<br>*state:* The state of the component. |
| <a class="anchor-link" id="props--filterSelectedOptions"></a><a href="#props--filterSelectedOptions" class="prop-name">filterSelectedOptions</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the selected options from the list box. |
| <a class="anchor-link" id="props--freeSolo"></a><a href="#props--freeSolo" class="prop-name">freeSolo</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options. |
| <a class="anchor-link" id="props--getOptionDisabled"></a><a href="#props--getOptionDisabled" class="prop-name">getOptionDisabled</a> | <span class="prop-type">func</span> |  | Used to determine the disabled state for a given option. |
| <a class="anchor-link" id="props--getOptionLabel"></a><a href="#props--getOptionLabel" class="prop-name">getOptionLabel</a> | <span class="prop-type">func</span> | <span class="prop-default">x => x</span> | Used to determine the string value for a given option. It's used to fill the input (and the list box options if `renderOption` is not provided). |
| <a class="anchor-link" id="props--groupBy"></a><a href="#props--groupBy" class="prop-name">groupBy</a> | <span class="prop-type">func</span> |  | If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.<br><br>**Signature:**<br>`function(options: any) => string`<br>*options:* The option to group. |
| <a class="anchor-link" id="props--id"></a><a href="#props--id" class="prop-name">id</a> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <a class="anchor-link" id="props--includeInputInList"></a><a href="#props--includeInputInList" class="prop-name">includeInputInList</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the highlight can move to the input. |
| <a class="anchor-link" id="props--inputValue"></a><a href="#props--inputValue" class="prop-name">inputValue</a> | <span class="prop-type">string</span> |  | The input value. |
| <a class="anchor-link" id="props--ListboxComponent"></a><a href="#props--ListboxComponent" class="prop-name">ListboxComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used to render the listbox. |
| <a class="anchor-link" id="props--loading"></a><a href="#props--loading" class="prop-name">loading</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component is in a loading state. |
| <a class="anchor-link" id="props--loadingText"></a><a href="#props--loadingText" class="prop-name">loadingText</a> | <span class="prop-type">node</span> | <span class="prop-default">'Loading…'</span> | Text to display when in a loading state.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--multiple"></a><a href="#props--multiple" class="prop-name">multiple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, `value` must be an array and the menu will support multiple selections. |
| <a class="anchor-link" id="props--noOptionsText"></a><a href="#props--noOptionsText" class="prop-name">noOptionsText</a> | <span class="prop-type">node</span> | <span class="prop-default">'No options'</span> | Text to display when there are no options.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* null |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be closed. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--onInputChange"></a><a href="#props--onInputChange" class="prop-name">onInputChange</a> | <span class="prop-type">func</span> |  | Callback fired when the input value changes.<br><br>**Signature:**<br>`function(event: object, value: string) => void`<br>*event:* The event source of the callback.<br>*value:* null |
| <a class="anchor-link" id="props--onOpen"></a><a href="#props--onOpen" class="prop-name">onOpen</a> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be opened. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name">open</a> | <span class="prop-type">bool</span> |  | Control the popup` open state. |
| <a class="anchor-link" id="props--openText"></a><a href="#props--openText" class="prop-name">openText</a> | <span class="prop-type">string</span> | <span class="prop-default">'Open'</span> | Override the default text for the *open popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <a class="anchor-link" id="props--options"></a><a href="#props--options" class="prop-name">options</a> | <span class="prop-type">array</span> | <span class="prop-default">[]</span> | Array of options. |
| <a class="anchor-link" id="props--PaperComponent"></a><a href="#props--PaperComponent" class="prop-name">PaperComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the popup. |
| <a class="anchor-link" id="props--PopperComponent"></a><a href="#props--PopperComponent" class="prop-name">PopperComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Popper</span> | The component used to position the popup. |
| <a class="anchor-link" id="props--popupIcon"></a><a href="#props--popupIcon" class="prop-name">popupIcon</a> | <span class="prop-type">node</span> | <span class="prop-default">&lt;ArrowDropDownIcon /></span> | The icon to display in place of the default popup icon. |
| <a class="anchor-link" id="props--renderGroup"></a><a href="#props--renderGroup" class="prop-name">renderGroup</a> | <span class="prop-type">func</span> |  | Render the group.<br><br>**Signature:**<br>`function(option: any) => ReactNode`<br>*option:* The group to render. |
| <a class="anchor-link" id="props--renderInput"></a><a href="#props--renderInput" class="prop-name required">renderInput&nbsp;*</a> | <span class="prop-type">func</span> |  | Render the input.<br><br>**Signature:**<br>`function(params: object) => ReactNode`<br>*params:* null |
| <a class="anchor-link" id="props--renderOption"></a><a href="#props--renderOption" class="prop-name">renderOption</a> | <span class="prop-type">func</span> |  | Render the option, use `getOptionLabel` by default.<br><br>**Signature:**<br>`function(option: any, state: object) => ReactNode`<br>*option:* The option to render.<br>*state:* The state of the component. |
| <a class="anchor-link" id="props--renderTags"></a><a href="#props--renderTags" class="prop-name">renderTags</a> | <span class="prop-type">func</span> |  | Render the selected value.<br><br>**Signature:**<br>`function(value: any, getTagProps: function) => ReactNode`<br>*value:* The `value` provided to the component.<br>*getTagProps:* A tag props getter. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the autocomplete. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the autocomplete.<br>The value must have reference equality with the option in order to be selected. You can customize the equality behavior with the `getOptionSelected` prop. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiAutocomplete`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAutocomplete-root</span> | Styles applied to the root element.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if focused.
| <span class="prop-name">tag</span> | <span class="prop-name">.MuiAutocomplete-tag</span> | Styles applied to the tag elements, e.g. the chips.
| <span class="prop-name">tagSizeSmall</span> | <span class="prop-name">.MuiAutocomplete-tagSizeSmall</span> | Styles applied to the tag elements, e.g. the chips if `size="small"`.
| <span class="prop-name">inputRoot</span> | <span class="prop-name">.MuiAutocomplete-inputRoot</span> | Styles applied to the Input element.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiAutocomplete-input</span> | Styles applied to the input element.
| <span class="prop-name">inputFocused</span> | <span class="prop-name">.MuiAutocomplete-inputFocused</span> | Styles applied to the input element if tag focused.
| <span class="prop-name">endAdornment</span> | <span class="prop-name">.MuiAutocomplete-endAdornment</span> | Styles applied to the endAdornment element.
| <span class="prop-name">clearIndicator</span> | <span class="prop-name">.MuiAutocomplete-clearIndicator</span> | Styles applied to the clear indictator.
| <span class="prop-name">clearIndicatorDirty</span> | <span class="prop-name">.MuiAutocomplete-clearIndicatorDirty</span> | Styles applied to the clear indictator if the input is dirty.
| <span class="prop-name">popupIndicator</span> | <span class="prop-name">.MuiAutocomplete-popupIndicator</span> | Styles applied to the popup indictator.
| <span class="prop-name">popupIndicatorOpen</span> | <span class="prop-name">.MuiAutocomplete-popupIndicatorOpen</span> | Styles applied to the popup indictator if the popup is open.
| <span class="prop-name">popper</span> | <span class="prop-name">.MuiAutocomplete-popper</span> | Styles applied to the popper element.
| <span class="prop-name">popperDisablePortal</span> | <span class="prop-name">.MuiAutocomplete-popperDisablePortal</span> | Styles applied to the popper element if `disablePortal={true}`.
| <span class="prop-name">paper</span> | <span class="prop-name">.MuiAutocomplete-paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">listbox</span> | <span class="prop-name">.MuiAutocomplete-listbox</span> | Styles applied to the `listbox` component.
| <span class="prop-name">loading</span> | <span class="prop-name">.MuiAutocomplete-loading</span> | Styles applied to the loading wrapper.
| <span class="prop-name">noOptions</span> | <span class="prop-name">.MuiAutocomplete-noOptions</span> | Styles applied to the no option wrapper.
| <span class="prop-name">option</span> | <span class="prop-name">.MuiAutocomplete-option</span> | Styles applied to the option elements.
| <span class="prop-name">groupLabel</span> | <span class="prop-name">.MuiAutocomplete-groupLabel</span> | Styles applied to the group's label elements.
| <span class="prop-name">groupUl</span> | <span class="prop-name">.MuiAutocomplete-groupUl</span> | Styles applied to the group's ul elements.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Autocomplete/Autocomplete.js) for more detail.

## Demos

- [Autocomplete](/components/autocomplete/)

