import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import { componentPropType } from '@material-ui/utils';
import Menu from '../Menu/Menu';
import { isFilled } from '../InputBase/utils';
import { setRef } from '../utils/reactHelpers';

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

/**
 * @ignore - internal component.
 */
class SelectInput extends React.Component {
  ignoreNextBlur = false;

  constructor(props) {
    super();
    this.isOpenControlled = props.open !== undefined;
    this.state = {
      menuMinWidth: null,
      open: false,
    };
  }

  componentDidMount() {
    if (this.isOpenControlled && this.props.open) {
      // Focus the display node so the focus is restored on this element once
      // the menu is closed.
      this.displayRef.focus();
      // Rerender with the resolve `displayRef` reference.
      this.forceUpdate();
    }

    if (this.props.autoFocus) {
      this.displayRef.focus();
    }
  }

  update = ({ event, open }) => {
    if (this.isOpenControlled) {
      if (open) {
        this.props.onOpen(event);
      } else {
        this.props.onClose(event);
      }
      return;
    }

    this.setState({
      // Perform the layout computation outside of the render method.
      menuMinWidth: this.props.autoWidth ? null : this.displayRef.clientWidth,
      open,
    });
  };

  handleClick = event => {
    // Opening the menu is going to blur the. It will be focused back when closed.
    this.ignoreNextBlur = true;
    this.update({
      open: true,
      event,
    });
  };

  handleClose = event => {
    this.update({
      open: false,
      event,
    });
  };

  handleItemClick = child => event => {
    if (!this.props.multiple) {
      this.update({
        open: false,
        event,
      });
    }

    const { onChange, name } = this.props;

    if (onChange) {
      let value;

      if (this.props.multiple) {
        value = Array.isArray(this.props.value) ? [...this.props.value] : [];
        const itemIndex = value.indexOf(child.props.value);
        if (itemIndex === -1) {
          value.push(child.props.value);
        } else {
          value.splice(itemIndex, 1);
        }
      } else {
        value = child.props.value;
      }

      event.persist();
      event.target = { value, name };
      onChange(event, child);
    }
  };

  handleBlur = event => {
    if (this.ignoreNextBlur === true) {
      // The parent components are relying on the bubbling of the event.
      event.stopPropagation();
      this.ignoreNextBlur = false;
      return;
    }

    if (this.props.onBlur) {
      const { value, name } = this.props;
      event.persist();
      event.target = { value, name };
      this.props.onBlur(event);
    }
  };

  handleKeyDown = event => {
    if (this.props.readOnly) {
      return;
    }

    if (
      [
        ' ',
        'ArrowUp',
        'ArrowDown',
        // The native select doesn't respond to enter on MacOS, but it's recommended by
        // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        'Enter',
      ].indexOf(event.key) !== -1
    ) {
      event.preventDefault();
      // Opening the menu is going to blur the. It will be focused back when closed.
      this.ignoreNextBlur = true;
      this.update({
        open: true,
        event,
      });
    }
  };

  handleDisplayRef = ref => {
    this.displayRef = ref;
  };

  handleInputRef = ref => {
    const { inputRef } = this.props;

    if (!inputRef) {
      return;
    }

    const nodeProxy = {
      node: ref,
      // By pass the native input as we expose a rich object (array).
      value: this.props.value,
      focus: () => {
        this.displayRef.focus();
      },
    };

    setRef(inputRef, nodeProxy);
  };

  render() {
    const {
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
    } = this.props;
    const open = this.isOpenControlled && this.displayRef ? openProp : this.state.open;

    delete other['aria-invalid'];

    let display;
    let displaySingle = '';
    const displayMultiple = [];
    let computeDisplay = false;

    // No need to display any value if the field is empty.
    if (isFilled(this.props) || displayEmpty) {
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
        onClick: this.handleItemClick(child),
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
    let menuMinWidth = this.state.menuMinWidth;

    if (!autoWidth && this.isOpenControlled && this.displayRef) {
      menuMinWidth = this.displayRef.clientWidth;
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
          ref={this.handleDisplayRef}
          data-mui-test="SelectDisplay"
          aria-pressed={open ? 'true' : 'false'}
          tabIndex={tabIndex}
          role="button"
          aria-owns={open ? `menu-${name || ''}` : undefined}
          aria-haspopup="true"
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onClick={disabled || readOnly ? null : this.handleClick}
          onFocus={onFocus}
          // The id can help with end-to-end testing automation.
          id={name ? `select-${name}` : undefined}
          {...SelectDisplayProps}
        >
          {/* So the vertical align positioning algorithm kicks in. */}
          {/* eslint-disable-next-line react/no-danger */}
          {display || <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />}
        </div>
        <input
          value={Array.isArray(value) ? value.join(',') : value}
          name={name}
          ref={this.handleInputRef}
          type={type}
          {...other}
        />
        <IconComponent className={classes.icon} />
        <Menu
          id={`menu-${name || ''}`}
          anchorEl={this.displayRef}
          open={open}
          onClose={this.handleClose}
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
  }
}

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
   * See [CSS API](#css-api) below for more details.
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
  IconComponent: componentPropType,
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
    ),
  ]).isRequired,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default SelectInput;
