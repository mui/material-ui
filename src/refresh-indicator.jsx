import React from 'react';
const StylePropable = require('./mixins/style-propable');
const AutoPrefix = require('./styles/auto-prefix');
const Transitions = require("./styles/transitions");
const Paper = require('./paper');

const VIEWBOX_SIZE = 32;
const RefreshIndicator = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    left: React.PropTypes.number.isRequired,
    percentage: React.PropTypes.number,
    size: React.PropTypes.number,
    status: React.PropTypes.oneOf(['ready', 'loading', 'hide']),
    style: React.PropTypes.object,
    top: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      percentage: 0,
      size: 40,
      status: 'hide',
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate() {
    this._scalePath(React.findDOMNode(this.refs.path), 0);
    this._rotateWrapper(React.findDOMNode(this.refs.wrapper));
  },

  render() {
    const rootStyle = this._getRootStyle();
    return (
      <Paper
        circle={true}
        style={this.mergeAndPrefix(rootStyle, this.props.style)}
        ref="indicatorCt"
      >
        {this._renderChildren()}
      </Paper>
    );
  },

  _renderChildren() {
    const paperSize = this._getPaperSize();
    let childrenCmp = null;
    if (this.props.status !== 'ready') {
      const circleStyle = this._getCircleStyle(paperSize);
      childrenCmp = (
        <div ref="wrapper" style={this.mergeAndPrefix({
            transition: Transitions.create('transform', '20s', null, 'linear'),
            width: '100%',
            height: '100%',
          })}
        >
          <svg style={{
              width: paperSize,
              height: paperSize,
            }}
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          >
            <circle ref="path"
              style={this.mergeAndPrefix(circleStyle.style, {
                transition: Transitions.create('all', '1.5s', null, 'ease-in-out'),
              })}
              {...circleStyle.attr}
            />
          </svg>
        </div>
      );
    } else {
      const circleStyle = this._getCircleStyle(paperSize);
      const polygonStyle = this._getPolygonStyle(paperSize);
      childrenCmp = (
        <svg style={{
            width: paperSize,
            height: paperSize,
          }}
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        >
          <circle
            style={this.mergeAndPrefix(circleStyle.style)}
            {...circleStyle.attr}
          >
          </circle>
          <polygon
            style={this.mergeAndPrefix(polygonStyle.style)}
            {...polygonStyle.attr}
          />
        </svg>
      );
    }

    return childrenCmp;
  },

  _getTheme() {
    return this.context.muiTheme.component.refreshIndicator;
  },

  _getPaddingSize() {
    const padding = this.props.size * 0.1;
    return padding;
  },

  _getPaperSize() {
    return this.props.size - this._getPaddingSize() * 2;
  },

  _getCircleAttr() {
    return {
      radiu: VIEWBOX_SIZE / 2 - 5,
      originX: VIEWBOX_SIZE / 2,
      originY: VIEWBOX_SIZE / 2,
      strokeWidth: 3,
    };
  },

  _getArcDeg() {
    const p = this.props.percentage / 100;

    const beginDeg = p * 120;
    const endDeg = p * 410;
    return [beginDeg, endDeg];
  },

  _getFactor() {
    const p = this.props.percentage / 100;
    const p1 = Math.min(1, p / 0.4);

    return p1;
  },

  _getRootStyle() {
    const padding = this._getPaddingSize();
    return {
      position: "absolute",
      zIndex: 2,
      width: this.props.size,
      height: this.props.size,
      padding: padding,
      top: -10000,
      left: -10000,
      transform: `translate3d(${10000 + this.props.left}px, ${10000 + this.props.top}px, 0)`,
      opacity: this.props.status === 'hide' ? 0 : 1,
      transition: this.props.status === 'hide' ? Transitions.create('all', '.3s', 'ease-out') : 'none',
    };
  },

  _getCircleStyle() {
    const isLoading = this.props.status === 'loading';
    const p1 = isLoading ? 1 : this._getFactor();
    const circle = this._getCircleAttr();
    const perimeter = Math.PI * 2 * circle.radiu;

    const [beginDeg, endDeg] = this._getArcDeg();
    const arcLen = (endDeg - beginDeg) * perimeter / 360;
    const dashOffset = -beginDeg * perimeter / 360;

    const theme = this._getTheme();
    return {
      style: {
        strokeDasharray: arcLen + ', ' + (perimeter - arcLen),
        strokeDashoffset: dashOffset,
        stroke: (isLoading || this.props.percentage === 100) ? theme.loadingStrokeColor : theme.strokeColor,
        strokeLinecap: 'round',
        opacity: p1,
        strokeWidth: circle.strokeWidth * p1,
        fill: 'none',
      },
      attr: {
        cx: circle.originX,
        cy: circle.originY,
        r: circle.radiu,
      },
    };
  },

  _getPolygonStyle() {
    const p1 = this._getFactor();
    const circle = this._getCircleAttr();

    const triangleCx = circle.originX + circle.radiu;
    const triangleCy = circle.originY;
    const dx = (circle.strokeWidth * 7 / 4) * p1;
    const trianglePath = (triangleCx - dx) + ',' + triangleCy + ' ' + (triangleCx + dx) + ',' + triangleCy + ' ' + triangleCx + ',' + (triangleCy + dx);

    const [, endDeg] = this._getArcDeg();

    const theme = this._getTheme();
    return {
      style: {
        fill: this.props.percentage === 100 ? theme.loadingStrokeColor : theme.strokeColor,
        transform: `rotate(${endDeg}deg)`,
        transformOrigin: `${circle.originX}px ${circle.originY}px`,
        opacity: p1,
      },
      attr: {
        points: trianglePath,
      },
    };
  },

  _scalePath(path, step) {
    if (this.props.status !== 'loading' || !this.isMounted()) return;

    const currStep = (step || 0) % 3;

    clearTimeout(this._timer1);
    this._timer1 = setTimeout(this._scalePath.bind(this, path, currStep + 1), currStep ? 750 : 250);

    const circle = this._getCircleAttr();
    const perimeter = Math.PI * 2 * circle.radiu;
    const arcLen = perimeter * 0.64;

    if (currStep === 0) {
      path.style.strokeDasharray = '1, 200';
      path.style.strokeDashoffset = 0;
      path.style[this.prefixed('transitionDuration')] = '0ms';
    } else if (currStep === 1) {
      path.style.strokeDasharray = arcLen + ', 200';
      path.style.strokeDashoffset = -15;
      path.style[this.prefixed('transitionDuration')] = '750ms';
    } else {
      path.style.strokeDasharray = arcLen + ',200';
      path.style.strokeDashoffset = -(perimeter - 1);
      path.style[this.prefixed('transitionDuration')] = '850ms';
    }
  },

  _rotateWrapper(wrapper) {
    if (this.props.status !== 'loading' || !this.isMounted()) return;

    clearTimeout(this._timer2);
    this._timer2 = setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    AutoPrefix.set(wrapper.style, "transform", null);
    AutoPrefix.set(wrapper.style, "transform", "rotate(0deg)");
    AutoPrefix.set(wrapper.style, "transitionDuration", "0ms");

    setTimeout(() => {
      if (this.isMounted()) {
        AutoPrefix.set(wrapper.style, "transform", "rotate(1800deg)");
        wrapper.style.transitionDuration = "10s";
        AutoPrefix.set(wrapper.style, "transitionTimingFunction", "linear");
      }
    }, 50);
  },

  prefixed(key) {
    return AutoPrefix.single(key);
  },

});

module.exports = RefreshIndicator;
