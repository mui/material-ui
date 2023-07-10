import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  SelectListboxSlotProps,
  SelectOwnerState,
  SelectProps,
  SelectRootSlotProps,
  SelectType,
} from './Select.types';
import useSelect, { SelectValue } from '../useSelect';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getSelectUtilityClass } from './selectClasses';
import defaultOptionStringifier from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { SelectOption } from '../useOption';
import SelectProvider from '../useSelect/SelectProvider';
import Portal from '../Portal';

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

function useUtilityClasses<OptionValue extends {}, Multiple extends boolean>(
  ownerState: SelectOwnerState<OptionValue, Multiple>,
) {
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
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/base-ui/react-select/components-api/#select)
 */
const Select = React.forwardRef(function Select<
  OptionValue extends {},
  Multiple extends boolean,
  RootComponentType extends React.ElementType,
>(
  props: SelectProps<OptionValue, Multiple, RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    areOptionsEqual,
    autoFocus,
    children,
    defaultListboxOpen = false,
    defaultValue,
    disabled: disabledProp,
    disablePortal = false,
    getOptionAsString = defaultOptionStringifier,
    getSerializedValue = defaultFormValueProvider,
    listboxId,
    listboxOpen: listboxOpenProp,
    multiple = false as Multiple,
    name,
    onChange,
    onListboxOpenChange,
    popupSettings = {},
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

  const Button = slots.root ?? 'button';
  const Listbox = slots.listbox ?? 'ul';

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
    areOptionsEqual,
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    getOptionAsString,
    listboxId,
    multiple,
    onChange,
    onOpenChange: onListboxOpenChange,
    open: listboxOpenProp,
    popupSettings,
    value: valueProp,
  });

  const ownerState: SelectOwnerState<OptionValue, Multiple> = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    disablePortal,
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
      elementType: Listbox,
      getSlotProps: getListboxProps,
      externalSlotProps: slotProps.listbox,
      additionalProps: {
        ref: listboxRef,
      },
      ownerState,
      className: classes.listbox,
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
        <Portal disablePortal={disablePortal}>
          <Listbox {...listboxProps}>
            <SelectProvider value={contextValue}>{children}</SelectProvider>
          </Listbox>
        </Portal>
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
   * A function used to determine if two options' values are equal.
   * By default, reference equality is used.
   *
   * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
   * Therefore, it's recommented to use the default reference equality comparison whenever possible.
   */
  areOptionsEqual: PropTypes.func,
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
   * If `true`, the listbox will be mounted next to the button DOM node.
   * Otherwise (and by default), it is placed in a portal appended to the `body` element.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  getOptionAsString: PropTypes.func,
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
   * Listbox popup rendering settings.
   * They are passed to the underlying [Floating UI's](https://floating-ui.com/) `useFloating` hook.
   *
   * @default {}
   */
  popupSettings: PropTypes.shape({
    middleware: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf([false]),
        PropTypes.shape({
          fn: PropTypes.func.isRequired,
          name: PropTypes.string.isRequired,
          options: PropTypes.any,
        }),
      ]),
    ),
    offset: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.shape({
        alignmentAxis: PropTypes.number,
        crossAxis: PropTypes.number,
        mainAxis: PropTypes.number,
      }),
    ]),
    placement: PropTypes.oneOf([
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
  }),
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
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
} as any;

export default Select;
