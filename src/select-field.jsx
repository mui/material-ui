let React = require('react');
let StylePropable = require('./mixins/style-propable');
let TextField = require('./text-field');
let DropDownMenu = require('./drop-down-menu');


let SelectField = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.string,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    autoWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      fullWidth: false,
    };
  },

  getStyles() {
    let styles = {
      root: {
        height: 46,
        position: 'relative',
        width: '100%',
        top: 16,
        fontSize: 16,
      },
      label: {
        paddingLeft: 0,
        top: 4,
        width: '100%',
      },
      icon: {
        top: 20,
        right: 0,
      },
      underline: {
        borderTop: 'none',
      },
      input: {},
    };

    if (!this.props.floatingLabelText) {
      if(this.props.hintText) {
        styles.root.top = -5;
        styles.label.top = 1;
        styles.icon.top = 17;
      }
      else {
        styles.root.top = -8;
      }
    }

    return styles;
  },

  onChange(e, index, payload) {
    if (payload) {
      e.target.value = payload[this.props.valueMember] || payload;
    }
    if (this.props.onChange) {
      this.props.onChange(e,index,payload);
    }
  },

  render() {
    let styles = this.getStyles();
    let {
      style,
      labelStyle,
      iconStyle,
      underlineStyle,
      selectFieldRoot,
      onChange,
      menuItems,
      disabled,
      floatingLabelText,
      hintText,
      fullWidth,
      errorText,
      ...other,
    } = this.props;

    let textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
    };
    let dropDownMenuProps = {
      onChange: this.onChange,
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline),
      autoWidth: false,
    };

    return (
      <TextField {...textFieldProps}>
        <DropDownMenu {...dropDownMenuProps} {...other} />
      </TextField>
    );
  },
});

module.exports = SelectField;
