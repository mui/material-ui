let React = require('react');
let StylePropable = require('../mixins/style-propable');


let ClockNumber = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    onSelected: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      value: 0,
      type: 'minute',
      isSelected: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render() {
    let pos = this.props.value;
    let inner = false;

    if (this.props.type === "hour") {
      inner = pos < 1 || pos > 12;
      pos %= 12;
    }
    else {
      pos = pos / 5;
    }

    let positions = [
      [0, 5],
      [54.5, 16.6],
      [94.4, 59.5],
      [109, 114],
      [94.4, 168.5],
      [54.5, 208.4],
      [0, 223],
      [-54.5, 208.4],
      [-94.4, 168.5],
      [-109, 114],
      [-94.4, 59.5],
      [-54.5, 19.6],
    ];

    let innerPositions = [
      [0, 40],
      [36.9, 49.9],
      [64, 77],
      [74, 114],
      [64, 151],
      [37, 178],
      [0, 188],
      [-37, 178],
      [-64, 151],
      [-74, 114],
      [-64, 77],
      [-37, 50],
    ];

    let styles = {
      root: {
        display: "inline-block",
        position: "absolute",
        width: 32,
        height: 32,
        borderRadius: "100%",
        left: 'calc(50% - 16px)',
        top: 10,
        textAlign: "center",
        paddingTop: 5,
        userSelect: "none",  /* Chrome all / Safari all */
        fontSize: "1.1em",
        pointerEvents: "none",
        boxSizing: "border-box",
      },
    };

    if (this.props.isSelected) {
      styles.root.backgroundColor = this.getTheme().accentColor;
      styles.root.color = this.getTheme().selectTextColor;
    }

    let transformPos = positions[pos];

    if (inner) {
      styles.root.width = "28px";
      styles.root.height = "28px";
      styles.root.left = 'calc(50% - 14px)';
      transformPos = innerPositions[pos];
    }

    let [x, y] = transformPos;

    styles.root.transform = "translate(" + x + "px, " + y + "px)";

    return (
        <span style={this.mergeAndPrefix(styles.root)}>{this.props.value}</span>
    );
  },
});

module.exports = ClockNumber;
