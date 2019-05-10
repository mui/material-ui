import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import Menu from '../Menu/Menu';
import { isFilled } from '../InputBase/utils';
import { useForkRef } from '../utils/reactHelpers';

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

/**
 * @ignore - internal component.
 */
const SelectInput = React.forwardRef(function SelectInput(props, ref) {
  const {
    autoFocus,
    autoWidth,
    children,
    classes,
    className,
    disabled,
    displayEmpty,
    IconComponent,
    inputRef,
    MenuProps = {},
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
    required,
    SelectDisplayProps,
    tabIndex: tabIndexProp,
    type = 'hidden',
    value,
    variant,
    ...other
  } = props;
  const displayRef = React.useRef(null);
  const ignoreNextBlur = React.useRef(false);
  const { current: isOpenControlled } = React.useRef(props.open != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const [openState, setOpenState] = React.useState(false);
  const [, forceUpdate] = React.useState(0);
  const handleRef = useForkRef(ref, inputRef);

  React.useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        displayRef.current.focus();
      },
      node: inputRef ? inputRef.current : null,
      value,
    }),
    [inputRef, value],
  );

  React.useEffect(() => {
    if (isOpenControlled && openProp) {
      // Focus the display node so the focus is restored on this element once
      // the menu is closed.
      displayRef.current.focus();
      // Rerender with the resolve `displayRef` reference.
      forceUpdate(n => !n);
    }

    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus, isOpenControlled, openProp]);

  const update = (open, event) => {
    if (open) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }

    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : displayRef.current.clientWidth);
      setOpenState(open);
    }
  };

  const handleClick = event => {
    // Opening the menu is going to blur the. It will be focused back when closed.
    ignoreNextBlur.current = true;
    update(true, event);
  };

  const handleClose = event => {
    update(false, event);
  };

  const handleItemClick = child => event => {
    if (!multiple) {
      update(false, event);
    }

    if (onChange) {
      let newValue;

      if (multiple) {
        newValue = Array.isArray(value) ? [...value] : [];
        const itemIndex = value.indexOf(child.props.value);
        if (itemIndex === -1) {
          newValue.push(child.props.value);
        } else {
          newValue.splice(itemIndex, 1);
        }
      } else {
        newValue = child.props.value;
      }

      event.persist();
      event.target = { value: newValue, name };
      onChange(event, child);
    }
  };

  const handleBlur = event => {
    if (ignoreNextBlur.current === true) {
      // The parent components are relying on the bubbling of the event.
      event.stopPropagation();
      ignoreNextBlur.current = false;
      return;
    }

    if (onBlur) {
      event.persist();
      event.target = { value, name };
      onBlur(event);
    }
  };

  const handleKeyDown = event => {
    if (!readOnly) {
      const validKeys = [
        ' ',
        'ArrowUp',
        'ArrowDown',
        // The native select doesn't respond to enter on MacOS, but it's recommended by
        // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        'Enter',
      ];

      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        // Opening the menu is going to blur the. It will be focused back when closed.
        ignoreNextBlur.current = true;
        update(true, event);
      }
    }
  };

  const open = isOpenControlled && displayRef.current ? openProp : openState;

  delete other['aria-invalid'];

  let display;
  let displaySingle = '';
  const displayMultiple = [];
  let computeDisplay = false;

  // No need to display any value if the field is empty.
  if (isFilled(props) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    warning(
      child.type !== React.Fragment,
      [
        "Material-UI: the Select component doesn't accept a Fragment as a child.",
        'Consider providing an array instead.',
      ].join('\n'),
    );

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(
          'Material-UI: the `value` property must be an array ' +
            'when using the `Select` component with `multiple`.',
        );
      }

      selected = value.some(v => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    return React.cloneElement(child, {
      onClick: handleItemClick(child),
      role: 'option',
      selected,
      value: undefined, // The value is most likely not a valid HTML attribute.
      'data-value': child.props.value, // Instead, we provide it as a data attribute.
    });
  });

  if (computeDisplay) {
    display = multiple ? displayMultiple.join(', ') : displaySingle;
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;

  if (!autoWidth && isOpenControlled.current && displayRef.current) {
    menuMinWidth = displayRef.current.clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.select,
          classes.selectMenu,
          {
            [classes.disabled]: disabled,
            [classes.filled]: variant === 'filled',
            [classes.outlined]: variant === 'outlined',
          },
          className,
        )}
        ref={displayRef}
        data-mui-test="SelectDisplay"
        aria-pressed={open ? 'true' : 'false'}
        tabIndex={tabIndex}
        role="button"
        aria-owns={open ? `menu-${name || ''}` : undefined}
        aria-haspopup="true"
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onClick={disabled || readOnly ? null : handleClick}
        onFocus={onFocus}
        // The id can help with end-to-end testing automation.
        id={name ? `select-${name}` : undefined}
        {...SelectDisplayProps}
      >
        {/* So the vertical align positioning algorithm kicks in. */}
        {/* eslint-disable-next-line react/no-danger */}
        {display != null ? display : <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />}
      </div>
      <input
        value={Array.isArray(value) ? value.join(',') : value}
        name={name}
        ref={handleRef}
        type={type}
        autoFocus={autoFocus}
        {...other}
      />
      <IconComponent className={classes.icon} />
      <Menu
        id={`menu-${name || ''}`}
        anchorEl={displayRef.current}
        open={open}
        onClose={handleClose}
        {...MenuProps}
        MenuListProps={{
          role: 'listbox',
          disableListWrap: true,
          ...MenuProps.MenuListProps,
        }}
        PaperProps={{
          ...MenuProps.PaperProps,
          style: {
            minWidth: menuMinWidth,
            ...(MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null),
          },
        }}
      >
        {items}
      </Menu>
    </div>
  );
});

SelectInput.propTypes = {
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
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
  classes: PropTypes.object.isRequired,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the select will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType,
  /**
   * Use that property to pass a ref callback to the native select element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Properties applied to the [`Menu`](/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
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
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {object} [child] The react element that was selected.
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
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * Control `select` open state.
   */
  open: PropTypes.bool,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
   *
   * @param {*} value The `value` provided to the component.
   * @returns {ReactElement}
   */
  renderValue: PropTypes.func,
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * Properties applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The input value.
   */
  value: PropTypes.any.isRequired,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default SelectInput;
