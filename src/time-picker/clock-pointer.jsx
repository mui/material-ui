import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function calcAngle(value, base) {
  value %= base;
  const angle = 360 / base * value;
  return angle;
}

function isInner(props) {
  if (props.type !== 'hour' ) {
    return false;
  }
  return props.value < 1 || props.value > 12 ;
}

function getStyles(props, state) {
  const {
    hasSelected,
    type,
    value,
  } = props;

  const {
    inner,
    muiTheme: {
      timePicker,
    },
  } = state;

  const angle = type === 'hour' ? calcAngle(value, 12) : calcAngle(value, 60);

  const styles = {
    root: {
      height: inner ? '30%' : '40%',
      background: timePicker.accentColor,
      width: 2,
      left: 'calc(50% - 1px)',
      position: 'absolute',
      bottom: '50%',
      transformOrigin: 'bottom',
      pointerEvents: 'none',
      transform: `rotateZ(${angle}deg)`,
    },
    mark: {
      background: timePicker.selectTextColor,
      border: `4px solid ${timePicker.accentColor}`,
      display: hasSelected && 'none',
      width: 7,
      height: 7,
      position: 'absolute',
      top: -5,
      left: -6,
      borderRadius: '100%',
    },
  };

  return styles;
}

const ClockPointer = React.createClass({

  propTypes: {
    hasSelected: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    value: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false,
    };
  },

  getInitialState() {
    return {
      inner: isInner(this.props),
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      inner: isInner(nextProps),
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    const styles = getStyles(this.props, this.state);

    const {
      prepareStyles,
    } = this.state.muiTheme;

    return (
      <div style={prepareStyles(styles.root)} >
        <div style={prepareStyles(styles.mark)} />
      </div>
    );
  },
});

export default ClockPointer;
