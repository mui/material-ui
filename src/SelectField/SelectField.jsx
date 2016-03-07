import React from 'react';
import ReactDom from 'react-dom';
import TextFieldDecorator from '../TextField/TextFieldDecorator';
import SelectFieldMenu from './SelectFieldMenu';
import SelectFieldLabel from './SelectFieldLabel';
import getMuiTheme from '../styles/getMuiTheme';
import keycode from 'keycode';

const SelectField = React.createClass({

  propTypes: {
    /**
     * The width will automatically be set according to the
     * items inside the menu. To control this width in css
     * instead, set this prop to `false`.
     */
    autoWidth: React.PropTypes.bool,

    /**
     * The `MenuItem` elements to populate the `Menu` with.
     * If the MenuItems have the prop `label` that value will
     * be used to render the representation of that
     * item within the field.
     */
    children: React.PropTypes.node,

    /**
     * Disables the select field if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * The style object to use to override error styles.
     */
    errorStyle: React.PropTypes.object,

    /**
     * The error content to display.
     */
    errorText: React.PropTypes.node,

    /**
     * The style object to use to override floating label styles.
     */
    floatingLabelStyle: React.PropTypes.object,

    /**
     * The content to use for the floating label element.
     */
    floatingLabelText: React.PropTypes.node,

    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: React.PropTypes.bool,

    /**
     * The style object to use to override hint styles.
     */
    hintStyle: React.PropTypes.object,

    /**
     * The hint content to display.
     */
    hintText: React.PropTypes.node,

    /**
     * Overrides the styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * The id prop for the text field.
     */
    id: React.PropTypes.string,

    /**
     * Overrides the styles of label when the `SelectField` is inactive.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function that is fired when the `SelectField` loses focus.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function that is fired when the value changes.
     */
    onChange: React.PropTypes.func,

    /**
     * Callback function that is fired when the `SelectField` gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function that is fired when the `SelectField` is closed.
     */
    onRequestClose: React.PropTypes.func,

    /**
     * Property controlling whether the `SelectField` is open.  Use to open `DropDown` on mount.
     */
    open: React.PropTypes.bool,
    /**
     * The style object to use to override the `DropDownMenu`.
     */
    selectFieldRoot: React.PropTypes.object, // Must be changed!

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    tabIndex: React.PropTypes.number,

    /**
     * Override the inline-styles of the underline element when disabled.
     */
    underlineDisabledStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the underline element when focused.
     */
    underlineFocusStyle: React.PropTypes.object,

    /**
     * Overrides the styles of the underline element.
     */
    underlineStyle: React.PropTypes.object,

    /**
     * The value that is currently selected.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoWidth: false,
      disabled: false,
      fullWidth: false,
      id: 'select',
      open: false,
      tabIndex: 0,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if (this.props.open) {
      /* eslint-disable */
      /* because we're using ref for popover anchorEl  */
      this.setState({open: true});
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
      open: nextProps.open,
    });
  },

  componentWillUnmount() {
    this.label = null;
  },

  handleMenuRequestClose() {
    this.setState({
      open: false,
      isFocused: true,
    }, () => this.label.focus());
    const {onRequestClose} = this.props;
    return onRequestClose ? onRequestClose() : null;
  },

  handleTouchTap() {
    if (this.props.disabled)
      return;

    this.setState({
      open: true,
      isFocused: false,
    });
  },

  onFocus() {
    if (this.props.disabled)
      return;
    this.setState({isFocused: true});
    const {onFocus} = this.props;
    return onFocus ? onFocus() : null;
  },

  onBlur() {
    const {onBlur} = this.props;
    this.setState({isFocused: false});
    return onBlur ? onBlur() : null;
  },

  handleKeyDown(event) {
    switch (keycode(event)) {
      case 'enter':
      case 'space':
      case 'down':
        event.preventDefault();
        if (!this.props.disabled) {
          this.setState({
            open: !this.state.open,
            anchorEl: this.refs.root,
          });
        }
    }
  },

  render() {
    const {
      autoWidth,
      children,
      disabled,
      errorStyle,
      errorText,
      floatingLabelStyle,
      floatingLabelText,
      fullWidth,
      hintStyle,
      hintText,
      iconStyle,
      id,
      labelStyle,
      onBlur,
      onChange,
      selectFieldRoot,
      style,
      tabIndex,
      underlineDisabledStyle,
      underlineFocusStyle,
      underlineStyle,
      value,
      ...other,
    } = this.props;

    const {
      isFocused,
    } = this.state;

    const {open, muiTheme} = this.state;
    const errorStylePrepared = Object.assign({}, errorStyle, {position: 'absolute', bottom: -10});
    const floatingLabelStylePrepared = Object.assign({}, floatingLabelStyle, {cursor: 'pointer'});
                                                                           // ^^^^^^^^^^^^^^^^^
                                                                           // current implementation
                                                                           // doesn't do this, but should
    let displayValue = '';
    React.Children.forEach(children, (child) => {
      if (value === child.props.value) {
        // This will need to be improved (in case primaryText is a node)
        displayValue = child.props.label || child.props.primaryText;
      }
    });
    /* eslint-disable */
    console.log(open)
    const selecter = (
      <SelectFieldLabel
        disabled={disabled}
        muiTheme={muiTheme}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.handleKeyDown}
        onTouchTap={this.handleTouchTap}
        ref={(c) => this.label = ReactDom.findDOMNode(c)}
        style={labelStyle}
        value={displayValue}
      />
    );

    const menu = (
      <SelectFieldMenu
        {...other}
        anchorEl={this.label}
        autoWidth={autoWidth}
        floatingLabelText={floatingLabelText}
        onChange={onChange}
        onRequestClose={this.handleMenuRequestClose}
        open={open}
        value={value}
      >
        {children}
      </SelectFieldMenu>
    );

    return (
      <TextFieldDecorator
        disabled={disabled}
        errorStyle={errorStylePrepared}
        errorText={errorText}
        floatingLabelStyle={floatingLabelStylePrepared}
        floatingLabelText={floatingLabelText}
        fullWidth={fullWidth}
        hasValue={true}
        height={24}
        hintStyle={hintStyle}
        hintText={(!hintText && !floatingLabelText) ? ' ' : hintText}
        id={id}
        isFocused={isFocused}
        muiTheme={muiTheme}
        style={style}
        tabIndex={tabIndex}
        underlineDisabledStyle={underlineDisabledStyle}
        underlineFocusStyle={underlineFocusStyle}
        underlineStyle={underlineStyle}
      >
        {selecter}
        {menu}
      </TextFieldDecorator>
    );
  },
});

export default SelectField;
