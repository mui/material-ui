import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import RenderToLayer from '../internal/RenderToLayer';
import propTypes from '../utils/propTypes';
import Paper from '../Paper';
import throttle from 'lodash/throttle';
import PopoverAnimationDefault from './PopoverAnimationDefault';

class Popover extends Component {
  static propTypes = {
    /**
     * This is the DOM element that will be used to set the position of the
     * popover.
     */
    anchorEl: PropTypes.object,
    /**
     * This is the point on the anchor where the popover's
     * `targetOrigin` will attach to.
     * Options:
     * vertical: [top, middle, bottom];
     * horizontal: [left, center, right].
     */
    anchorOrigin: propTypes.origin,
    /**
     * If true, the popover will apply transitions when
     * it is added to the DOM.
     */
    animated: PropTypes.bool,
    /**
     * Override the default animation component used.
     */
    animation: PropTypes.func,
    /**
     * If true, the popover will hide when the anchor is scrolled off the screen.
     */
    autoCloseWhenOffScreen: PropTypes.bool,
    /**
     * If true, the popover (potentially) ignores `targetOrigin`
     * and `anchorOrigin` to make itself fit on screen,
     * which is useful for mobile devices.
     */
    canAutoPosition: PropTypes.bool,
    /**
     * The content of the popover.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Callback function fired when the popover is requested to be closed.
     *
     * @param {string} reason The reason for the close request. Possibles values
     * are 'clickAway' and 'offScreen'.
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the popover is visible.
     */
    open: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * This is the point on the popover which will attach to
     * the anchor's origin.
     * Options:
     * vertical: [top, middle, bottom];
     * horizontal: [left, center, right].
     */
    targetOrigin: propTypes.origin,
    /**
     * If true, the popover will render on top of an invisible
     * layer, which will prevent clicks to the underlying
     * elements, and trigger an `onRequestClose('clickAway')` call.
     */
    useLayerForClickAway: PropTypes.bool,
    /**
     * The zDepth of the popover.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    animated: true,
    autoCloseWhenOffScreen: true,
    canAutoPosition: true,
    onRequestClose: () => {},
    open: false,
    style: {
      overflowY: 'auto',
    },
    targetOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    useLayerForClickAway: true,
    zDepth: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.handleResize = throttle(this.setPlacement, 100);
    this.handleScroll = throttle(this.setPlacement.bind(this, true), 50);

    this.state = {
      open: props.open,
      closing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.anchorEl = nextProps.anchorEl || this.props.anchorEl;
        this.setState({
          open: true,
          closing: false,
        });
      } else {
        if (nextProps.animated) {
          this.setState({closing: true});
          this.timeout = setTimeout(() => {
            this.setState({
              open: false,
            });
          }, 500);
        } else {
          this.setState({
            open: false,
          });
        }
      }
    }
  }

  componentDidUpdate() {
    this.setPlacement();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  renderLayer = () => {
    const {
      animated, // eslint-disable-line no-unused-vars
      animation,
      children,
      style,
      ...other,
    } = this.props;

    let Animation = animation || PopoverAnimationDefault;
    let styleRoot = style;

    if (!Animation) {
      Animation = Paper;
      styleRoot = {
        position: 'fixed',
      };
      if (!this.state.open) {
        return null;
      }
    }

    return (
      <Animation {...other} style={styleRoot} open={this.state.open && !this.state.closing}>
        {children}
      </Animation>
    );
  };

  requestClose(reason) {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(reason);
    }
  }

  componentClickAway = () => {
    this.requestClose('clickAway');
  };

  _resizeAutoPosition() {
    this.setPlacement();
  }

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
  }

  getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth,
    };
  }

  setPlacement = (scrolling) => {
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

    const {targetOrigin, anchorOrigin} = this.props;

    const anchor = this.getAnchorPosition(anchorEl);
    let target = this.getTargetPosition(targetEl);

    let targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal],
    };

    if (scrolling && this.props.autoCloseWhenOffScreen) {
      this.autoCloseWhenOffScreen(anchor);
    }

    if (this.props.canAutoPosition) {
      target = this.getTargetPosition(targetEl); // update as height may have changed
      targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
    }

    targetEl.style.top = `${Math.max(0, targetPosition.top)}px`;
    targetEl.style.left = `${Math.max(0, targetPosition.left)}px`;
    targetEl.style.maxHeight = `${window.innerHeight}px`;
  };

  autoCloseWhenOffScreen(anchorPosition) {
    if (anchorPosition.top < 0 ||
      anchorPosition.top > window.innerHeight ||
      anchorPosition.left < 0 ||
      anchorPosition.left > window.innerWidth) {
      this.requestClose('offScreen');
    }
  }

  getOverlapMode(anchor, target, median) {
    if ([anchor, target].indexOf(median) >= 0) return 'auto';
    if (anchor === target) return 'inclusive';
    return 'exclusive';
  }

  getPositions(anchor, target) {
    const a = {...anchor};
    const t = {...target};

    const positions = {
      x: ['left', 'right'].filter((p) => p !== t.horizontal),
      y: ['top', 'bottom'].filter((p) => p !== t.vertical),
    };

    const overlap = {
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
  }

  applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    const {positions, anchorPos} = this.getPositions(anchorOrigin, targetOrigin);

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
  }

  render() {
    return (
      <div style={{display: 'none'}}>
        <EventListener
          target="window"
          onScroll={this.handleScroll}
          onResize={this.handleResize}
        />
        <RenderToLayer
          ref="layer"
          open={this.state.open}
          componentClickAway={this.componentClickAway}
          useLayerForClickAway={this.props.useLayerForClickAway}
          render={this.renderLayer}
        />
      </div>
    );
  }
}

export default Popover;
