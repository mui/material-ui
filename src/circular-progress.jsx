const React = require('react');
const ReactDOM = require('react-dom');
const StylePropable = require('./mixins/style-propable');
const AutoPrefix = require('./styles/auto-prefix');
const Transitions = require("./styles/transitions");
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const CircularProgress = React.createClass({

  mixins: [StylePropable],

  propTypes: {
      mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
      value: React.PropTypes.number,
      min:  React.PropTypes.number,
      max:  React.PropTypes.number,
      size: React.PropTypes.number,
      color: React.PropTypes.string,
      style: React.PropTypes.object,
      innerStyle: React.PropTypes.object,
  },

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

  _getRelativeValue() {
    let value = this.props.value;
    let min = this.props.min;
    let max = this.props.max;

    let clampedValue = Math.min(Math.max(min, value), max);
    let rangeValue = max - min;
    let relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  componentDidMount() {
    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    let path = ReactDOM.findDOMNode(this.refs.path);

    this._scalePath(path);
    this._rotateWrapper(wrapper);
  },

  _scalePath(path, step) {
    step = step || 0;
    step %= 3;

    setTimeout(this._scalePath.bind(this, path, step + 1), step ? 750 : 250);

    if (!this.isMounted()) return;
    if (this.props.mode !== "indeterminate") return;

    if (step === 0) {
      path.style.strokeDasharray = "1, 200";
      path.style.strokeDashoffset = 0;
      path.style.transitionDuration = "0ms";
    }
    else if (step === 1) {
      path.style.strokeDasharray = "89, 200";
      path.style.strokeDashoffset = -35;
      path.style.transitionDuration = "750ms";
    }
    else {
      path.style.strokeDasharray = "89,200";
      path.style.strokeDashoffset = -124;
      path.style.transitionDuration = "850ms";
    }
  },

  _rotateWrapper(wrapper) {
    setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    if (!this.isMounted()) return;
    if (this.props.mode !== "indeterminate") return;

    AutoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)');
    AutoPrefix.set(wrapper.style, 'transitionDuration', '0ms');

    setTimeout(() => {
      AutoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)');
      AutoPrefix.set(wrapper.style, 'transitionDuration', '10s');
      AutoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear');
    }, 50);
  },

  getDefaultProps() {
    return {
      mode: "indeterminate",
      value: 0,
      min: 0,
      max: 100,
      size: 1,
    };
  },

  getTheme() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getStyles(zoom) {
    zoom *= 1.4;
    let size = "50px";

    let margin = Math.round( ((50 * zoom) - 50) / 2 );

    if (margin < 0) margin = 0;

    let styles = {
      root: {
        position: "relative",
        margin: margin + "px",
        display: "inline-block",
        width: size,
        height: size,
      },
      wrapper: {
        width: size,
        height: size,
        margin: "5px",
        display: "inline-block",
        transition: Transitions.create("transform", "20s", null, "linear"),
      },
      svg: {
        height: size,
        position: "relative",
        transform: "scale(" + zoom + ")",
        width: size,
      },
      path: {
        strokeDasharray: "89,200",
        strokeDashoffset: 0,
        stroke: this.props.color || this.getTheme().primary1Color,
        strokeLinecap: "round",
        transition: Transitions.create("all", "1.5s", null, "ease-in-out"),
      },
    };

    AutoPrefix.set(styles.wrapper, "transitionTimingFunction", "linear");

    if (this.props.mode === "determinate"){
      let relVal = this._getRelativeValue();
      styles.path.transition = Transitions.create("all", "0.3s", null, "linear");
      styles.path.strokeDasharray = Math.round(relVal * 1.25) + ",200";
    }

    return styles;
  },

  render() {
    let {
      style,
      innerStyle,
      size,
      ...other,
    } = this.props;


    let styles = this.getStyles(size || 1);

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)} >
        <div ref="wrapper" style={this.prepareStyles(styles.wrapper, innerStyle)} >
          <svg style={this.prepareStyles(styles.svg)} >
            <circle ref="path" style={this.prepareStyles(styles.path)} cx="25" cy="25"
              r="20" fill="none" strokeWidth="2.5" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
    );
  },
});

module.exports = CircularProgress;
