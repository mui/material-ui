import * as React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '@material-ui/styles';
import SelectInput from './SelectInput';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import withStyles from '../styles/withStyles';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import NativeSelectInput from '../NativeSelect/NativeSelectInput';
import FilledInput from '../FilledInput';
import OutlinedInput from '../OutlinedInput';

export const styles = (theme) => ({
  /* Styles applied to the select component `root` class. */
  root: {},
  /* Styles applied to the select component `select` class. */
  select: {
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0, // Reset
    minWidth: 16, // So it doesn't collapse.
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      backgroundColor:
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0, // Reset Chrome style
    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none',
    },
    '&$disabled': {
      cursor: 'default',
    },
    '&[multiple]': {
      height: 'auto',
    },
    '&:not([multiple]) option, &:not([multiple]) optgroup': {
      backgroundColor: theme.palette.background.paper,
    },
    // Bump specificity to allow extending custom inputs
    '&&': {
      paddingRight: 24,
    },
  },
  /* Styles applied to the select component if `variant="filled"`. */
  filled: {
    '&&': {
      paddingRight: 32,
    },
  },
  /* Styles applied to the select component if `variant="outlined"`. */
  outlined: {
    borderRadius: theme.shape.borderRadius,
    '&:focus': {
      borderRadius: theme.shape.borderRadius, // Reset the reset for Chrome style
    },
    '&&': {
      paddingRight: 32,
    },
  },
  /* Styles applied to the select component `selectMenu` class. */
  selectMenu: {
    height: 'auto', // Resets for multipile select with chips
    minHeight: '1.4375em', // Required for select\text-field height consistency
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  /* Pseudo-class applied to the select component `disabled` class. */
  disabled: {},
  /* Styles applied to the icon component. */
  icon: {
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 12px)', // Center vertically
    pointerEvents: 'none', // Don't block pointer events on the select under the icon.
    color: theme.palette.action.active,
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the icon component if the popup is open. */
  iconOpen: {
    transform: 'rotate(180deg)',
  },
  /* Styles applied to the icon component if `variant="filled"`. */
  iconFilled: {
    right: 7,
  },
  /* Styles applied to the icon component if `variant="outlined"`. */
  iconOutlined: {
    right: 7,
  },
  /* Styles applied to the underlying native input component. */
  nativeInput: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
});

const Select = React.forwardRef(function Select(props, ref) {
  const {
    autoWidth = false,
    children,
    classes,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    labelWidth = 0,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = 'standard',
    ...other
  } = props;

  const inputComponent = native ? NativeSelectInput : SelectInput;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant'],
  });

  const variant = fcs.variant || variantProps;

  const InputComponent =
    input ||
    {
      standard: <Input />,
      outlined: <OutlinedInput label={label} labelWidth={labelWidth} />,
      filled: <FilledInput />,
    }[variant];

  return React.cloneElement(InputComponent, {
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent,
    inputProps: {
      children,
      IconComponent,
      variant,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      multiple,
      ...(native
        ? { id }
        : {
            autoWidth,
            displayEmpty,
            labelId,
            MenuProps,
            onClose,
            onOpen,
            open,
            renderValue,
            SelectDisplayProps: { id, ...SelectDisplayProps },
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
    ref,
    ...other,
  });
});

Select.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: PropTypes.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   */
  label: PropTypes.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * See [OutlinedInput#label](/api/outlined-input/#props)
   * @default 0
   */
  labelWidth: PropTypes.number,
  /**
   * Props applied to the [`Menu`](/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: PropTypes.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

Select.muiName = 'Select';

export default withStyles(styles, { name: 'MuiSelect' })(Select);
