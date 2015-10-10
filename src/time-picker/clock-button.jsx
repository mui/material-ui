const React = require('react');
const StylePropable = require('../mixins/style-propable');
const EnhancedButton = require('../enhanced-button');
const Transitions = require('../styles/transitions');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const ClockButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right']),
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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getDefaultProps() {
    return {
        position: "left",
    };
  },

  _handleTouchTap() {
    this.setState({
      selected: true,
    });
    this.props.onTouchTap();
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    let {
      className,
      ...other} = this.props;

    let styles = {
      root: {
        position: "absolute",
        bottom: 65,
        pointerEvents: "auto",
        height: 50,
        width: 50,
        borderRadius: "100%",
      },

      label : {
        position: "absolute",
        top: 17,
        left: 14,
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if ( this.props.position === "right" ){
      styles.root.right = "5px";
    }
    else {
      styles.root.left = "5px";
    }

    return (
        <EnhancedButton {...other}
          style={this.mergeStyles(styles.root)}
          disableFocusRipple={true}
          disableTouchRipple={true}
          onTouchTap={this._handleTouchTap}>
          <span style={this.prepareStyles(styles.select)} />
          <span style={this.prepareStyles(styles.label)} >{this.props.children}</span>
        </EnhancedButton>
    );
  },
});

module.exports = ClockButton;
