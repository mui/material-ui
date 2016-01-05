import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const FontIcon = React.createClass({

  propTypes: {
    /**
     * This is the font color of the font icon. If not specified,
     * this component will default to muiTheme.palette.textColor.
     */
    color: React.PropTypes.string,

    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: React.PropTypes.string,

    /**
     * Function called when mouse enters this element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Function called when mouse leaves this element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    };
  },

  getInitialState() {
    return {
      hovered: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  _handleMouseLeave(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  },

  _handleMouseEnter(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: true});
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  },

  render() {
    let {
      color,
      hoverColor,
      onMouseLeave,
      onMouseEnter,
      style,
      ...other,
    } = this.props;

    let spacing = this.state.muiTheme.rawTheme.spacing;
    let offColor = color ? color :
      style && style.color ? style.color :
      this.state.muiTheme.rawTheme.palette.textColor;
    let onColor = hoverColor ? hoverColor : offColor;

    let mergedStyles = this.prepareStyles({
      position: 'relative',
      fontSize: spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style, {
      color: this.state.hovered ? onColor : offColor,
    });

    return (
      <span
        {...other}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        style={mergedStyles} />
    );
  },
});

export default FontIcon;
