import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import DropDownMenu from '../DropDownMenu';

function getStyles(props) {
  return {
    label: {
      paddingLeft: 0,
      top: props.floatingLabelText ? 6 : -4,
    },
    icon: {
      right: 0,
      top: props.floatingLabelText ? 8 : 0,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
    dropDownMenu: {
      display: 'block',
    },
  };
}

class SelectField extends Component {
  static propTypes = {
    /**
     * If true, the width will automatically be set according to the
     * items inside the menu.
     * To control the width in CSS instead, leave this prop set to `false`.
     */
    autoWidth: PropTypes.bool,
    /**
     * The `MenuItem` elements to populate the select field with.
     * If the menu items have a `label` prop, that value will
     * represent the selected menu item in the rendered select field.
     */
    children: PropTypes.node,
    /**
     * If true, the select field will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Object that can handle and override any property of component DropDownMenu.
     */
    dropDownMenuProps: PropTypes.object,
    /**
     * Override the inline-styles of the error element.
     */
    errorStyle: PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: PropTypes.node,
    /**
     * If true, the floating label will float even when no value is selected.
     */
    floatingLabelFixed: PropTypes.bool,
    /**
     * Override the inline-styles of the floating label.
     */
    floatingLabelStyle: PropTypes.object,
    /**
     * The content of the floating label.
     */
    floatingLabelText: PropTypes.node,
    /**
     * If true, the select field will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * Override the inline-styles of the hint element.
     */
    hintStyle: PropTypes.object,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,
    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * Override the label style when the select field is inactive.
     */
    labelStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underlying `List` element.
     */
    listStyle: PropTypes.object,
    /**
     * Override the default max-height of the underlying `DropDownMenu` element.
     */
    maxHeight: PropTypes.number,
    /**
     * Override the inline-styles of menu items.
     */
    menuItemStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underlying `DropDownMenu` element.
     */
    menuStyle: PropTypes.object,
    /**
     * If true, `value` must be an array and the menu will support
     * multiple selections.
     */
    multiple: PropTypes.bool,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function fired when a menu item is selected.
     *
     * @param {object} event Click event targeting the menu item
     * that was selected.
     * @param {number} key The index of the selected menu item, or undefined
     * if `multiple` is true.
     * @param {any} payload If `multiple` is true, the menu's `value`
     * array with either the menu item's `value` added (if
     * it wasn't already selected) or omitted (if it was already selected).
     * Otherwise, the `value` of the menu item.
     */
    onChange: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Override the inline-styles of selected menu items.
     */
    selectedMenuItemStyle: PropTypes.object,
    /**
     * Customize the rendering of the selected item.
     *
     * @param {any} value If `multiple` is true, the menu's `value`
     * array with either the menu item's `value` added (if
     * it wasn't already selected) or omitted (if it was already selected).
     * Otherwise, the `value` of the menu item.
     * @param {any} menuItem The selected `MenuItem`.
     * If `multiple` is true, this will be an array with the `MenuItem`s matching the `value`s parameter.
     */
    selectionRenderer: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select
     * field is disabled.
     */
    underlineDisabledStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element when the select field
     * is focused.
     */
    underlineFocusStyle: PropTypes.object,
    /**
     * Override the inline-styles of the underline element.
     */
    underlineStyle: PropTypes.object,
    /**
     * If `multiple` is true, an array of the `value`s of the selected
     * menu items. Otherwise, the `value` of the selected menu item.
     * If provided, the menu will be a controlled component.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    autoWidth: false,
    disabled: false,
    fullWidth: false,
    multiple: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      autoWidth,
      multiple,
      children,
      style,
      labelStyle,
      iconStyle,
      id,
      underlineDisabledStyle,
      underlineFocusStyle,
      menuItemStyle,
      selectedMenuItemStyle,
      underlineStyle,
      dropDownMenuProps,
      errorStyle,
      disabled,
      floatingLabelFixed,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      listStyle,
      maxHeight,
      menuStyle,
      onFocus,
      onBlur,
      onChange,
      selectionRenderer,
      value,
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);

    return (
      <TextField
        {...other}
        style={style}
        disabled={disabled}
        floatingLabelFixed={floatingLabelFixed}
        floatingLabelText={floatingLabelText}
        floatingLabelStyle={floatingLabelStyle}
        hintStyle={hintStyle}
        hintText={(!hintText && !floatingLabelText) ? ' ' : hintText}
        fullWidth={fullWidth}
        errorText={errorText}
        underlineStyle={underlineStyle}
        errorStyle={errorStyle}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
      >
        <DropDownMenu
          disabled={disabled}
          style={Object.assign(styles.dropDownMenu, menuStyle)}
          labelStyle={Object.assign(styles.label, labelStyle)}
          iconStyle={Object.assign(styles.icon, iconStyle)}
          menuItemStyle={menuItemStyle}
          selectedMenuItemStyle={selectedMenuItemStyle}
          underlineStyle={styles.hideDropDownUnderline}
          listStyle={listStyle}
          autoWidth={autoWidth}
          value={value}
          onChange={onChange}
          maxHeight={maxHeight}
          multiple={multiple}
          selectionRenderer={selectionRenderer}
          {...dropDownMenuProps}
        >
          {children}
        </DropDownMenu>
      </TextField>
    );
  }
}

export default SelectField;
