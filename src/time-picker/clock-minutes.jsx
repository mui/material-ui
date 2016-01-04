import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import ClockNumber from './clock-number';
import ClockPointer from './clock-pointer';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

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

const ClockMinutes = React.createClass({
  propTypes: {
    initialMinutes: React.PropTypes.number,
    onChange: React.PropTypes.func,
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
      initialMinutes: new Date().getMinutes(),
      onChange: () => {},
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

  componentDidMount() {
    let clockElement = ReactDOM.findDOMNode(this.refs.mask);

    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2,
    };

    this.basePoint = {
      x: this.center.x,
      y: 0,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
      let offset = getTouchEventOffsetValues(e);

      e.offsetX = offset.offsetX;
      e.offsetY = offset.offsetY;
    }

    let minutes = this.getMinutes(e.offsetX, e.offsetY);

    this.props.onChange(minutes, finish);
  },

  getMinutes(offsetX, offsetY) {
    let step = 6;
    let x = offsetX - this.center.x;
    let y = offsetY - this.center.y;
    let cx = this.basePoint.x - this.center.x;
    let cy = this.basePoint.y - this.center.y;

    let atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    let deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    let value = Math.floor(deg / step) || 0;

    return value;
  },

  _getMinuteNumbers() {
    let minutes = [];
    for (let i = 0; i < 12; i++) {
      minutes.push(i * 5);
    }
    let selectedMinutes = this.props.initialMinutes;
    let hasSelected = false;

    let numbers = minutes.map((minute) => {
      let isSelected = selectedMinutes === minute;
      if (isSelected) hasSelected = true;
      return <ClockNumber key={minute} isSelected={isSelected} type="minute" value={minute} />;
    });

    return {
      numbers: numbers,
      hasSelected: hasSelected,
      selected: selectedMinutes,
    };
  },

  render() {
    let styles = {
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

    let minutes = this._getMinuteNumbers();

    return (
      <div ref="clock" style={this.prepareStyles(styles.root)} >
        <ClockPointer value={minutes.selected} type="minute" />
        {minutes.numbers}
        <div ref="mask" style={this.prepareStyles(styles.hitMask)} hasSelected={minutes.hasSelected}
          onTouchMove={this.handleTouch} onTouchEnd={this.handleTouch}
          onMouseUp={this.handleUp} onMouseMove={this.handleMove} />
      </div>
    );
  },
});

export default ClockMinutes;
