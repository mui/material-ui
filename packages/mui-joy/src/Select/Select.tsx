import * as React from 'react';
import PropTypes from 'prop-types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import {
  useSelect,
  SelectUnstyledContext,
  flattenOptionGroups,
  getOptionsFromChildren,
} from '@mui/base/SelectUnstyled';
import type {
  SelectUnstyledContextType,
  SelectChild,
  SelectOption,
} from '@mui/base/SelectUnstyled';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { ButtonRoot } from '../Button/Button';
import List from '../List/List';
import Sheet from '../Sheet/Sheet';
import { styled, useThemeProps } from '../styles';
import { SelectProps } from './SelectProps';
import { getSelectUtilityClass } from './selectClasses';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

const useUtilityClasses = (ownerState: SelectProps<any> & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, size, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper'],
  };

  return composeClasses(slots, getSelectUtilityClass, {});
};

const SelectRoot = styled(ButtonRoot, {
  name: 'JoySelect',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SelectProps<any> }>({});

const SelectPopper = styled(PopperUnstyled, {
  name: 'JoySelect',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: SelectProps<any> }>({});

const SelectListbox = styled(List, {
  name: 'JoySelect',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => styles.endIcon,
})<{ ownerState: SelectProps<any> }>({});

const Select = React.forwardRef(function Select<TValue>(
  inProps: SelectProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoySelect',
  });

  const {
    autoFocus,
    children,
    component,
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
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
    value: valueProp,
  });

  const ownerState = {
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

  const buttonProps = useSlotProps({
    elementType: SelectRoot,
    getSlotProps: getButtonProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
  });

  const listboxProps = useSlotProps({
    elementType: SelectListbox,
    getSlotProps: getListboxProps,
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      ref: listboxRef,
    },
    ownerState,
    className: classes.listbox,
  });

  const popperProps = useSlotProps({
    elementType: SelectPopper,
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
      <SelectRoot {...(buttonProps as { ownerState: SelectProps<any> })}>
        {renderValue(selectedOptions!)}
      </SelectRoot>
      {buttonDefined && (
        <SelectPopper component={Sheet} {...popperProps}>
          <SelectListbox {...listboxProps}>
            <SelectUnstyledContext.Provider value={context}>
              {children}
            </SelectUnstyledContext.Provider>
          </SelectListbox>
        </SelectPopper>
      )}
    </React.Fragment>
  );
});

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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    popper: PropTypes.object,
    root: PropTypes.object,
  }),
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
   * If `true`, the component is disabled.
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
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.object,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Select;
