import React from 'react';
import {isInner} from './timeUtils';

function calcAngle(value, base) {
  value %= base;
  const angle = 360 / base * value;
  return angle;
}

function getStyles(props, context, state) {
  const {hasSelected, type, value} = props;
  const {inner} = state;
  const {timePicker} = context.muiTheme;
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

class ClockPointer extends React.Component {
  static propTypes = {
    hasSelected: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    value: React.PropTypes.number,
  };

  static defaultProps = {
    value: null,
    type: 'minute',
    hasSelected: false,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {
    inner: isInner(this.props),
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      inner: isInner(nextProps),
    });
  }

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    const styles = getStyles(this.props, this.context, this.state);
    const {prepareStyles} = this.context.muiTheme;

    return (
      <div style={prepareStyles(styles.root)} >
        <div style={prepareStyles(styles.mark)} />
      </div>
    );
  }
}

export default ClockPointer;
