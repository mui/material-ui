const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const FontIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      hovered: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
});

module.exports = FontIcon;
