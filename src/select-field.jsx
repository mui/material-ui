import React from 'react';
import StylePropable from './mixins/style-propable';
import TextField from './text-field';
import DropDownMenu from './drop-down-menu';
import ContextPure from './mixins/context-pure';
import muiThemeable from './muiThemeable';

let SelectField = React.createClass({

  mixins: [
    StylePropable,
    ContextPure,
  ],

  statics: {
    getChildrenClasses() {
      return [
        TextField,
        DropDownMenu,
      ];
    },
  },

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    autoWidth: React.PropTypes.bool,
    children: React.PropTypes.node,
    disabled: React.PropTypes.bool,
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.node,
    floatingLabelStyle: React.PropTypes.object,
    floatingLabelText: React.PropTypes.node,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.node,
    iconStyle: React.PropTypes.object,
    labelMember: React.PropTypes.string, //DEPRECATE
    labelStyle: React.PropTypes.object, //DEPRECATE
    menuItems: React.PropTypes.array, //DEPRECATE
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    selectFieldRoot: React.PropTypes.object,
    selectedIndex: React.PropTypes.number, //DEPRECATE

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    underlineDisabledStyle: React.PropTypes.object,
    underlineFocusStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    value: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      autoWidth: false,
      fullWidth: false,
    };
  },

  getStyles() {
    const {floatingLabelText} = this.props;

    return {
      label: {
        paddingLeft: 0,
        top: floatingLabelText ? 6 : -4,
      },
      icon: {
        right: 0,
        top: floatingLabelText ? 22 : 14,
      },
      hideDropDownUnderline: {
        borderTop: 'none',
      },
    };
  },

  render() {
    const styles = this.getStyles();
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
      hintText,
      fullWidth,
      errorText,
      onFocus,
      onBlur,
      onChange,
      value,
      ...other,
    } = this.props;

    return (
      <TextField
        style={style}
        floatingLabelText={floatingLabelText}
        floatingLabelStyle={floatingLabelStyle}
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
          labelStyle={this.mergeStyles(styles.label, labelStyle)}
          iconStyle={this.mergeStyles(styles.icon, iconStyle)}
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

SelectField = muiThemeable(SelectField);

export default SelectField;
