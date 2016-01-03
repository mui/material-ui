import React from 'react';
import IconButton from '../icon-button';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import ColorManipulator from '../utils/color-manipulator';

const TabPaginatorButton = React.createClass({

  mixins: [
    StylePropable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disable ripple effect on touch focus, true by default
     */
    disableTouchRipple: React.PropTypes.bool,

    /**
     * Should button be disabled
     */
    disabled: React.PropTypes.bool.isRequired,

    /**
     * Should button be displayed
     */
    display: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * True if this component should be left button
     */
    isLeftPaginatorButton: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
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
      disableTouchRipple: true,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    const {
      disabled,
      isLeftPaginatorButton,
      display,
      style,
      iconStyle,
      ...other,
      } = this.props;

    // tab paginator button width comes from google's design guide
    // https://www.google.com/design/spec/components/tabs.html#tabs-specs
    let themeVariables = this.state.muiTheme.tabs;
    const styles = {
      buttonStyle: {
        display: display ? '' : 'none',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: 32,
        height: '100%',
        padding: 0,
        backgroundColor: themeVariables.backgroundColor,
      },
      iconStyle: {
        color: iconStyle && iconStyle.color ?
          disabled ?
            ColorManipulator.fade(iconStyle.color, 0.3) :
            iconStyle.color
          : disabled ?
          this.state.muiTheme.tabs.textColor :
          this.state.muiTheme.tabs.selectedTextColor,
      },
    };

    if (isLeftPaginatorButton) {
      styles.buttonStyle.left = 0;
    } else {
      styles.buttonStyle.right = 0;
    }

    return (
      <IconButton {...other}
        disableTouchRipple={this.props.disableTouchRipple}
        disabled={disabled}
        iconClassName="material-icons"
        iconStyle={this.mergeStyles(iconStyle, styles.iconStyle)}
        style={this.mergeStyles(styles.buttonStyle, style)}>
        {isLeftPaginatorButton ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
      </IconButton>
    );
  },

});

export default TabPaginatorButton;
