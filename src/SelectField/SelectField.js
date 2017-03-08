// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import customPropTypes from '../utils/customPropTypes';
import SelectFieldInput from './SelectFieldInput';
import FormControl from '../Form/FormControl';
import InputLabel from '../Input/InputLabel';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';

export const styleSheet = createStyleSheet('MuiSelectField', () => {
  return {
    label: {
      paddingLeft: 0,
    },
    menu: {
    },
    icon: {
      right: 0,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
    dropDownMenu: {
      display: 'block',
    },
  };
});

/**
 * ```jsx
 * <SelectField />
 * ```
 */
class SelectField extends Component {
  static propTypes = {
    /**
     * The `MenuItem` elements to populate the select field with.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    /**
     * Whether the label should be hidden when option is selected.
     */
    hideLabel: PropTypes.bool,
    /*
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The CSS class name of the input element.
     */
    inputClassName: PropTypes.string,
    /**
     * Properties applied to the internal `<Input />` component.
     */
    inputProps: PropTypes.object,
    /**
     * The label text.
     */
    label: PropTypes.node,
    /**
     * The CSS class name of the label element.
     */
    labelClassName: PropTypes.string,
    /**
     * The CSS class name of the `Menu` element.
     */
    menuClassName: PropTypes.string,
    /**
     * Properties applied to the internal `<Menu />` component.
     */
    menuProps: PropTypes.object,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event TouchTap event targeting the menu item
     * that was selected.
     * @param {number} key The index of the selected menu item.
     * @param {any} payload The `value` prop of the selected menu item.
     */
    onChange: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Whether the label should be displayed as required (asterisk).
     */
    required: PropTypes.bool,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    disabled: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: undefined,
  };

  handleMouseDown = (event) => event.preventDefault();

  handleClick = (event) => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false })

  handleItemClick = (event, index, value) => {
    event.persist();
    this.setState({
      open: false,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, index, value);
      }

      // this.close(Events.isKeyboard(event));
    });
  };

  render() {
    const {
      children,
      className,
      disabled,
      error,
      hideLabel,
      inputClassName,
      inputProps,
      label,
      labelClassName,
      menuClassName,
      menuProps,
      required,
      type,
      value,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const initialShrink = value !== '' && typeof value !== 'undefined';

    return (
      <FormControl
        className={className}
        error={error}
        required={required}
        {...other}
      >
        {label && !(hideLabel && value) && (
          <InputLabel className={labelClassName} shrink={initialShrink}>
            {label}
          </InputLabel>
        )}
        <Input
          className={inputClassName}
          value={value}
          type={type}
          disabled={disabled}
          onMouseDown={this.handleMouseDown}
          onClick={this.handleClick}
          component={SelectFieldInput}
          label={label}
          options={children}
          {...inputProps}
        />
        <Menu
          anchorEl={this.state.anchorEl}
          className={classNames(classes.menu, menuClassName)}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          {...menuProps}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              selected: value === child.props.value,
              onClick: (event) => this.handleItemClick(event, index, child.props.value),
            }),
          )}
        </Menu>
      </FormControl>
    );
  }
}

export default SelectField;
