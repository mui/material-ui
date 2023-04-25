import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  SelectListboxSlotProps,
  SelectOwnerState,
  SelectPopperSlotProps,
  SelectProps,
  SelectRootSlotProps,
  SelectType,
} from './Select.types';
import useSelect, { SelectValue } from '../useSelect';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import Popper from '../Popper';
import composeClasses from '../composeClasses';
import { getSelectUtilityClass } from './selectClasses';
import defaultOptionStringifier from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { SelectOption } from '../useOption';
import SelectProvider from '../useSelect/SelectProvider';

function defaultRenderValue<OptionValue>(
  selectedOptions: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null,
) {
  if (Array.isArray(selectedOptions)) {
    return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
  }

  return selectedOptions?.label ?? '';
}

function defaultFormValueProvider<OptionValue>(
  selectedOption: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null,
) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return '';
    }

    if (
      selectedOption.every(
        (o) =>
          typeof o.value === 'string' ||
          typeof o.value === 'number' ||
          typeof o.value === 'boolean',
      )
    ) {
      return selectedOption.map((o) => String(o.value));
    }

    return JSON.stringify(selectedOption.map((o) => o.value));
  }

  if (selectedOption?.value == null) {
    return '';
  }

  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }

  return JSON.stringify(selectedOption.value);
}

function useUtilityClasses(ownerState: SelectOwnerState<any, any>) {
  const { active, disabled, open, focusVisible } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      active && 'active',
      open && 'expanded',
    ],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper'],
  };

  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/base/react-select/components-api/#select)
 */
const Select = React.forwardRef(function Select<OptionValue extends {}, Multiple extends boolean>(
  props: SelectProps<OptionValue, Multiple>,
  forwardedRef: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    component,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    getSerializedValue = defaultFormValueProvider,
    listboxId,
    listboxOpen: listboxOpenProp,
    multiple = false as Multiple,
    name,
    onChange,
    onListboxOpenChange,
    optionStringifier = defaultOptionStringifier,
    renderValue: renderValueProp,
    slotProps = {},
    slots = {},
    value: valueProp,
    ...other
  } = props;

  const renderValue: (option: SelectValue<SelectOption<OptionValue>, Multiple>) => React.ReactNode =
    renderValueProp ?? defaultRenderValue;

  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const listboxRef = React.useRef<HTMLElement>(null);

  const Button = component ?? slots.root ?? 'button';
  const ListboxRoot = slots.listbox ?? 'ul';
  const PopperComponent = slots.popper ?? Popper;

  const handleButtonRefChange = React.useCallback((element: HTMLElement | null) => {
    setButtonDefined(element != null);
  }, []);

  const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    value,
    open,
  } = useSelect({
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple,
    open: listboxOpenProp,
    onChange,
    onOpenChange: onListboxOpenChange,
    optionStringifier,
    value: valueProp,
  });

  const ownerState: SelectOwnerState<OptionValue, Multiple> = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open,
    multiple,
    renderValue,
    value,
  };

  const classes = useUtilityClasses(ownerState);

  const buttonProps: WithOptionalOwnerState<SelectRootSlotProps<OptionValue, Multiple>> =
    useSlotProps({
      elementType: Button,
      getSlotProps: getButtonProps,
      externalSlotProps: slotProps.root,
      externalForwardedProps: other,
      ownerState,
      className: classes.root,
    });

  const listboxProps: WithOptionalOwnerState<SelectListboxSlotProps<OptionValue, Multiple>> =
    useSlotProps({
      elementType: ListboxRoot,
      getSlotProps: getListboxProps,
      externalSlotProps: slotProps.listbox,
      additionalProps: {
        ref: listboxRef,
      },
      ownerState,
      className: classes.listbox,
    });

  const popperProps: WithOptionalOwnerState<SelectPopperSlotProps<OptionValue, Multiple>> =
    useSlotProps({
      elementType: PopperComponent,
      externalSlotProps: slotProps.popper,
      additionalProps: {
        anchorEl: buttonRef.current,
        keepMounted: true,
        open,
        placement: 'bottom-start' as const,
        role: undefined,
      },
      ownerState,
      className: classes.popper,
    });

  let selectedOptionsMetadata: SelectValue<SelectOption<OptionValue>, Multiple>;
  if (multiple) {
    selectedOptionsMetadata = (value as OptionValue[])
      .map((v) => getOptionMetadata(v))
      .filter((o) => o !== undefined) as SelectValue<SelectOption<OptionValue>, Multiple>;
  } else {
    selectedOptionsMetadata = (getOptionMetadata(value as OptionValue) ?? null) as SelectValue<
      SelectOption<OptionValue>,
      Multiple
    >;
  }

  return (
    <React.Fragment>
      <Button {...buttonProps}>{renderValue(selectedOptionsMetadata)}</Button>
      {buttonDefined && (
        <PopperComponent {...popperProps}>
          <ListboxRoot {...listboxProps}>
            <SelectProvider value={contextValue}>{children}</SelectProvider>
          </ListboxRoot>
        </PopperComponent>
      )}

      {name && (
        <input type="hidden" name={name} value={getSerializedValue(selectedOptionsMetadata)} />
      )}
    </React.Fragment>
  );
}) as SelectType;

Select.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: PropTypes.func,
  /**
   * `id` attribute of the listbox element.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
   *
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name: PropTypes.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  optionStringifier: PropTypes.func,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
} as any;

export default Select;
