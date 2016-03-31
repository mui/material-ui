import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import TextField from './text-field';
import DropDownMenu from './drop-down-menu';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import ContextPure from './mixins/context-pure';
import KeyCode from './utils/key-code';

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      autoWidth: false,
      fullWidth: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
      root: {
        top: 0,
        left: 0,
        zIndex: 4,
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
      <div style={{position: 'relative'}}>
        <TextField
          ref="root"
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
            style={this.mergeStyles(styles.root, selectFieldRoot)}
            labelStyle={this.mergeStyles(styles.label, labelStyle)}
            iconStyle={this.mergeStyles(styles.icon, iconStyle)}
            underlineStyle={styles.hideDropDownUnderline}
            autoWidth={autoWidth}
            value={value}
            onChange={onChange}
            onKeyDown={ this._onControlKeyPress }
            onEscKeyDown={ this._onControlEsc }
            {...other}
            ref="ddMenu"
          >
            {children}
          </DropDownMenu>
        </TextField>
      </div>
    );
  },

  _onControlKeyPress(event){
    let _code = event.keyCode || event.charCode;
    if ( _code == KeyCode.DOWN || _code == KeyCode.SPACE || _code == KeyCode.ENTER ) {
      event.preventDefault();

      if ( this.refs.root.refs.input ) {
        this.refs.root.refs.input.setState({
          open: true,
          anchorEl: ReactDOM.findDOMNode(this),
        });
      }
    }
  },

  _onControlEsc(event){
    // this.refs.root.focus();
    if ( this.refs.root.refs.input ) ReactDOM.findDOMNode(this.refs.root.refs.input).focus();
    console.log("_onControlEsc", this.refs.root.focus, this.refs.root);
  },

});

export default SelectField;
