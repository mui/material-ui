const React = require('react');
const StylePropable = require('./mixins/style-propable');
const TextField = require('./text-field');
const DropDownMenu = require('./drop-down-menu');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const ContextPure = require('./mixins/context-pure');

const SelectField = React.createClass({

  mixins: [
    StylePropable,
    ContextPure,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  statics: {
    getChildrenClasses() {
      return [
        TextField,
        DropDownMenu,
      ];
    },
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    errorStyle: React.PropTypes.object,
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
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      fullWidth: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
      error: {},
    };

    if (!this.props.floatingLabelText) {
      styles.label.top = -6;
      styles.icon.top = 11;

      if(this.props.hintText) {
        styles.root.top = -5;
      } else {
        styles.root.top = -8;
      }
    } else {
      styles.error.bottom = -15;
    }

    return styles;
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      labelStyle,
      iconStyle,
      underlineStyle,
      errorStyle,
      selectFieldRoot,
      menuItems,
      disabled,
      floatingLabelText,
      floatingLabelStyle,
      hintText,
      fullWidth,
      errorText,
      ...other,
    } = this.props;

    const textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
    };
    const dropDownMenuProps = {
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline, underlineStyle),
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
