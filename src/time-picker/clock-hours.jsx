import React from 'react';
import ReactDOM from 'react-dom';
import ClockNumber from './clock-number';
import ClockPointer from './clock-pointer';
import getMuiTheme from '../styles/getMuiTheme';

function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(event) {
  const el = event.target;
  const boundingRect = el.getBoundingClientRect();

  const offset = {
    offsetX: event.clientX - boundingRect.left,
    offsetY: event.clientY - boundingRect.top,
  };

  return offset;
}

const ClockHours = React.createClass({

  propTypes: {
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    initialHours: React.PropTypes.number,
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
      initialHours: new Date().getHours(),
      onChange: () => {},
      format: 'ampm',
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
    const clockElement = ReactDOM.findDOMNode(this.refs.mask);

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

  isMousePressed(event) {
    if (typeof event.buttons === 'undefined') {
      return event.nativeEvent.which;
    }

    return event.buttons;
  },

  handleUp(event) {
    event.preventDefault();
    this.setClock(event.nativeEvent, true);
  },

  handleMove(event) {
    event.preventDefault();
    if (this.isMousePressed(event) !== 1 ) return;
    this.setClock(event.nativeEvent, false);
  },

  handleTouchMove(event) {
    event.preventDefault();
    this.setClock(event.changedTouches[0], false);
  },

  handleTouchEnd(event) {
    event.preventDefault();
    this.setClock(event.changedTouches[0], true);
  },

  setClock(event, finish) {
    if (typeof event.offsetX === 'undefined') {
      const offset = getTouchEventOffsetValues(event);

      event.offsetX = offset.offsetX;
      event.offsetY = offset.offsetY;
    }

    const hours = this.getHours(event.offsetX, event.offsetY);

    this.props.onChange(hours, finish);
  },

  getHours(offsetX, offsetY) {
    const step = 30;
    const x = offsetX - this.center.x;
    const y = offsetY - this.center.y;
    const cx = this.basePoint.x - this.center.x;
    const cy = this.basePoint.y - this.center.y;

    const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    let value = Math.floor(deg / step) || 0;

    const delta = Math.pow(x, 2) + Math.pow(y, 2);
    const distance = Math.sqrt(delta);

    value = value || 12;
    if (this.props.format === '24hr') {
      if (distance < 90) {
        value += 12;
        value %= 24;
      }
    } else {
      value %= 12;
    }

    return value;
  },

  _getSelected() {
    let hour = this.props.initialHours;

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  },

  _getHourNumbers() {
    const style = {
      pointerEvents: 'none',
    };
    const hourSize = this.props.format === 'ampm' ? 12 : 24;

    const hours = [];
    for (let i = 1; i <= hourSize; i++) {
      hours.push(i % 24);
    }

    return hours.map((hour) => {
      const isSelected = this._getSelected() === hour;
      return (
        <ClockNumber
          key={hour}
          style={style}
          isSelected={isSelected}
          type="hour"
          value={hour}
        />
      );
    });
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

    const hours = this._getSelected();
    const numbers = this._getHourNumbers();

    return (
      <div ref="clock" style={prepareStyles(styles.root)} >
        <ClockPointer hasSelected={true} value={hours} type="hour" />
        {numbers}
        <div
          ref="mask" style={prepareStyles(styles.hitMask)} onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd} onMouseUp={this.handleUp} onMouseMove={this.handleMove}
        />
      </div>
    );
  },
});

export default ClockHours;
