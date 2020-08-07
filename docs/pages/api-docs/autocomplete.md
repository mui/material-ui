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



## Component name

The `MuiAutocomplete` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the portion of the selected suggestion that has not been typed by the user, known as the completion string, appears inline after the input cursor in the textbox. The inline completion string is visually highlighted and has a selected state. |
| <span class="prop-name">autoHighlight</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the first option is automatically highlighted. |
| <span class="prop-name">autoSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input. |
| <span class="prop-name">blurOnSelect</span> | <span class="prop-type">'mouse'<br>&#124;&nbsp;'touch'<br>&#124;&nbsp;bool</span> | <span class="prop-default">false</span> | Control if the input should be blurred when an option is selected:<br>- `false` the input is not blurred. - `true` the input is always blurred. - `touch` the input is blurred after a touch event. - `mouse` the input is blurred after a mouse event. |
| <span class="prop-name">ChipProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Chip`](/api/chip/) element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">clearOnBlur</span> | <span class="prop-type">bool</span> | <span class="prop-default">!props.freeSolo</span> | If `true`, the input's text will be cleared on blur if no value is selected.<br>Set to `true` if you want to help the user enter a new value. Set to `false` if you want to help the user resume his search. |
| <span class="prop-name">clearOnEscape</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clear all values when the user presses escape and the popup is closed. |
| <span class="prop-name">clearText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Clear'</span> | Override the default text for the *clear* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">closeIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CloseIcon fontSize="small" /></span> | The icon to display in place of the default close icon. |
| <span class="prop-name">closeText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Close'</span> | Override the default text for the *close popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">debug</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup will ignore the blur event if the input is filled. You can inspect the popup markup with your browser tools. Consider this option when you need to customize the component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> | <span class="prop-default">props.multiple ? [] : null</span> | The default input value. Use when the component is not controlled. |
| <span class="prop-name">disableClearable</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input can't be cleared. |
| <span class="prop-name">disableCloseOnSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't close when a value is selected. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will be disabled. |
| <span class="prop-name">disabledItemsFocusable</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, will allow focus on disabled items. |
| <span class="prop-name">disableListWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list box in the popup will not wrap focus. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">filterOptions</span> | <span class="prop-type">func</span> |  | A filter function that determines the options that are eligible.<br><br>**Signature:**<br>`function(options: T[], state: object) => undefined`<br>*options:* The options to render.<br>*state:* The state of the component. |
| <span class="prop-name">filterSelectedOptions</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the selected options from the list box. |
| <span class="prop-name">forcePopupIcon</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;bool</span> | <span class="prop-default">'auto'</span> | Force the visibility display of the popup icon. |
| <span class="prop-name">freeSolo</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will take up the full width of its container. |
| <span class="prop-name">getLimitTagsText</span> | <span class="prop-type">func</span> | <span class="prop-default">(more) => `+${more}`</span> | The label to display when the tags are truncated (`limitTags`).<br><br>**Signature:**<br>`function(more: number) => ReactNode`<br>*more:* The number of truncated tags. |
| <span class="prop-name">getOptionDisabled</span> | <span class="prop-type">func</span> |  | Used to determine the disabled state for a given option.<br><br>**Signature:**<br>`function(option: T) => boolean`<br>*option:* The option to test. |
| <span class="prop-name">getOptionLabel</span> | <span class="prop-type">func</span> | <span class="prop-default">(x) => x</span> | Used to determine the string value for a given option. It's used to fill the input (and the list box options if `renderOption` is not provided).<br><br>**Signature:**<br>`function(option: T) => string`<br> |
| <span class="prop-name">getOptionSelected</span> | <span class="prop-type">func</span> |  | Used to determine if an option is selected, considering the current value. Uses strict equality by default.<br><br>**Signature:**<br>`function(option: T, value: T) => boolean`<br>*option:* The option to test.<br>*value:* The value to test against. |
| <span class="prop-name">groupBy</span> | <span class="prop-type">func</span> |  | If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.<br><br>**Signature:**<br>`function(options: T) => string`<br>*options:* The options to group. |
| <span class="prop-name">handleHomeEndKeys</span> | <span class="prop-type">bool</span> | <span class="prop-default">!props.freeSolo</span> | If `true`, the component handles the "Home" and "End" keys when the popup is open. It should move focus to the first option and last option, respectively. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">includeInputInList</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the highlight can move to the input. |
| <span class="prop-name">inputValue</span> | <span class="prop-type">string</span> |  | The input value. |
| <span class="prop-name">limitTags</span> | <span class="prop-type">number</span> | <span class="prop-default">-1</span> | The maximum number of tags that will be visible when not focused. Set `-1` to disable the limit. |
| <span class="prop-name">ListboxComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used to render the listbox. |
| <span class="prop-name">ListboxProps</span> | <span class="prop-type">object</span> |  | Props applied to the Listbox element. |
| <span class="prop-name">loading</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component is in a loading state. |
| <span class="prop-name">loadingText</span> | <span class="prop-type">node</span> | <span class="prop-default">'Loading…'</span> | Text to display when in a loading state.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">multiple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, `value` must be an array and the menu will support multiple selections. |
| <span class="prop-name">noOptionsText</span> | <span class="prop-type">node</span> | <span class="prop-default">'No options'</span> | Text to display when there are no options.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: T \| T[], reason: string) => void`<br>*event:* The event source of the callback.<br>*value:* The new value of the component.<br>*reason:* One of "create-option", "select-option", "remove-option", "blur" or "clear". |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be closed. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"toggleInput"`, `"escape"`, `"select-option"`, `"blur"`. |
| <span class="prop-name">onHighlightChange</span> | <span class="prop-type">func</span> |  | Callback fired when the highlight option changes.<br><br>**Signature:**<br>`function(event: object, option: T, reason: string) => void`<br>*event:* The event source of the callback.<br>*option:* The highlighted option.<br>*reason:* Can be: `"keyboard"`, `"auto"`, `"mouse"`. |
| <span class="prop-name">onInputChange</span> | <span class="prop-type">func</span> |  | Callback fired when the input value changes.<br><br>**Signature:**<br>`function(event: object, value: string, reason: string) => void`<br>*event:* The event source of the callback.<br>*value:* The new value of the text input.<br>*reason:* Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`. |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be opened. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | Control the popup` open state. |
| <span class="prop-name">openOnFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup will open on input focus. |
| <span class="prop-name">openText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Open'</span> | Override the default text for the *open popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name required">options<abbr title="required">*</abbr></span> | <span class="prop-type">array</span> |  | Array of options. |
| <span class="prop-name">PaperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the popup. |
| <span class="prop-name">PopperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Popper</span> | The component used to position the popup. |
| <span class="prop-name">popupIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;ArrowDropDownIcon /></span> | The icon to display in place of the default popup icon. |
| <span class="prop-name">renderGroup</span> | <span class="prop-type">func</span> |  | Render the group.<br><br>**Signature:**<br>`function(option: any) => ReactNode`<br>*option:* The group to render. |
| <span class="prop-name required">renderInput<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Render the input.<br><br>**Signature:**<br>`function(params: object) => ReactNode`<br> |
| <span class="prop-name">renderOption</span> | <span class="prop-type">func</span> |  | Render the option, use `getOptionLabel` by default.<br><br>**Signature:**<br>`function(option: T, state: object) => ReactNode`<br>*option:* The option to render.<br>*state:* The state of the component. |
| <span class="prop-name">renderTags</span> | <span class="prop-type">func</span> |  | Render the selected value.<br><br>**Signature:**<br>`function(value: T[], getTagProps: function) => ReactNode`<br>*value:* The `value` provided to the component.<br>*getTagProps:* A tag props getter. |
| <span class="prop-name">selectOnFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">!props.freeSolo</span> | If `true`, the input's text will be selected on focus. It helps the user clear the selected value. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the autocomplete. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the autocomplete.<br>The value must have reference equality with the option in order to be selected. You can customize the equality behavior with the `getOptionSelected` prop. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAutocomplete-root</span> | Styles applied to the root element.
| <span class="prop-name">fullWidth</span> | <span class="prop-name">.MuiAutocomplete-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if focused.
| <span class="prop-name">tag</span> | <span class="prop-name">.MuiAutocomplete-tag</span> | Styles applied to the tag elements, e.g. the chips.
| <span class="prop-name">tagSizeSmall</span> | <span class="prop-name">.MuiAutocomplete-tagSizeSmall</span> | Styles applied to the tag elements, e.g. the chips if `size="small"`.
| <span class="prop-name">hasPopupIcon</span> | <span class="prop-name">.MuiAutocomplete-hasPopupIcon</span> | Styles applied when the popup icon is rendered.
| <span class="prop-name">hasClearIcon</span> | <span class="prop-name">.MuiAutocomplete-hasClearIcon</span> | Styles applied when the clear icon is rendered.
| <span class="prop-name">inputRoot</span> | <span class="prop-name">.MuiAutocomplete-inputRoot</span> | Styles applied to the Input element.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiAutocomplete-input</span> | Styles applied to the input element.
| <span class="prop-name">inputFocused</span> | <span class="prop-name">.MuiAutocomplete-inputFocused</span> | Styles applied to the input element if tag focused.
| <span class="prop-name">endAdornment</span> | <span class="prop-name">.MuiAutocomplete-endAdornment</span> | Styles applied to the endAdornment element.
| <span class="prop-name">clearIndicator</span> | <span class="prop-name">.MuiAutocomplete-clearIndicator</span> | Styles applied to the clear indicator.
| <span class="prop-name">clearIndicatorDirty</span> | <span class="prop-name">.MuiAutocomplete-clearIndicatorDirty</span> | Styles applied to the clear indicator if the input is dirty.
| <span class="prop-name">popupIndicator</span> | <span class="prop-name">.MuiAutocomplete-popupIndicator</span> | Styles applied to the popup indicator.
| <span class="prop-name">popupIndicatorOpen</span> | <span class="prop-name">.MuiAutocomplete-popupIndicatorOpen</span> | Styles applied to the popup indicator if the popup is open.
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

