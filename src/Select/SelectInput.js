// @flow

import React from 'react';
import type { ChildrenArray, Element, Node } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import warning from 'warning';
import Menu from '../Menu/Menu';
import { isDirty } from '../Input/Input';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDown';

export type Props = {
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: $ReadOnlyArray<ChildrenArray<Node>>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * The CSS class name of the select element.
   */
  className?: string,
  /**
   * If `true`, the select will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: boolean,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple: boolean,
  /**
   * Properties applied to the `Menu` element.
   */
  MenuProps?: Object,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name?: string,
  /**
   * @ignore
   */
  onBlur?: Function,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback
   * @param {object} child The react element that was selected
   */
  onChange?: (event: Object, child: Element<*>) => void,
  /**
   * @ignore
   */
  onFocus?: Function,
  /**
   * @ignore
   */
  readOnly?: boolean,
  /**
   * Render the selected value.
   * It's only useful when the `native` property is not set to `true`.
   */
  renderValue?: Function,
  /**
   * Use that property to pass a ref callback to the native select element.
   */
  selectRef?: Function,
  /**
   * The value of the component, required for a controlled component.
   */
  value?: string | number | Array<string | number>,
};

type AllProps = Props;

type State = {
  open: boolean,
  anchorEl: ?HTMLElement,
};

/**
 * @ignore - internal component.
 */
class SelectInput extends React.Component<AllProps, State> {
  props: AllProps;

  static muiName = 'SelectInput';

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

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleItemClick = (child: Element<*>) => (event: SyntheticMouseEvent<>) => {
    if (!this.props.multiple) {
      this.setState({
        open: false,
      });
    }

    if (this.props.onChange) {
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

      this.props.onChange(
        {
          ...event,
          target: {
            value,
          },
        },
        child,
      );
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
      children,
      className: classNameProp,
      classes,
      disabled,
      name,
      native,
      multiple,
      MenuProps = {},
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
            ref={selectRef}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={value}
            readOnly={readOnly}
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
    if (isDirty(this.props)) {
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
          ref={this.handleSelectRef}
          value={Array.isArray(value) ? value.join(',') : value}
          name={name}
          readOnly={readOnly}
          {...other}
          type="hidden"
        />
        <ArrowDropDownIcon className={classes.icon} />
        <Menu
          id={`menu-${name || ''}`}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          {...MenuProps}
          MenuListProps={{
            ...MenuProps.MenuListProps,
            role: 'listbox',
          }}
        >
          {items}
        </Menu>
      </div>
    );
  }
}

export default SelectInput;
