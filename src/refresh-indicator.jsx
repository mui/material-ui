import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import autoPrefix from './styles/auto-prefix';
import Transitions from './styles/transitions';
import Paper from './paper';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const VIEWBOX_SIZE = 32;
const RefreshIndicator = React.createClass({

  propTypes: {
    /**
     * Override the theme's color of the indicator while it's status is
     * "ready" and it's percentage is less than 100.
     */
    color: React.PropTypes.string,

    /**
     * The absolute left position of the indicator in pixels.
     */
    left: React.PropTypes.number.isRequired,

    /**
     * Override the theme's color of the indicator while
     * it's status is "loading" or when it's percentage is 100.
     */
    loadingColor: React.PropTypes.string,

    /**
     * The confirmation progress to fetch data. Max value is 100.
     */
    percentage: React.PropTypes.number,

    /**
     * Size in pixels.
     */
    size: React.PropTypes.number,

    /**
     * The display status of the indicator. If the status is
     * "ready", the indicator will display the ready state
     * arrow. If the status is "loading", it will display
     * the loading progress indicator. If the status is "hide",
     * the indicator will be hidden.
     */
    status: React.PropTypes.oneOf(['ready', 'loading', 'hide']),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The absolute top position of the indicator in pixels.
     */
    top: React.PropTypes.number.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      percentage: 0,
      size: 40,
      status: 'hide',
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
    this.componentDidUpdate();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentDidUpdate() {
    this._scalePath(ReactDOM.findDOMNode(this.refs.path), 0);
    this._rotateWrapper(ReactDOM.findDOMNode(this.refs.wrapper));
  },

  componentWillUnmount() {
    clearTimeout(this.scalePathTimer);
    clearTimeout(this.rotateWrapperTimer);
    clearTimeout(this.rotateWrapperSecondTimer);
  },

  scalePathTimer: undefined,
  rotateWrapperTimer: undefined,
  rotateWrapperSecondTimer: undefined,

  _renderChildren() {
    const paperSize = this._getPaperSize();
    let childrenCmp = null;
    if (this.props.status !== 'ready') {
      const circleStyle = this._getCircleStyle(paperSize);
      childrenCmp = (
        <div ref="wrapper" style={this.prepareStyles({
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
              style={this.prepareStyles(circleStyle.style, {
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
            style={this.prepareStyles(circleStyle.style)}
            {...circleStyle.attr}
          >
          </circle>
          <polygon
            style={this.prepareStyles(polygonStyle.style)}
            {...polygonStyle.attr}
          />
        </svg>
      );
    }

    return childrenCmp;
  },

  _getTheme() {
    return this.state.muiTheme.refreshIndicator;
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
      position: 'absolute',
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
        stroke: (isLoading || this.props.percentage === 100) ?
          (this.props.loadingColor || theme.loadingStrokeColor) :
          (this.props.color || theme.strokeColor),
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
    const trianglePath = (triangleCx - dx) + ',' + triangleCy + ' ' + (triangleCx + dx) + ',' +
      triangleCy + ' ' + triangleCx + ',' + (triangleCy + dx);

    const [, endDeg] = this._getArcDeg();

    const theme = this._getTheme();
    return {
      style: {
        fill: this.props.percentage === 100 ?
          (this.props.loadingColor || theme.loadingStrokeColor) :
          (this.props.color || theme.strokeColor),
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
    if (this.props.status !== 'loading') return;

    const currStep = (step || 0) % 3;

    const circle = this._getCircleAttr();
    const perimeter = Math.PI * 2 * circle.radiu;
    const arcLen = perimeter * 0.64;

    let strokeDasharray;
    let strokeDashoffset;
    let transitionDuration;

    if (currStep === 0) {
      strokeDasharray = '1, 200';
      strokeDashoffset = 0;
      transitionDuration = '0ms';
    } else if (currStep === 1) {
      strokeDasharray = arcLen + ', 200';
      strokeDashoffset = -15;
      transitionDuration = '750ms';
    } else {
      strokeDasharray = arcLen + ',200';
      strokeDashoffset = -(perimeter - 1);
      transitionDuration = '850ms';
    }

    autoPrefix.set(path.style, 'strokeDasharray', strokeDasharray, this.state.muiTheme);
    autoPrefix.set(path.style, 'strokeDashoffset', strokeDashoffset, this.state.muiTheme);
    autoPrefix.set(path.style, 'transitionDuration', transitionDuration, this.state.muiTheme);

    this.scalePathTimer = setTimeout(() => this._scalePath(path, currStep + 1), currStep ? 750 : 250);
  },

  _rotateWrapper(wrapper) {
    if (this.props.status !== 'loading') return;

    autoPrefix.set(wrapper.style, 'transform', null, this.state.muiTheme);
    autoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)', this.state.muiTheme);
    autoPrefix.set(wrapper.style, 'transitionDuration', '0ms', this.state.muiTheme);

    this.rotateWrapperSecondTimer = setTimeout(() => {
      autoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)', this.state.muiTheme);
      autoPrefix.set(wrapper.style, 'transitionDuration', '10s', this.state.muiTheme);
      autoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear', this.state.muiTheme);
    }, 50);

    this.rotateWrapperTimer = setTimeout(() => this._rotateWrapper(wrapper), 10050);
  },

  render() {
    const rootStyle = this._getRootStyle();
    return (
      <Paper
        circle={true}
        style={this.mergeStyles(rootStyle, this.props.style)}
        ref="indicatorCt"
      >
        {this._renderChildren()}
      </Paper>
    );
  },

});

export default RefreshIndicator;
