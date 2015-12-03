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
      zDepth: 1,
    };
  },

  getInitialState() {
    this.setPlacementThrottled = throttle(this.setPlacement, 100);

    return {
      open: this.props.open,
    };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  windowListeners: {
    resize: 'setPlacementThrottled',
    scroll: 'setPlacementThrottled',
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.anchorEl = nextProps.anchorEl || this.props.anchorEl;
        this.setState({
          open: true,
        });
      } else {
        this.setState({
          open: false,
        }, () => {
          this._animateClose();
        });
      }
    }
  },

  componentDidUpdate() {
    this.setPlacement();
  },

  componentWillUnmount() {
    if (this.state.open) {
      this._animateClose();
    }
  },

  render() {
    return <RenderToLayer
      ref="layer"
      {...this.props}
      componentClickAway={this.componentClickAway}
      render={this.renderLayer} />;
  },

  renderLayer() {
    let {
      animated,
      targetOrigin,
      className,
      zDepth,
    } = this.props;

    const anchorEl = this.props.anchorEl || this.anchorEl;
    let anchor = this.getAnchorPosition(anchorEl);
    let horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    let wrapperStyle = {
      position: 'fixed',
      top: anchor.top,
      left: anchor.left,
      zIndex: 20,
      opacity:1,
      overflow:'auto',
      maxHeight:'100%',
      transform:'scale(0,0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: animated ? Transitions.easeOut('500ms', ['transform', 'opacity']) : null,
    };
    wrapperStyle = this.mergeAndPrefix(wrapperStyle, this.props.style);

    let horizontalAnimation = {
      maxHeight:'100%',
      overflowY:'auto',
      transform:'scaleX(0)',
      opacity:1,
      transition: animated ? Transitions.easeOut('250ms', ['transform', 'opacity']) : null,
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
    };

    let verticalAnimation = {
      opacity:1,
      transform:'scaleY(0)',
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

  componentClickAway(event) {
    if (event.defaultPrevented) {
      return;
    }

    this.requestClose('clickAway');
  },

  _resizeAutoPosition() {
    this.setPlacement();
  },

  _animateClose() {
    if (!this.refs.layer || !this.refs.layer.getLayer()) {
      return;
    }

    const el = this.refs.layer.getLayer().children[0];
    this._animate(el, false);
  },

  _animate(el) {
    let value = '0';
    const inner = el.children[0];
    const innerInner = inner.children[0];
    const innerInnerInner = innerInner.children[0];
    const rootStyle = inner.style;
    const innerStyle = innerInner.style;

    if (this.state.open) {
      value = '1';
    }

    AutoPrefix.set(el.style, 'transform', `scale(${value},${value})`);
    AutoPrefix.set(innerInner.style, 'transform', `scaleX(${value})`);
    AutoPrefix.set(innerInnerInner.style, 'transform', `scaleY(${value})`);
    AutoPrefix.set(rootStyle, 'opacity', value);
    AutoPrefix.set(innerStyle, 'opacity', value);
    AutoPrefix.set(innerInnerInner, 'opacity', value);
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

    a.right = a.left + a.width;
    a.bottom = a.top + a.height;
    a.middle = a.left + a.width / 2;
    a.center = a.top + a.height / 2;

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
      return {};
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

    this._animate(targetEl, true);
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

  applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    if (targetPosition.top + target.bottom > window.innerHeight) {
      let positions = ['top', 'center', 'bottom']
        .filter((position) => position !== targetOrigin.vertical);

      let newTop = anchor[anchorOrigin.vertical] - target[positions[0]];
      if (newTop + target.bottom <= window.innerHeight)
        targetPosition.top = Math.max(0, newTop);
      else {
        newTop = anchor[anchorOrigin.vertical] - target[positions[1]];
        if (newTop + target.bottom <= window.innerHeight)
          targetPosition.top = Math.max(0, newTop);
      }
    }
    if (targetPosition.left + target.right > window.innerWidth) {
      let positions = ['left', 'middle', 'right']
        .filter((position) => position !== targetOrigin.horizontal);

      let newLeft = anchor[anchorOrigin.horizontal] - target[positions[0]];
      if (newLeft + target.right <= window.innerWidth)
        targetPosition.left = Math.max(0, newLeft);
      else {
        newLeft = anchor[anchorOrigin.horizontal] - target[positions[1]];
        if (newLeft + target.right <= window.innerWidth)
          targetPosition.left = Math.max(0, newLeft);
      }
    }
    return targetPosition;
  },

});

export default Popover;
