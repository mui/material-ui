import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const ClockNumber = React.createClass({

  propTypes: {
    isSelected: React.PropTypes.bool,
    onSelected: React.PropTypes.func,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    value: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      value: 0,
      type: 'minute',
      isSelected: false,
    };
  },

  getInitialState() {
    return {
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

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    let pos = this.props.value;
    let inner = false;

    if (this.props.type === 'hour') {
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
        display: 'inline-block',
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: '100%',
        left: 'calc(50% - 16px)',
        top: 10,
        textAlign: 'center',
        paddingTop: 5,
        userSelect: 'none',  /* Chrome all / Safari all */
        fontSize: '1.1em',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      },
    };

    if (this.props.isSelected) {
      styles.root.backgroundColor = this.getTheme().accentColor;
      styles.root.color = this.getTheme().selectTextColor;
    }

    let transformPos = positions[pos];

    if (inner) {
      styles.root.width = 28;
      styles.root.height = 28;
      styles.root.left = 'calc(50% - 14px)';
      transformPos = innerPositions[pos];
    }

    let [x, y] = transformPos;

    styles.root.transform = 'translate(' + x + 'px, ' + y + 'px)';

    return (
      <span style={this.prepareStyles(styles.root)}>{this.props.value}</span>
    );
  },
});

export default ClockNumber;
