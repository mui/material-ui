import React from 'react';
import ReactDOM from 'react-dom';
import WindowListenable from '../mixins/window-listenable';
import RenderToLayer from '../render-to-layer';
import StylePropable from '../mixins/style-propable';
import PropTypes from '../utils/prop-types';
import Transitions from '../styles/transitions';
import Paper from '../paper';
import throttle from 'lodash.throttle';
import AutoPrefix from '../styles/auto-prefix';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import Extend from '../utils/extend';

const Popover = React.createClass({
  mixins: [
    StylePropable,
    WindowListenable,
  ],

  propTypes: {
    anchorEl: React.PropTypes.object,
    anchorOrigin: PropTypes.origin,
    animated: React.PropTypes.bool,
    autoCloseWhenOffScreen: React.PropTypes.bool,
    canAutoPosition: React.PropTypes.bool,
    children: React.PropTypes.object,
    className: React.PropTypes.string,
    onRequestClose: React.PropTypes.func,
    open: React.PropTypes.bool,
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
    useLayerForClickAway: React.PropTypes.bool,
    zDepth: PropTypes.zDepth,
  },

  getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      animated: true,
      autoCloseWhenOffScreen: true,
      canAutoPosition: true,
      onRequestClose: () => {},
      open: false,
      style: {},
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      useLayerForClickAway: true,
      zDepth: 1,
    };
  },

  getInitialState() {
    this.setPlacementThrottled = throttle(this.setPlacement, 100);

    return {
      open: this.props.open,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  windowListeners: {
    resize: 'setPlacementThrottled',
    scroll: 'setPlacementThrottled',
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (this._isAnimating === true || nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.anchorEl = nextProps.anchorEl || this.props.anchorEl;
        this.setState({
          open: true,
          muiTheme: newMuiTheme,
        }, () => {
          this._animate(true);
        });
      } else {
        if (nextProps.animated) {
          this._animate(false);
          this._isAnimating = true;
          this._timeout = setTimeout(() => {
            if (this.isMounted()) {
              this._isAnimating = false;
              this.setState({
                open: false,
                muiTheme: newMuiTheme,
              });
            }
          }, 500);
        } else {
          this.setState({
            open: false,
            muiTheme: newMuiTheme,
          });
        }
      }
    }
  },

  componentDidUpdate() {
    this.setPlacement();
  },

  render() {
    return (
      <RenderToLayer
        ref="layer"
        open={this.state.open}
        componentClickAway={this.componentClickAway}
        render={this.renderLayer} />
    );
  },

  renderLayer() {
    const {
      animated,
      targetOrigin,
      className,
      zDepth,
    } = this.props;

    const anchorEl = this.props.anchorEl || this.anchorEl;
    const anchor = this.getAnchorPosition(anchorEl);
    const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    const wrapperStyle = this.mergeAndPrefix({
      position: 'fixed',
      top: anchor.top,
      left: anchor.left,
      zIndex: this.state.muiTheme.zIndex.popover,
      opacity: 1,
      overflow: 'auto',
      maxHeight: '100%',
      transform: 'scale(0,0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: animated ? Transitions.easeOut('500ms', ['transform', 'opacity']) : null,
    }, this.props.style);

    const horizontalAnimation = {
      maxHeight: '100%',
      overflowY: 'auto',
      transform: 'scaleX(0)',
      opacity: 1,
      transition: animated ? Transitions.easeOut('250ms', ['transform', 'opacity']) : null,
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
    };

    const verticalAnimation = {
      opacity: 1,
      transform: 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: animated ? Transitions.easeOut('500ms', ['transform', 'opacity']) : null,
    };

    return (
      <Paper style={wrapperStyle} zDepth={zDepth} className={className} >
        <div>
          <div style={horizontalAnimation}>
            <div style={verticalAnimation}>
              {this.props.children}
           </div>
          </div>
        </div>
      </Paper>
    );
  },

  requestClose(reason) {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(reason);
    }
  },

  componentClickAway() {
    this.requestClose('clickAway');
  },

  _resizeAutoPosition() {
    this.setPlacement();
  },

  _animate(open) {
    if (!this.refs.layer || !this.refs.layer.getLayer()) {
      return;
    }

    const el = this.refs.layer.getLayer().children[0];
    let value = '0';
    const inner = el.children[0];
    const innerInner = inner.children[0];
    const innerInnerInner = innerInner.children[0];
    const rootStyle = inner.style;
    const innerStyle = innerInner.style;

    if (open) {
      value = '1';
    }

    AutoPrefix.set(el.style, 'transform', `scale(${value},${value})`);
    AutoPrefix.set(innerInner.style, 'transform', `scaleX(${value})`);
    AutoPrefix.set(innerInnerInner.style, 'transform', `scaleY(${value})`);
    AutoPrefix.set(rootStyle, 'opacity', value);
    AutoPrefix.set(innerStyle, 'opacity', value);
    AutoPrefix.set(innerInnerInner.style, 'opacity', value);
    AutoPrefix.set(el.style, 'opacity', value);
  },

  getAnchorPosition(el) {
    if (!el) {
      el = ReactDOM.findDOMNode(this);
    }

    const rect = el.getBoundingClientRect();
    const a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    a.right = rect.right || a.left + a.width;
    a.bottom = rect.bottom || a.top + a.height;
    a.middle = a.left + ((a.right - a.left) / 2);
    a.center = a.top + ((a.bottom - a.top) / 2);

    return a;
  },

  getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth,
    };
  },

  setPlacement() {
    if (!this.state.open) {
      return;
    }

    const anchorEl = this.props.anchorEl || this.anchorEl;

    if (!this.refs.layer.getLayer()) {
      return;
    }

    const targetEl = this.refs.layer.getLayer().children[0];
    if (!targetEl) {
      return;
    }

    let {targetOrigin, anchorOrigin} = this.props;

    let anchor = this.getAnchorPosition(anchorEl);
    let target = this.getTargetPosition(targetEl);

    let targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal],
    };

    if (this.props.autoCloseWhenOffScreen) {
      this.autoCloseWhenOffScreen(anchor);
    }

    if (this.props.canAutoPosition) {
      target = this.getTargetPosition(targetEl); // update as height may have changed
      targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
    }


    targetEl.style.top = targetPosition.top + 'px';
    targetEl.style.left = targetPosition.left + 'px';
  },

  autoCloseWhenOffScreen(anchorPosition) {
    if (anchorPosition.top < 0
        || anchorPosition.top > window.innerHeight
        || anchorPosition.left < 0
        || anchorPosition.left > window.innerWith
        ) {
      this.requestClose('offScreen');
    }
  },

  getOverlapMode(anchor, target, median) {
    if ([anchor, target].indexOf(median) >= 0) return 'auto';
    if (anchor === target) return 'inclusive';
    return 'exclusive';
  },

  getPositions(anchor, target) {
    let a = Extend(anchor, {});
    let t = Extend(target, {});

    let positions = {
      x: ['left', 'right'].filter((p) => p !== t.horizontal),
      y: ['top', 'bottom'].filter((p) => p !== t.vertical),
    };

    let overlap = {
      x: this.getOverlapMode(a.horizontal, t.horizontal, 'middle'),
      y: this.getOverlapMode(a.vertical, t.vertical, 'center'),
    };

    positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
    positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

    if (overlap.y !== 'auto') {
      a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
      if (overlap.y === 'inclusive') {
        t.vertical = t.vertical;
      }
    }

    if (overlap.x !== 'auto') {
      a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
      if (overlap.y === 'inclusive') {
        t.horizontal = t.horizontal;
      }
    }

    return {
      positions: positions,
      anchorPos: a,
    };
  },

  applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    let {positions, anchorPos} = this.getPositions(anchorOrigin, targetOrigin);

    if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
      let newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
      if (newTop + target.bottom <= window.innerHeight)
        targetPosition.top = Math.max(0, newTop);
      else {
        newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
        if (newTop + target.bottom <= window.innerHeight)
          targetPosition.top = Math.max(0, newTop);
      }
    }
    if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
      let newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
      if (newLeft + target.right <= window.innerWidth)
        targetPosition.left = Math.max(0, newLeft);
      else {
        newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
        if (newLeft + target.right <= window.innerWidth)
          targetPosition.left = Math.max(0, newLeft);
      }
    }
    return targetPosition;
  },

});

export default Popover;
