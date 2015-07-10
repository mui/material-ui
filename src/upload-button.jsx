let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let ColorManipulator = require('./utils/color-manipulator');
let Typography = require('./styles/typography');
let EnhancedButton = require('./enhanced-button');
let Paper = require('./paper');


function validateLabel (props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}


let UploadButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    backgroundColor: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disabledBackgroundColor: React.PropTypes.string,
    disabledLabelColor: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
    inputName: React.PropTypes.string,
    label: validateLabel,
    labelStyle: React.PropTypes.object,
    labelColor: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
  },

  getInitialState() {
    let zDepth = this.props.disabled ? 0 : 1;
    return {
      hovered: false,
      touched: false,
      initialZDepth: zDepth,
      zDepth: zDepth,
      fileName: this.props.label,
    };
  },

  componentWillReceiveProps(nextProps) {
    let zDepth = nextProps.disabled ? 0 : 1;

    let newState = {
      zDepth: zDepth,
      initialZDepth: zDepth,
    };

    this.setState(newState);
  },

  _getBackgroundColor() {
    let disabledColor = this.props.disabledBackgroundColor ? this.props.disabledBackgroundColor :
      this.getTheme().disabledColor;

    return this.props.disabled ? disabledColor :
      this.props.backgroundColor ? this.props.backgroundColor :
      this.props.primary ? this.getTheme().primaryColor :
      this.props.secondary ? this.getTheme().secondaryColor :
      this.getTheme().color;
  },

  _getLabelColor() {
    let disabledColor = this.props.disabledLabelColor ? this.props.disabledLabelColor :
      this.getTheme().disabledTextColor;

    return this.props.disabled ? disabledColor :
      this.props.labelColor ? this.props.labelColor :
      this.props.primary ? this.getTheme().primaryTextColor :
      this.props.secondary ? this.getTheme().secondaryTextColor :
      this.getTheme().textColor;
  },

  getThemeButton() {
    return this.context.muiTheme.component.button;
  },

  getTheme() {
    return this.context.muiTheme.component.raisedButton;
  },

  getStyles() {
    let amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
    let styles = {
      root: {
        display: 'inline-block',
        minWidth: this.props.fullWidth ? '100%' : this.getThemeButton().minWidth,
        height: this.getThemeButton().height,
        transition: Transitions.easeOut(),
      },
      container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 2,
        transition: Transitions.easeOut(),
        backgroundColor: this._getBackgroundColor(),

        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)',
      },
      label: {
        position: 'relative',
        opacity: 1,
        fontSize: '14px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        padding: '0px ' + this.context.muiTheme.spacing.desktopGutterLess + 'px',
        userSelect: 'none',
        lineHeight: (this.props.style && this.props.style.height) ?
         this.props.style.height : this.getThemeButton().height + 'px',
        color:  this._getLabelColor(),
        transition: Transitions.easeOut(),
      },
      inputFile: {
        cursor: 'pointer',
        height: '100%',
        position:'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        fontSize: 50,
        opacity: 0,
      },
      overlay: {
        transition: Transitions.easeOut(),
        overflow: 'hidden',
        position:'relative',
        top: 0,
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getLabelColor(), amount),
      },
    };
    return styles;
  },

  render() {
    let {
      disabled,
      primary,
      inputName,
      secondary,
      onChange,
      ...other } = this.props;

    let styles = this.getStyles();

    let currentLabel = this.state.fileName;

    let inputProps = {
      style : styles.inputFile,
      ref: this._getRef(),
      name : inputName,
    };

    let labelElement;
    let inputElement;

    if (currentLabel) {
      labelElement = (
        <span style={this.mergeAndPrefix(styles.label, this.props.labelStyle)}>
          {currentLabel}
        </span>
      );
    }


    if (this.props.hasOwnProperty('valueLink')) {
      inputProps.valueLink = this.props.valueLink;
    } else {
      inputProps.onChange = this._getFileName;
    }

    if(!disabled)
    inputElement = (
      <input type='file' {...inputProps} />
    );


    let rippleColor = styles.label.color;
    let rippleOpacity = !(primary || secondary) ? 0.1 : 0.16;

    let buttonEventHandlers = disabled ? null : {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseOut: this._handleMouseOut,
      onMouseOver: this._handleMouseOver,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus,
    };

    return (
      <Paper
        style={this.mergeAndPrefix(styles.root, this.props.style)}
        zDepth={this.state.zDepth}>
          <EnhancedButton
            {...other}
            {...buttonEventHandlers}
            ref="container"
            disabled={disabled}
            style={this.mergeAndPrefix(styles.container)}
            focusRippleColor={rippleColor}
            touchRippleColor={rippleColor}
            focusRippleOpacity={rippleOpacity}
            touchRippleOpacity={rippleOpacity}>
              <div ref="overlay" style={this.mergeAndPrefix(
                  styles.overlay,
                  (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
                )}>
                  {inputElement}
                  {labelElement}
                  {this.props.children}
              </div>
          </EnhancedButton>
      </Paper>
    );
  },

   _getFileName(e) {
     if (e.target.files[0].name) {
       this.setState({
         fileName: '.../' + e.target.files[0].name,
       });
     }
     if (this.props.onChange) this.props.onChange(e);
   },

  _getRef() {
    return this.props.ref ? this.props.ref : 'input';
  },

  _getInputNode() {
    return (this.props.children || this.props.multiLine) ?
      this.refs[this._getRef()].getInputNode() : React.findDOMNode(this.refs[this._getRef()]);
  },

  _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseOut(e) {
    if (!this.refs.container.isKeyboardFocused()){
        this.setState({
          zDepth: this.state.initialZDepth,
          hovered: false,
        });
      }
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver(e) {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchStart(e) {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1,
    });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      let amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      React.findDOMNode(this.refs.overlay).style.backgroundColor = ColorManipulator.fade(this.mergeAndPrefix(this.getStyles().label, this.props.labelStyle).color, amount);
    }
    else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      React.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

});

module.exports = UploadButton;
