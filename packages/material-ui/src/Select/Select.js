// @inheritedComponent Input

import React from 'react';
import PropTypes from 'prop-types';
import { componentPropType } from '@material-ui/utils';
import SelectInput from './SelectInput';
import formControlState from '../FormControl/formControlState';
import withFormControlContext from '../FormControl/withFormControlContext';
import withStyles from '../styles/withStyles';
import mergeClasses from '../styles/mergeClasses';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
// To replace with InputBase in v4
import Input from '../Input';
import { styles as nativeSelectStyles } from '../NativeSelect/NativeSelect';
import NativeSelectInput from '../NativeSelect/NativeSelectInput';

export const styles = nativeSelectStyles;

function Select(props) {
  const {
    autoWidth,
    children,
    classes,
    displayEmpty,
    IconComponent,
    input,
    inputProps,
    MenuProps,
    muiFormControl,
    multiple,
    native,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant,
    ...other
  } = props;

  const inputComponent = native ? NativeSelectInput : SelectInput;
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant'],
  });

  return React.cloneElement(input, {
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent,
    inputProps: {
      children,
      IconComponent,
      variant: fcs.variant,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      multiple,
      ...(native
        ? {}
        : {
            autoWidth,
            displayEmpty,
            MenuProps,
            onClose,
            onOpen,
            open,
            renderValue,
            SelectDisplayProps,
          }),
      ...inputProps,
      classes: inputProps
        ? mergeClasses({
            baseClasses: classes,
            newClasses: inputProps.classes,
            Component: Select,
          })
        : classes,
      ...(input ? input.props.inputProps : {}),
    },
    ...other,
  });
}

Select.propTypes = {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: componentPropType,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * Attributes applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Properties applied to the [`Menu`](/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: PropTypes.bool,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * Control `select` open state.
   * You can only use it when the `native` property is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   *
   * @param {*} value The `value` provided to the component.
   * @returns {ReactElement}
   */
  renderValue: PropTypes.func,
  /**
   * Properties applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The input value.
   * This property is required when the `native` property is `false` (default).
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
    ),
  ]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  IconComponent: ArrowDropDownIcon,
  input: <Input />,
  multiple: false,
  native: false,
};

Select.muiName = 'Select';

export default withStyles(styles, { name: 'MuiSelect' })(withFormControlContext(Select));
