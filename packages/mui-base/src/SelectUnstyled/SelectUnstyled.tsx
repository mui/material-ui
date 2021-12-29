import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { SelectUnstyledOwnerState, SelectUnstyledProps } from './SelectUnstyledProps';
import { flattenOptionGroups, getOptionsFromChildren } from './utils';
import useSelect from './useSelect';
import { SelectChild, SelectOption } from './useSelectProps';
import { appendOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import { SelectUnstyledContext, SelectUnstyledContextType } from './SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from './selectUnstyledClasses';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

function useUtilityClasses(ownerState: SelectUnstyledOwnerState<any>) {
  const { active, disabled, open, focusVisible } = ownerState;

  const slots = {
    button: [
      'button',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      active && 'active',
      open && 'expanded',
    ],
    listbox: ['listbox', disabled && 'disabled'],
    option: ['option'],
  };

  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}

/**
 * The foundation for building custom-styled select components.
 */
const SelectUnstyled = React.forwardRef(function SelectUnstyled<TValue>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp,
    ...other
  } = props;

  const renderValue = props.renderValue ?? defaultRenderSingleValue;

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

  const Button = component ?? components.Root ?? 'button';
  const ListboxRoot = components.Listbox ?? 'ul';

  const handleButtonRefChange = (element: HTMLElement | null) => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);

  const handleListboxRef = (element: HTMLUListElement) => {
    if (element != null) {
      // whenever the listbox is visible, it should be focused
      element.focus();
    }
  };

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleChange = (newValue: TValue | null) => {
    onChange?.(newValue);
    setListboxOpen(false);
    buttonRef.current?.focus();
  };

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
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    listboxRef: handleListboxRef,
    onChange: handleChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
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

  const selectedOptions = React.useMemo(() => {
    return options.find((o) => value === o.value);
  }, [options, value]);

  const buttonProps = appendOwnerState(
    Button,
    {
      ...other,
      ...componentsProps.root,
      ...getButtonProps(),
      className: clsx(className, componentsProps.root?.className, classes.button),
    },
    ownerState,
  );

  const listboxProps = appendOwnerState(
    ListboxRoot,
    {
      ...componentsProps.listbox,
      ...getListboxProps(),
      className: clsx(componentsProps.listbox?.className, classes.listbox),
    },
    ownerState,
  );

  const context: SelectUnstyledContextType = {
    getOptionProps,
    getOptionState,
  };

  return (
    <React.Fragment>
      <Button {...buttonProps}>{renderValue(selectedOptions as any)}</Button>
      {buttonDefined && (
        <PopperUnstyled
          open={listboxOpen}
          anchorEl={buttonRef.current}
          placement="bottom-start"
          disablePortal
          role={undefined}
        >
          <ListboxRoot {...listboxProps}>
            <SelectUnstyledContext.Provider value={context}>
              {children}
            </SelectUnstyledContext.Provider>
          </ListboxRoot>
        </PopperUnstyled>
      )}
    </React.Fragment>
  );
});

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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.object,
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Id of the listbox element.
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
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.object,
} as any;

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [SelectUnstyled API](https://mui.com/api/select-unstyled/)
 */
export default SelectUnstyled as <TValue extends {}>(
  props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLElement>,
) => JSX.Element | null;
