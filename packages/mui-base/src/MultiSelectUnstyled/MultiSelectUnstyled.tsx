import * as React from 'react';
import PropTypes from 'prop-types';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import {
  MultiSelectUnstyledProps,
  MultiSelectUnstyledListboxSlotProps,
  MultiSelectUnstyledOwnerState,
  MultiSelectUnstyledPopperSlotProps,
  MultiSelectUnstyledRootSlotProps,
  MultiSelectUnstyledType,
} from './MultiSelectUnstyled.types';
import { flattenOptionGroups, getOptionsFromChildren } from '../SelectUnstyled/utils';
import useSelect from '../SelectUnstyled/useSelect';
import { SelectChild, SelectOption } from '../SelectUnstyled/useSelect.types';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import {
  SelectUnstyledContext,
  SelectUnstyledContextType,
} from '../SelectUnstyled/SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from '../SelectUnstyled/selectUnstyledClasses';

function defaultRenderMultipleValues<TValue>(selectedOptions: SelectOption<TValue>[]) {
  return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
}

function useUtilityClasses(ownerState: MultiSelectUnstyledOwnerState<any>) {
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
 * The foundation for building custom-styled multi-selection select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [MultiSelectUnstyled API](https://mui.com/base/api/multi-select-unstyled/)
 */
const MultiSelectUnstyled = React.forwardRef(function MultiSelectUnstyled<TValue>(
  props: MultiSelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp,
    ...other
  } = props;

  const renderValue = props.renderValue ?? defaultRenderMultipleValues;

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'MultiSelectUnstyled',
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

  const handleButtonRefChange = (element: HTMLElement | null) => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);

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
  } = useSelect<TValue>({
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: true,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState: MultiSelectUnstyledOwnerState<TValue> = {
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

  const selectedOptions = React.useMemo(() => {
    if (value == null) {
      return [];
    }
    return options.filter((o) => (value as TValue[]).includes(o.value));
  }, [options, value]);

  const buttonProps: WithOptionalOwnerState<MultiSelectUnstyledRootSlotProps<TValue>> =
    useSlotProps({
      elementType: Button,
      getSlotProps: getButtonProps,
      externalSlotProps: componentsProps.root,
      externalForwardedProps: other,
      ownerState,
      className: classes.root,
    });

  const listboxProps: WithOptionalOwnerState<MultiSelectUnstyledListboxSlotProps<TValue>> =
    useSlotProps({
      elementType: ListboxRoot,
      getSlotProps: getListboxProps,
      externalSlotProps: componentsProps.listbox,
      additionalProps: {
        ref: listboxRef,
      },
      ownerState,
      className: classes.listbox,
    });

  const popperProps: MultiSelectUnstyledPopperSlotProps<TValue> = useSlotProps({
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
      <Button {...buttonProps}>{renderValue(selectedOptions as any)}</Button>
      {buttonDefined && (
        <Popper {...popperProps}>
          <ListboxRoot {...listboxProps}>
            <SelectUnstyledContext.Provider value={context}>
              {children}
            </SelectUnstyledContext.Provider>
          </ListboxRoot>
        </Popper>
      )}
    </React.Fragment>
  );
}) as MultiSelectUnstyledType;

MultiSelectUnstyled.propTypes /* remove-proptypes */ = {
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
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
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
   * The default selected values. Use when the component is not controlled.
   * @default []
   */
  defaultValue: PropTypes.array,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
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
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Function that customizes the rendering of the selected values.
   */
  renderValue: PropTypes.func,
  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value: PropTypes.array,
} as any;

export default MultiSelectUnstyled;
