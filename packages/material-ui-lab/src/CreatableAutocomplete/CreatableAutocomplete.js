/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable-next-line react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const styles = () => ({});

const CreatableAutocomplete = (props) => {
  const {
    options: optionsProps,
    inputValue,
    createOptionPositionInLast = true,
    onCreateNewOption,
    getNewOptionLabel = (value) => `Create "${value}"`,
    getNewOptionData = (value, optionLabel) => ({
      label: optionLabel,
      value,
      isNew: true,
    }),
    onChange,
    ...otherProps
  } = props;
  const [_inputValue, setInputValue] = React.useState(inputValue);
  const [options, setOptions] = React.useState(optionsProps);

  React.useEffect(() => {
    const newOptionData = getNewOptionData(_inputValue, getNewOptionLabel(_inputValue));
    const newOptions = createOptionPositionInLast ? [...optionsProps, newOptionData] : [newOptionData, ...optionsProps];

    setOptions(newOptions);
  }, [optionsProps, _inputValue]);

  const handleChange =
    (e, option) => {
      console.log('if (option.isNew) {');
      console.log({props});
    if (option.isNew) {
      console.log('if (onCreateNewOption) {');
      console.log({onCreateNewOption});
      if (onCreateNewOption) {
        onCreateNewOption(e, option);
        return;
      }
      console.log('if (onChange) {');
      console.log({onChange});
      if (onChange) {
        onChange(e, option);
      }
    }
  }

  return (
    <Autocomplete
      {...otherProps}

      options={options}
      onChange={handleChange}
      onInputChange={(_, value) => setInputValue(value)}
    />
  );
}

Autocomplete.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect: PropTypes.bool,
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   */
  blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),
  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps: PropTypes.object,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape: PropTypes.bool,
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  clearText: PropTypes.string,
  /**
   * The icon to display in place of the default close icon.
   */
  closeIcon: PropTypes.node,
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: PropTypes.string,
  /**
   * If `true`, the popup will ignore the blur event if the input if filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug: PropTypes.bool,
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap: PropTypes.bool,
  /**
   * If `true`, the popup won't open on input focus.
   */
  disableOpenOnFocus: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions: PropTypes.bool,
  /**
   * Force the visibility display of the popup icon.
   */
  forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo: PropTypes.bool,
  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel: PropTypes.func,
  /**
   * Used to determine if an option is selected.
   * Uses strict equality by default.
   */
  getOptionSelected: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The option to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList: PropTypes.bool,
  /**
   * The input value.
   */
  inputValue: PropTypes.string,
  /**
   * The component used to render the listbox.
   */
  ListboxComponent: PropTypes.elementType,
  /**
   * Props applied to the Listbox element.
   */
  ListboxProps: PropTypes.object,
  /**
   * If `true`, the component is in a loading state.
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  loadingText: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  noOptionsText: PropTypes.node,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T} value
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: PropTypes.func,
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  onNoOptionsSelected: PropTypes.elementType,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * Control the popup` open state.
   */
  open: PropTypes.bool,
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  openText: PropTypes.string,
  /**
   * Array of options.
   */
  options: PropTypes.array.isRequired,
  /**
   * The component used to render the body of the popup.
   */
  PaperComponent: PropTypes.elementType,
  /**
   * The component used to position the popup.
   */
  PopperComponent: PropTypes.elementType,
  /**
   * The icon to display in place of the default popup icon.
   */
  popupIcon: PropTypes.node,
  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: PropTypes.func,
  /**
   * If `true`, the input's text will be selected on focus.
   */
  selectOnFocus: PropTypes.bool,
  /**
   * The size of the autocomplete.
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
};

export default withStyles(styles, { name: 'MuiCreatableAutocomplete' })(CreatableAutocomplete);
