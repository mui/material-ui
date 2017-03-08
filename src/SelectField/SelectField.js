// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import TextField from '../TextField';
import SelectFieldInput from './SelectFieldInput';

import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import Input from 'material-ui/Input/Input';
import Menu from 'material-ui/Menu/Menu';

// import DropDownMenu from '../DropDownMenu';

export const styleSheet = createStyleSheet('MuiSelectField', (theme) => {
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
     * If `true`, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The content of the label.
     */
    label: PropTypes.node,
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
     * The value that is currently selected.
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
      menuProps,
      required,
      type,
      value,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
       <FormControl
        className={className}
        error={error}
        required={required}
        {...other}
      >
        {label && !(hideLabel && value) && (
          <InputLabel className={labelClassName} shrink={value ? true : false}>
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
          className={classes.menu}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          {...menuProps}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              selected: value === child.props.value,
              onClick : (event) => this.handleItemClick(event, index, child.props.value)
            })
          )}
        </Menu>
      </FormControl>
    );
  }
}

export default SelectField;
