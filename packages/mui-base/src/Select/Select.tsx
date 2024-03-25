'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  SelectListboxSlotProps,
  SelectOwnerState,
  SelectPopupSlotProps,
  SelectProps,
  SelectRootSlotProps,
  SelectType,
} from './Select.types';
import { useSelect, SelectValue } from '../useSelect';
import { useSlotProps, WithOptionalOwnerState } from '../utils';
import { Popup } from '../Unstable_Popup/Popup';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getSelectUtilityClass } from './selectClasses';
import { defaultOptionStringifier } from '../useSelect/defaultOptionStringifier';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { SelectOption } from '../useOption';
import { SelectProvider } from '../useSelect/SelectProvider';

function defaultRenderValue<OptionValue>(
  selectedOptions: SelectOption<OptionValue> | SelectOption<OptionValue>[] | null,
) {
  if (Array.isArray(selectedOptions)) {
    return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
  }

  return selectedOptions?.label ?? null;
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
    popup: ['popup'],
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
    autoComplete,
    autoFocus,
    children,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    getSerializedValue,
    listboxId,
    listboxOpen: listboxOpenProp,
    multiple = false as Multiple,
    name,
    required = false,
    onChange,
    onListboxOpenChange,
    getOptionAsString = defaultOptionStringifier,
    renderValue: renderValueProp,
    placeholder,
    slotProps = {},
    slots = {},
    value: valueProp,
    ...other
  } = props;

  const renderValue: (option: SelectValue<SelectOption<OptionValue>, Multiple>) => React.ReactNode =
    renderValueProp ?? defaultRenderValue;

  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef<HTMLElement>(null);
  const listboxRef = React.useRef<HTMLElement>(null);

  const Button = slots.root ?? 'button';
  const ListboxRoot = slots.listbox ?? 'ul';
  const PopupComponent = slots.popup ?? 'div';

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
    getHiddenInputProps,
    getOptionMetadata,
    value,
    open,
  } = useSelect({
    name,
    required,
    getSerializedValue,
    areOptionsEqual,
    buttonRef: handleButtonRef,
    defaultOpen: defaultListboxOpen,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple,
    open: listboxOpenProp,
    onChange,
    onOpenChange: onListboxOpenChange,
    getOptionAsString,
    value: valueProp,
    componentName: 'Select',
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

  const popupProps: WithOptionalOwnerState<SelectPopupSlotProps<OptionValue, Multiple>> =
    useSlotProps({
      elementType: PopupComponent,
      externalSlotProps: slotProps.popup,
      additionalProps: {
        anchor: buttonRef.current,
        keepMounted: true,
        open,
        placement: 'bottom-start' as const,
        role: undefined,
      },
      ownerState,
      className: classes.popup,
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
      <Button {...buttonProps}>
        {renderValue(selectedOptionsMetadata) ?? placeholder ?? (
          // fall back to a zero-width space to prevent layout shift
          // from https://github.com/mui/material-ui/pull/24563
          <span className="notranslate">&#8203;</span>
        )}
      </Button>
      {buttonDefined && (
        <Popup slots={{ root: PopupComponent }} {...popupProps}>
          <ListboxRoot {...listboxProps}>
            <SelectProvider value={contextValue}>{children}</SelectProvider>
          </ListboxRoot>
        </Popup>
      )}

      <input {...getHiddenInputProps()} autoComplete={autoComplete} />
    </React.Fragment>
  );
}) as SelectType;

Select.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A function used to determine if two options' values are equal.
   * By default, reference equality is used.
   *
   * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
   * Therefore, it's recommented to use the default reference equality comparison whenever possible.
   */
  areOptionsEqual: PropTypes.func,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
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
   * Text to show when there is no selected value.
   */
  placeholder: PropTypes.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, the Select cannot be empty when submitting form.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popup: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    listbox: PropTypes.elementType,
    popup: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
} as any;

export { Select };
