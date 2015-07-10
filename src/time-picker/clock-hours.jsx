let React = require('react');
let StylePropable = require('../mixins/style-propable');
let ClockNumber = require("./clock-number");
let ClockPointer = require("./clock-pointer");


function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(e) {
  let el = e.target;
  let boundingRect = el.getBoundingClientRect();

  let offset = {
    offsetX: e.clientX - boundingRect.left,
    offsetY: e.clientY - boundingRect.top,
  };

  return offset;
}


let ClockHours = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    initialHours: React.PropTypes.number,
    onChange: React.PropTypes.func,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
  },

  center: {x: 0, y: 0},
  basePoint: {x: 0, y: 0},

  isMousePressed(e) {
    if (typeof e.buttons === "undefined") {
      return e.nativeEvent.which;
    }

    return e.buttons;
  },

  getDefaultProps() {
    return {
      initialHours: new Date().getHours(),
      onChange: () => {},
      format: 'ampm',
    };
  },

  componentDidMount() {
    let clockElement = React.findDOMNode(this.refs.mask);

    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
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

  handleTouchMove(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], false);
  },

  handleTouchEnd(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], true);
  },

  setClock(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      let offset = getTouchEventOffsetValues(e);

      e.offsetX = offset.offsetX;
      e.offsetY = offset.offsetY;
    }

    let hours = this.getHours(e.offsetX, e.offsetY);

    this.props.onChange(hours, finish);
  },

  getHours(offsetX, offsetY) {
    let step = 30;
    let x = offsetX - this.center.x;
    let y = offsetY - this.center.y;
    let cx = this.basePoint.x - this.center.x;
    let cy = this.basePoint.y - this.center.y;

    let atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    let value = Math.floor(deg / step) || 0;

    let delta = Math.pow(x, 2) + Math.pow(y, 2);
    let distance = Math.sqrt(delta);

    value = value || 12;
    if (this.props.format === "24hr"){
      if (distance < 90){
        value += 12;
        value %= 24;
      }
    }
    else {
      value %= 12;
    }

    return value;
  },

  _getSelected() {
    let hour = this.props.initialHours;

    if (this.props.format === "ampm"){
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  },

  _getHourNumbers() {
    let style = {
      pointerEvents: "none",
    };
    let hourSize = this.props.format === 'ampm' ? 12 : 24;

    let hours = [];
    for(let i = 1; i <= hourSize; i++){
      hours.push(i % 24);
    }

    return hours.map((hour) => {
      let isSelected = this._getSelected() === hour;
      return <ClockNumber key={hour} style={style} isSelected={isSelected} type="hour" value={hour} />;
    });
  },

  render() {
    let styles = {
      root: {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box",
      },

      hitMask: {
        height: "100%",
        width: "100%",
        pointerEvents: "auto",
      },
    };

    let hours = this._getSelected();
    let numbers = this._getHourNumbers();

    return (
      <div ref="clock" style={this.mergeAndPrefix(styles.root)} >
        <ClockPointer hasSelected={true} value={hours} type="hour" />
        {numbers}
        <div ref="mask" style={this.mergeAndPrefix(styles.hitMask)} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onMouseUp={this.handleUp} onMouseMove={this.handleMove}/>
      </div>
    );
  },
});

module.exports = ClockHours;
