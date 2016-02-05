import React from 'react';
import ClockNumber from './clock-number';
import ClockPointer from './clock-pointer';
import getMuiTheme from '../styles/getMuiTheme';

function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(e) {
  const el = e.target;
  const boundingRect = el.getBoundingClientRect();

  const offset = {
    offsetX: e.clientX - boundingRect.left,
    offsetY: e.clientY - boundingRect.top,
  };

  return offset;
}

const ClockMinutes = React.createClass({
  propTypes: {
    initialMinutes: React.PropTypes.number,
    onChange: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      initialMinutes: new Date().getMinutes(),
      onChange: () => {},
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    const clockElement = this.refs.mask;

    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  center: {x: 0, y: 0},
  basePoint: {x: 0, y: 0},

  isMousePressed(e) {
    if (typeof e.buttons === 'undefined') {
      return e.nativeEvent.which;
    }
    return e.buttons;
  },

  handleUp(e) {
    e.preventDefault();
    this.setClock(e.nativeEvent, true);
  },

  handleMove(e) {
    e.preventDefault();
    if (this.isMousePressed(e) !== 1 ) return;
    this.setClock(e.nativeEvent, false);
  },

  handleTouch(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], false);
  },

  setClock(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      const offset = getTouchEventOffsetValues(e);

      e.offsetX = offset.offsetX;
      e.offsetY = offset.offsetY;
    }

    const minutes = this.getMinutes(e.offsetX, e.offsetY);

    this.props.onChange(minutes, finish);
  },

  getMinutes(offsetX, offsetY) {
    const step = 6;
    const x = offsetX - this.center.x;
    const y = offsetY - this.center.y;
    const cx = this.basePoint.x - this.center.x;
    const cy = this.basePoint.y - this.center.y;

    const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    const value = Math.floor(deg / step) || 0;

    return value;
  },

  _getMinuteNumbers() {
    const minutes = [];
    for (let i = 0; i < 12; i++) {
      minutes.push(i * 5);
    }
    const selectedMinutes = this.props.initialMinutes;
    let hasSelected = false;

    const numbers = minutes.map((minute) => {
      const isSelected = selectedMinutes === minute;
      if (isSelected) hasSelected = true;
      return (
        <ClockNumber
          key={minute} isSelected={isSelected} type="minute"
          value={minute}
        />
      );
    });

    return {
      numbers: numbers,
      hasSelected: hasSelected,
      selected: selectedMinutes,
    };
  },

  render() {
    const styles = {
      root: {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
        position: 'relative',
        pointerEvents: 'none',
        boxSizing: 'border-box',
      },

      hitMask: {
        height: '100%',
        width: '100%',
        pointerEvents: 'auto',
      },
    };

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const minutes = this._getMinuteNumbers();

    return (
      <div ref="clock" style={prepareStyles(styles.root)} >
        <ClockPointer value={minutes.selected} type="minute" />
        {minutes.numbers}
        <div ref="mask" style={prepareStyles(styles.hitMask)} hasSelected={minutes.hasSelected}
          onTouchMove={this.handleTouch} onTouchEnd={this.handleTouch}
          onMouseUp={this.handleUp} onMouseMove={this.handleMove}
        />
      </div>
    );
  },
});

export default ClockMinutes;
