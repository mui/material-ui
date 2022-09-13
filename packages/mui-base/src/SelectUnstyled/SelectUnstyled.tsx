import * as React from 'react';
import PropTypes from 'prop-types';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import {
  SelectUnstyledListboxSlotProps,
  SelectUnstyledOwnerState,
  SelectUnstyledPopperSlotProps,
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
  SelectUnstyledType,
} from './SelectUnstyled.types';
import { flattenOptionGroups, getOptionsFromChildren } from './utils';
import useSelect from '@mui/base/useSelect';
import { SelectChild, SelectOption } from '@mui/base/useSelect';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import { SelectUnstyledContext, SelectUnstyledContextType } from './SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from './selectUnstyledClasses';
import defaultOptionStringifier from './defaultOptionStringifier';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

function defaultFormValueProvider<TValue>(selectedOption: SelectOption<TValue> | null) {
  if (selectedOption?.value == null) {
    return '';
  }

  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }

  return JSON.stringify(selectedOption.value);
}

function useUtilityClasses(ownerState: SelectUnstyledOwnerState<any>) {
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

  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Unstyled Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [SelectUnstyled API](https://mui.com/base/api/select-unstyled/)
 */
const SelectUnstyled = React.forwardRef(function SelectUnstyled<TValue extends {}>(
  props: SelectUnstyledProps<TValue>,
  forwardedRef: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    getSerializedValue = defaultFormValueProvider,
    listboxId,
    listboxOpen: listboxOpenProp,
    name,
    onChange,
    onListboxOpenChange,
    optionStringifier = defaultOptionStringifier,
    renderValue: renderValueProp,
    value: valueProp,
    ...other
  } = props;

  const renderValue = renderValueProp ?? defaultRenderSingleValue;

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen',
  });

  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const listboxRef = React.useRef<HTMLElement>(null);

  const Button = component ?? components.Root ?? 'button';
  const ListboxRoot = components.Listbox ?? 'ul';
  const Popper = components.Popper ?? PopperUnstyled;

  const handleButtonRefChange = React.useCallback((element: HTMLElement | null) => {
    setButtonDefined(element != null);
  }, []);

  const handleButtonRef = useForkRef(forwardedRef, useForkRef(buttonRef, handleButtonRefChange));

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = (isOpen: boolean) => {
    setListboxOpen(isOpen);
    onListboxOpenChange?.(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value,
  } = useSelect({
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    optionStringifier,
    value: valueProp,
  });

  const ownerState: SelectUnstyledOwnerState<TValue> = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value,
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOption = React.useMemo(() => {
    return options.find((o) => value === o.value) ?? null;
  }, [options, value]);

  const buttonProps: WithOptionalOwnerState<SelectUnstyledRootSlotProps<TValue>> = useSlotProps({
    elementType: Button,
    getSlotProps: getButtonProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
  });

  const listboxProps: WithOptionalOwnerState<SelectUnstyledListboxSlotProps<TValue>> = useSlotProps(
    {
      elementType: ListboxRoot,
      getSlotProps: getListboxProps,
      externalSlotProps: componentsProps.listbox,
      additionalProps: {
        ref: listboxRef,
      },
      ownerState,
      className: classes.listbox,
    },
  );

  const popperProps: SelectUnstyledPopperSlotProps<TValue> = useSlotProps({
    elementType: Popper,
    externalSlotProps: componentsProps.popper,
    additionalProps: {
      anchorEl: buttonRef.current,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom-start' as const,
      role: undefined,
    },
    ownerState,
    className: classes.popper,
  });

  const context: SelectUnstyledContextType = {
    getOptionProps,
    getOptionState,
    listboxRef,
  };

  return (
    <React.Fragment>
      <Button {...buttonProps}>{renderValue(selectedOption as any)}</Button>
      {buttonDefined && (
        <Popper {...popperProps}>
          <ListboxRoot {...listboxProps}>
            <SelectUnstyledContext.Provider value={context}>
              {children}
            </SelectUnstyledContext.Provider>
          </ListboxRoot>
        </Popper>
      )}

      {name && <input type="hidden" name={name} value={getSerializedValue(selectedOption)} />}
    </React.Fragment>
  );
}) as SelectUnstyledType;

SelectUnstyled.propTypes /* remove-proptypes */ = {
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
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
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
   * Also used to derive the `id` attributes of options.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
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
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
} as any;

export default SelectUnstyled;
