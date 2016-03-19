import React, {PropTypes} from 'react';
import TextField from '../text-field';
import DropDownMenu from '../DropDownMenu';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props) {
  return {
    label: {
      paddingLeft: 0,
      top: props.floatingLabelText ? 6 : -4,
    },
    icon: {
      right: 0,
      top: props.floatingLabelText ? 22 : 14,
    },
    hideDropDownUnderline: {
      borderTop: 'none',
    },
  };
}

const SelectField = React.createClass({

  propTypes: {
    /**
     * The width will automatically be set according to the
     * items inside the menu. To control this width in css
     * instead, set this prop to `false`.
     */
    autoWidth: PropTypes.bool,

    /**
     * The `MenuItem` elements to populate the `Menu` with.
     * If the MenuItems have the prop `label` that value will
     * be used to render the representation of that
     * item within the field.
     */
    children: PropTypes.node,

    /**
     * Disables the select field if set to true.
     */
    disabled: PropTypes.bool,

    /**
     * The style object to use to override error styles.
     */
    errorStyle: PropTypes.object,

    /**
     * The error content to display.
     */
    errorText: PropTypes.node,

    /**
     * The style object to use to override floating label styles.
     */
    floatingLabelStyle: PropTypes.object,

    /**
     * The content to use for the floating label element.
     */
    floatingLabelText: PropTypes.node,

    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: PropTypes.bool,

    /**
     * The style object to use to override hint styles.
     */
    hintStyle: PropTypes.object,

    /**
     * The hint content to display.
     */
    hintText: PropTypes.node,

    /**
     * Overrides the styles of the icon element.
     */
    iconStyle: PropTypes.object,

    /**
     * Overrides the styles of label when the `SelectField` is inactive.
     */
    labelStyle: PropTypes.object,

    /**
     * Callback function that is fired when the `SelectField` loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * Callback function that is fired when the value changes.
     */
    onChange: PropTypes.func,

    /**
     * Callback function that is fired when the `SelectField` gains focus.
     */
    onFocus: PropTypes.func,

    /**
     * The style object to use to override the `DropDownMenu`.
     */
    selectFieldRoot: PropTypes.object, // Must be changed!

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * Override the inline-styles of the underline element when disabled.
     */
    underlineDisabledStyle: PropTypes.object,

    /**
     * Override the inline-styles of the underline element when focused.
     */
    underlineFocusStyle: PropTypes.object,

    /**
     * Overrides the styles of the underline element.
     */
    underlineStyle: PropTypes.object,

    /**
     * The value that is currently selected.
     */
    value: PropTypes.any,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoWidth: false,
      disabled: false,
      fullWidth: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      autoWidth,
      children,
      style,
      labelStyle,
      iconStyle,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineStyle,
      errorStyle,
      selectFieldRoot,
      disabled,
      floatingLabelText,
      floatingLabelStyle,
      hintStyle,
      hintText,
      fullWidth,
      errorText,
      onFocus,
      onBlur,
      onChange,
      value,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    return (
      <TextField
        style={style}
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
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
      >
        <DropDownMenu
          disabled={disabled}
          style={selectFieldRoot}
          labelStyle={Object.assign(styles.label, labelStyle)}
          iconStyle={Object.assign(styles.icon, iconStyle)}
          underlineStyle={styles.hideDropDownUnderline}
          autoWidth={autoWidth}
          value={value}
          onChange={onChange}
          {...other}
        >
          {children}
        </DropDownMenu>
      </TextField>
    );
  },
});

export default SelectField;
