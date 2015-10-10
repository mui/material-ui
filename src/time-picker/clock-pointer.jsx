const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const ClockPointer = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute']),
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
      inner: this.isInner(this.props.value),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      inner: this.isInner(nextProps.value),
      muiTheme: newMuiTheme,
    });
  },

  isInner(value) {
    if (this.props.type !== "hour" ) {
      return false;
    }
    return value < 1 || value > 12 ;
  },

  getAngle() {
    if (this.props.type === "hour") {
      return this.calcAngle(this.props.value, 12);
    }

    return this.calcAngle(this.props.value, 60);
  },

  calcAngle(value, base) {
    value %= base;
    let angle = 360 / base * value;
    return angle;
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    let angle = this.getAngle();

    let styles = {
      root: {
        height: "30%",
        background: this.getTheme().accentColor,
        width: 2,
        left: 'calc(50% - 1px)',
        position: "absolute",
        bottom: "50%",
        transformOrigin: "bottom",
        pointerEvents: "none",
        transform: "rotateZ(" + angle + "deg)",
      },
      mark: {
        background: this.getTheme().selectTextColor,
        border: "4px solid " + this.getTheme().accentColor,
        width: 7,
        height: 7,
        position: "absolute",
        top: -5,
        left: -6,
        borderRadius: "100%",
      },
    };

    if (!this.state.inner) {
      styles.root.height = "40%";
    }

    if (this.props.hasSelected) {
      styles.mark.display = "none";
    }

    return (
        <div style={this.prepareStyles(styles.root)} >
          <div style={this.prepareStyles(styles.mark)} />
        </div>
    );
  },
});

module.exports = ClockPointer;
