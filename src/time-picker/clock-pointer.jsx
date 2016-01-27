import React from 'react';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const ClockPointer = React.createClass({

  propTypes: {
    hasSelected: React.PropTypes.bool,
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
      value: null,
      type: 'minute',
      hasSelected: false,
    };
  },

  getInitialState() {
    return {
      inner: this.isInner(this.props.value),
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
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
    if (this.props.type !== 'hour' ) {
      return false;
    }
    return value < 1 || value > 12 ;
  },

  getAngle() {
    if (this.props.type === 'hour') {
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
        height: '30%',
        background: this.getTheme().accentColor,
        width: 2,
        left: 'calc(50% - 1px)',
        position: 'absolute',
        bottom: '50%',
        transformOrigin: 'bottom',
        pointerEvents: 'none',
        transform: 'rotateZ(' + angle + 'deg)',
      },
      mark: {
        background: this.getTheme().selectTextColor,
        border: '4px solid ' + this.getTheme().accentColor,
        width: 7,
        height: 7,
        position: 'absolute',
        top: -5,
        left: -6,
        borderRadius: '100%',
      },
    };

    if (!this.state.inner) {
      styles.root.height = '40%';
    }

    if (this.props.hasSelected) {
      styles.mark.display = 'none';
    }

    return (
      <div style={this.prepareStyles(styles.root)} >
        <div style={this.prepareStyles(styles.mark)} />
      </div>
    );
  },
});

export default ClockPointer;
