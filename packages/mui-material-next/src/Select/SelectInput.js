'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MuiError from '@mui-internal/babel-macros/MuiError.macro';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import {
  refType,
  unstable_useId as useId,
  unstable_capitalize as capitalize,
  unstable_ownerDocument as ownerDocument,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { shouldForwardProp } from '@mui/system';
import { useSlotProps } from '@mui/base/utils';
import { useSelect, SelectProvider } from '@mui/base/useSelect';
import {
  nativeSelectSelectStyles,
  nativeSelectIconStyles,
} from '@mui/material/NativeSelect/NativeSelectInput';
// TODO v6: replace with material-next Popover component when available
import Popover from '@mui/material/Popover';
// TODO v6: replace with material-next List component when available
import List from '@mui/material/List';
import ButtonBase from '../ButtonBase';
import { isFilled } from '../InputBase/utils';
import styled from '../styles/styled';
import selectClasses, { getSelectUtilityClasses } from './selectClasses';

const SelectSelect = styled(ButtonBase, {
  name: 'MuiSelect',
  slot: 'Select',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      // Win specificity over the input base
      { [`&.${selectClasses.select}`]: styles.select },
      { [`&.${selectClasses.select}`]: styles[ownerState.variant] },
      { [`&.${selectClasses.error}`]: styles.error },
      { [`&.${selectClasses.multiple}`]: styles.multiple },
    ];
  },
})(nativeSelectSelectStyles, {
  textAlign: 'left',
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: 'auto', // Resets for multiple select with chips
    minHeight: '1.4375em', // Required for select\text-field height consistency
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const SelectIcon = styled('svg', {
  name: 'MuiSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.icon,
      ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`],
      ownerState.open && styles.iconOpen,
    ];
  },
})(nativeSelectIconStyles);

const SelectNativeInput = styled('input', {
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'classes',
  name: 'MuiSelect',
  slot: 'NativeInput',
  overridesResolver: (props, styles) => styles.nativeInput,
})({
  bottom: 0,
  left: 0,
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: '100%',
  boxSizing: 'border-box',
});

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

function isEmpty(display) {
  return display == null || (typeof display === 'string' && !display.trim());
}

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, open, error } = ownerState;

  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled'],
    nativeInput: ['nativeInput'],
  };

  return composeClasses(slots, getSelectUtilityClasses, classes);
};

const v5CompatibleValueParser = (value, multiple, displayEmpty) => {
  if (multiple && !Array.isArray(value)) {
    return [];
  }

  if (value === '' && !displayEmpty) {
    return null;
  }

  return value;
};

const v5CompatibleFormValueProvider = (selectedOption) => {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return '';
    }

    return selectedOption.map((o) => o.value).join(',');
  }

  if (selectedOption?.value == null) {
    return '';
  }

  return selectedOption.value;
};

/**
 * @ignore - internal component.
 */
const SelectInput = React.forwardRef(function SelectInput(props, ref) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultOpen,
    defaultValue,
    disabled: disabledProp,
    displayEmpty,
    error = false,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    // TODO v7: implement MenuProps autoFocus functionality
    // TODO v7: implement MenuProps disableAutoFocusItem functionality
    PopoverProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    // catching `type` from Input which makes no sense for SelectInput
    type,
    value: valueProp,
    variant = 'standard',
    ...other
  } = props;

  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const [displayNode, setDisplayNode] = React.useState(null);
  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const handleRef = useForkRef(ref, inputRefProp);

  const listboxId = useId();

  const handleDisplayRef = React.useCallback((node) => {
    displayRef.current = node;

    if (node) {
      setDisplayNode(node);
    }
  }, []);

  const anchorElement = displayNode?.parentNode;

  const handleOpenChange = React.useCallback(
    (isOpen) => {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
      if (!isOpenControlled) {
        setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      }
    },
    [onClose, onOpen, isOpenControlled, setMenuMinWidthState, autoWidth, anchorElement],
  );

  const handleChange = (event, newValue) => {
    if (onChange) {
      const nativeEvent = event.nativeEvent || event;
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value: newValue, name },
      });
      onChange(clonedEvent);
    }
  };

  const {
    disabled,
    getButtonProps,
    getHiddenInputProps,
    getListboxProps,
    getOptionMetadata,
    contextValue,
    open: openState,
    value,
  } = useSelect({
    areOptionsEqual: areEqualValues,
    buttonRef: handleDisplayRef,
    defaultOpen,
    defaultValue: v5CompatibleValueParser(defaultValue, multiple, displayEmpty),
    disabled: disabledProp,
    getSerializedValue: v5CompatibleFormValueProvider,
    listboxId,
    onChange: handleChange,
    onOpenChange: handleOpenChange,
    open: openProp,
    value: v5CompatibleValueParser(valueProp, multiple, displayEmpty),
    multiple,
    name,
  });

  React.useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        displayRef.current.focus();
      },
      node: inputRef.current,
      value,
    }),
    [value],
  );

  // Resize menu on `defaultOpen` automatic toggle.
  React.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNode, autoWidth]);
  // `isOpenControlled` is ignored because the component should never switch between controlled and uncontrolled modes.
  // `defaultOpen` and `openState` are ignored to avoid unnecessary callbacks.
  React.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (!labelId) {
      return undefined;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener('click', handler);
      return () => {
        label.removeEventListener('click', handler);
      };
    }
    return undefined;
  }, [labelId]);

  const handleClick = (event) => {
    // Ignore everything but left-click
    if (event.button !== 0 || readOnly) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleKeyDown = (event) => {
    if (readOnly) {
      event.defaultMuiPrevented = true;
    }
  };

  const open = displayNode !== null && openState;

  const handleBlur = (event) => {
    // if open event.stopImmediatePropagation
    if (!open && onBlur) {
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, 'target', { writable: true, value: { value, name } });
      onBlur(event);
    }
  };

  delete other['aria-invalid'];

  let display;
  let computeDisplay = false;

  // No need to display any value if the field is empty.
  if (isFilled({ value }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  React.useEffect(() => {
    if (multiple) {
      if (!Array.isArray(valueProp)) {
        throw new MuiError(
          'MUI: The `value` prop must be an array ' +
            'when using the `Select` component with `multiple`.',
        );
      }
    }
  }, [multiple, valueProp]);

  if (computeDisplay) {
    if (multiple) {
      if (value.length === 0) {
        display = null;
      } else {
        display = value.reduce((acc, selectedValue, index) => {
          const optionMetadata = getOptionMetadata(selectedValue);
          if (optionMetadata?.label) {
            acc.push(optionMetadata.label);
          }
          if (index < value.length - 1) {
            acc.push(', ');
          }
          return acc;
        }, []);
      }
    } else {
      const optionMetadata = getOptionMetadata(value);
      display = optionMetadata?.label ?? null;
    }
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;

  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : undefined);

  const ownerState = {
    ...props,
    variant,
    value,
    open,
    error,
  };

  const classes = useUtilityClasses(ownerState);

  const paperProps = {
    ...PopoverProps.PaperProps,
    ...PopoverProps.slotProps?.paper,
  };

  const buttonProps = useSlotProps({
    elementType: SelectSelect,
    getSlotProps: () =>
      getButtonProps({
        onKeyDown: handleKeyDown,
        onClick: handleClick,
        onBlur: handleBlur,
      }),
    externalForwardedProps: {},
    externalSlotProps: {},
    additionalProps: {
      disableRipple: false,
    },
    ownerState,
  });

  const hiddenInputProps = useSlotProps({
    elementType: SelectNativeInput,
    getSlotProps: () =>
      getHiddenInputProps({
        style: undefined,
      }),
    externalForwardedProps: other,
    externalSlotProps: {},
    additionalProps: {},
    ownerState,
  });

  return (
    <React.Fragment>
      <SelectSelect
        {...buttonProps}
        tabIndex={tabIndex}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={[labelId, buttonId].filter(Boolean).join(' ') || undefined}
        aria-describedby={ariaDescribedby}
        onFocus={onFocus}
        {...SelectDisplayProps}
        className={clsx(SelectDisplayProps.className, classes.select, className)}
        // The id is required for proper a11y
        id={buttonId}
      >
        {/* So the vertical align positioning algorithm kicks in. */}
        {isEmpty(display) ? (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className="notranslate">&#8203;</span>
        ) : (
          display
        )}
      </SelectSelect>
      <SelectNativeInput
        {...hiddenInputProps}
        aria-invalid={error}
        ref={inputRef}
        disabled={disabled}
        className={classes.nativeInput}
        autoFocus={autoFocus}
      />
      <SelectIcon as={IconComponent} className={classes.icon} ownerState={ownerState} />
      {anchorElement && (
        <Popover
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          keepMounted
          disableAutoFocus
          {...PopoverProps}
          slotProps={{
            ...PopoverProps.slotProps,
            paper: {
              ...paperProps,
              style: {
                minWidth: menuMinWidth,
                ...(paperProps != null ? paperProps.style : null),
              },
            },
          }}
        >
          <List {...getListboxProps()} aria-hidden={!open} aria-labelledby={labelId}>
            <SelectProvider value={contextValue}>{children}</SelectProvider>
          </List>
        </Popover>
      )}
    </React.Fragment>
  );
});

SelectInput.propTypes = {
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: refType,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
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
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Props applied to the [`Propover`](/material-ui/api/popover/) element.
   */
  PopoverProps: PropTypes.object,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
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
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  type: PropTypes.any,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default SelectInput;
