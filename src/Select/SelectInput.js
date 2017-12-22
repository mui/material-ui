import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import warning from 'warning';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Menu from '../Menu/Menu';
import { isDirty } from '../Input/Input';

/**
 * @ignore - internal component.
 */
class SelectInput extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  ignoreNextBlur = false;

  handleClick = (event: SyntheticMouseEvent<HTMLElement>) => {
    // Opening the menu is going to blur the. It will be focused back when closed.
    this.ignoreNextBlur = true;
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleItemClick = (child: Element<any>) => (event: SyntheticMouseEvent<> & { target?: any }) => {
    if (!this.props.multiple) {
      this.setState({
        open: false,
      });
    }

    if (this.props.onChange) {
      const { onChange, name } = this.props;
      let value;
      let target;

      if (event.target) {
        target = event.target;
      }

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
      event.target = { ...target, value, name };

      onChange(event, child);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<>) => {
    if (this.ignoreNextBlur === true) {
      // The parent components are relying on the bubbling of the event.
      event.stopPropagation();
      this.ignoreNextBlur = false;
      return;
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (this.props.readOnly) {
      return;
    }

    if (['space', 'up', 'down'].includes(keycode(event))) {
      event.preventDefault();
      // Opening the menu is going to blur the. It will be focused back when closed.
      this.ignoreNextBlur = true;
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    }
  };

  handleSelectRef = (node: ?HTMLElement) => {
    if (!this.props.selectRef) {
      return;
    }

    this.props.selectRef({
      node,
      // By pass the native input as we expose a rich object (array).
      value: this.props.value,
    });
  };

  render() {
    const {
      autoWidth,
      children,
      classes,
      className: classNameProp,
      disabled,
      displayEmpty,
      MenuProps = {},
      multiple,
      name,
      native,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      renderValue,
      selectRef,
      value,
      ...other
    } = this.props;

    if (native) {
      warning(
        multiple === false,
        'Material-UI: you can not use the `native` and `multiple` properties ' +
          'at the same time on a `Select` component.',
      );
      warning(
        !renderValue,
        'Material-UI: the `renderValue` property is not used by the native implementation.',
      );
      warning(
        !displayEmpty,
        'Material-UI: the `displayEmpty` property is not used by the native implementation.',
      );

      return (
        <div className={classes.root}>
          <select
            className={classNames(
              classes.select,
              {
                [classes.disabled]: disabled,
              },
              classNameProp,
            )}
            name={name}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={value}
            readOnly={readOnly}
            ref={selectRef}
            {...other}
          >
            {children}
          </select>
          <ArrowDropDownIcon className={classes.icon} />
        </div>
      );
    }

    if (value === undefined) {
      throw new Error(
        'Material-UI: the `value` property is required ' +
          'when using the `Select` component with `native=false`.',
      );
    }

    let display;
    let displaySingle = '';
    const displayMultiple = [];
    let computeDisplay = false;

    // No need to display any value if the field is empty.
    if (isDirty(this.props) || displayEmpty) {
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
      let selected;

      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error(
            'Material-UI: the `value` property must be an array ' +
              'when using the `Select` component with `multiple`.',
          );
        }

        selected = value.indexOf(child.props.value) !== -1;
        if (selected && computeDisplay) {
          displayMultiple.push(child.props.children);
        }
      } else {
        selected = value === child.props.value;
        if (selected && computeDisplay) {
          displaySingle = child.props.children;
        }
      }

      return React.cloneElement(child, {
        role: 'option',
        selected,
        onClick: this.handleItemClick(child),
      });
    });

    if (computeDisplay) {
      display = multiple ? displayMultiple.join(', ') : displaySingle;
    }

    const minimumMenuWidth =
      this.state.anchorEl != null && !autoWidth ? this.state.anchorEl.clientWidth : undefined;

    return (
      <div className={classes.root}>
        <div
          className={classNames(
            classes.select,
            classes.selectMenu,
            {
              [classes.disabled]: disabled,
            },
            classNameProp,
          )}
          data-mui-test="SelectDisplay"
          aria-pressed={this.state.open ? 'true' : 'false'}
          tabIndex={disabled ? null : 0}
          role="button"
          aria-owns={this.state.open ? `menu-${name || ''}` : null}
          aria-haspopup="true"
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onClick={disabled || readOnly ? null : this.handleClick}
          onFocus={onFocus}
        >
          {display}
        </div>
        <input
          value={Array.isArray(value) ? value.join(',') : value}
          name={name}
          readOnly={readOnly}
          {...other}
          ref={this.handleSelectRef}
          type="hidden"
        />
        <ArrowDropDownIcon className={classes.icon} />
        <Menu
          id={`menu-${name || ''}`}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
          {...MenuProps}
          MenuListProps={{
            ...MenuProps.MenuListProps,
            role: 'listbox',
          }}
          PaperProps={{
            ...MenuProps.PaperProps,
            style: {
              minWidth: minimumMenuWidth,
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
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
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
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: PropTypes.bool,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback
   * @param {object} child The react element that was selected
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   */
  renderValue: PropTypes.func,
  /**
   * Use that property to pass a ref callback to the native select element.
   */
  selectRef: PropTypes.func,
  /**
   * The value of the component, required for a controlled component.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
};

SelectInput.muiName = 'SelectInput';

export default SelectInput;
