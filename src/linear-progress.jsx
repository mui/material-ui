let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require("./styles/transitions");


let LinearProgress = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: React.PropTypes.number,
    min:  React.PropTypes.number,
    max:  React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
    let bar1 = React.findDOMNode(this.refs.bar1);
    let bar2 = React.findDOMNode(this.refs.bar2);

    this._barUpdate(0, bar1, [
      [-35, 100],
      [100, -90],
    ]);

    setTimeout(() => {
      this._barUpdate(0, bar2, [
        [-200, 100],
        [107, -8],
      ]);
    }, 850);
  },

  _barUpdate(step, barElement, stepValues) {
    step = step || 0;
    step %= 4;
    setTimeout(this._barUpdate.bind(this, step + 1, barElement, stepValues), 420);
    if (!this.isMounted()) return;
    if (this.props.mode !== "indeterminate") return;

    if (step === 0) {
      barElement.style.left = stepValues[0][0] + "%";
      barElement.style.right = stepValues[0][1] + "%";
    }
    else if (step === 1) {
      barElement.style.transitionDuration = "840ms";
    }
    else if (step === 2) {
      barElement.style.left = stepValues[1][0] + "%";
      barElement.style.right = stepValues[1][1] + "%";
    }
    else if (step === 3) {
      barElement.style.transitionDuration = "0ms";
    }
  },

  getDefaultProps() {
      return {
          mode: "indeterminate",
          value: 0,
          min: 0,
          max: 100,
      };
  },

  getTheme() {
    return this.context.muiTheme.palette;
  },

  getStyles() {
    let styles = {
      root: {
          position: "relative",
          height: 4,
          display: "block",
          width: "100%",
          backgroundColor: this.getTheme().primary3Color,
          borderRadius: 2,
          margin: 0,
          overflow: "hidden",
      },
      bar: {
        height: "100%",
      },
      barFragment1: {},
      barFragment2: {},
    };

    if (this.props.mode === "indeterminate") {
      styles.barFragment1 = {
        position: "absolute",
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create("all", "840ms", null, "cubic-bezier(0.650, 0.815, 0.735, 0.395)"),
      };

      styles.barFragment2 = {
        position: "absolute",
        backgroundColor: this.getTheme().primary1Color,
        top: 0,
        left: 0,
        bottom: 0,
        transition: Transitions.create("all", "840ms", null, "cubic-bezier(0.165, 0.840, 0.440, 1.000)"),
      };
    }
    else {
      styles.bar.backgroundColor= this.getTheme().primary1Color;
      styles.bar.transition = Transitions.create("width", ".3s", null, "linear");
      styles.bar.width = this._getRelativeValue() + "%";
    }

    return styles;
  },

  render() {
    let {
      style,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root, style)}>
        <div style={this.mergeAndPrefix(styles.bar)}>
          <div ref="bar1" style={this.mergeAndPrefix(styles.barFragment1)}></div>
          <div ref="bar2" style={this.mergeAndPrefix(styles.barFragment2)}></div>
        </div>
      </div>
    );
  },
});

module.exports = LinearProgress;
