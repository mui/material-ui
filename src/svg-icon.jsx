const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    viewBox: React.PropTypes.string,
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

  getInitialState() {
    return {
      hovered: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      viewBox: '0 0 24 24',
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    const {
      children,
      color,
      hoverColor,
      onMouseEnter,
      onMouseLeave,
      style,
      viewBox,
      ...other,
    } = this.props;

    const offColor = color ? color :
      style && style.fill ? style.fill :
      this.state.muiTheme.rawTheme.palette.textColor;
    const onColor = hoverColor ? hoverColor : offColor;

    const mergedStyles = this.prepareStyles({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style, {
      // Make sure our fill color overrides fill provided in props.style
      fill: this.state.hovered ? onColor : offColor,
    });

    const events = hoverColor ? {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
    } : {};

    return (
      <svg
        {...other}
        {...events}
        style={mergedStyles}
        viewBox={viewBox}>
        {children}
      </svg>
    );
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleMouseEnter(e) {
    this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },
});

module.exports = SvgIcon;
