'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsWindowListenable = require('../mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _renderToLayer = require('../render-to-layer');

var _renderToLayer2 = _interopRequireDefault(_renderToLayer);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var _utilsCssEvent = require('../utils/css-event');

var _utilsCssEvent2 = _interopRequireDefault(_utilsCssEvent);

var _utilsDom = require('../utils/dom');

var _utilsDom2 = _interopRequireDefault(_utilsDom);

var _utilsPropTypes = require('../utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _paper = require('../paper');

var _paper2 = _interopRequireDefault(_paper);

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _stylesAutoPrefix = require('../styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _mixinsContextPure = require('../mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var Popover = _react2['default'].createClass({
  displayName: 'Popover',

  mixins: [_mixinsContextPure2['default'], _mixinsStylePropable2['default'], _mixinsWindowListenable2['default']],

  propTypes: {
    anchorEl: _react2['default'].PropTypes.object,
    anchorOrigin: _utilsPropTypes2['default'].origin,
    animated: _react2['default'].PropTypes.bool,
    autoCloseWhenOffScreen: _react2['default'].PropTypes.bool,
    canAutoPosition: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.object,
    className: _react2['default'].PropTypes.string,
    open: _react2['default'].PropTypes.bool,
    onRequestClose: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    targetOrigin: _utilsPropTypes2['default'].origin,
    zDepth: _utilsPropTypes2['default'].zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      animated: true,
      autoCloseWhenOffScreen: true,
      canAutoPosition: true,
      onRequestClose: function onRequestClose() {},
      open: false,
      style: {},
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      zDepth: 1
    };
  },

  getInitialState: function getInitialState() {
    this.setPlacementThrottled = (0, _lodashThrottle2['default'])(this.setPlacement, 100);
    return {
      open: false
    };
  },

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  windowListeners: {
    resize: 'setPlacementThrottled',
    scroll: 'setPlacementThrottled'
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) this._showInternal(nextProps.anchorEl);else this._hideInternal();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setPlacement();
  },

  render: function render() {
    return _react2['default'].createElement(_renderToLayer2['default'], _extends({
      ref: 'layer'
    }, this.props, {
      componentClickAway: this.componentClickAway,
      render: this.renderLayer }));
  },

  renderLayer: function renderLayer() {
    var _props = this.props;
    var animated = _props.animated;
    var targetOrigin = _props.targetOrigin;
    var className = _props.className;
    var zDepth = _props.zDepth;

    var anchorEl = this.props.anchorEl || this.anchorEl;
    var anchor = this.getAnchorPosition(anchorEl);
    var horizontal = targetOrigin.horizontal.replace("middle", "vertical");

    var wrapperStyle = {
      position: 'fixed',
      top: anchor.top,
      left: anchor.left,
      zIndex: 20,
      opacity: 1,
      overflow: 'auto',
      maxHeight: '100%',
      transform: 'scale(0,0)',
      transformOrigin: horizontal + ' ' + targetOrigin.vertical,
      transition: animated ? _stylesTransitions2['default'].easeOut('500ms', ['transform', 'opacity']) : null
    };
    wrapperStyle = this.mergeAndPrefix(wrapperStyle, this.props.style);

    var horizontalAnimation = {
      maxHeight: '100%',
      overflowY: 'auto',
      transform: 'scaleX(0)',
      opacity: 1,
      transition: animated ? _stylesTransitions2['default'].easeOut('250ms', ['transform', 'opacity']) : null,
      transformOrigin: horizontal + ' ' + targetOrigin.vertical
    };

    var verticalAnimation = {
      opacity: 1,
      transform: 'scaleY(0)',
      transformOrigin: horizontal + ' ' + targetOrigin.vertical,
      transition: animated ? _stylesTransitions2['default'].easeOut('500ms', ['transform', 'opacity']) : null
    };

    return _react2['default'].createElement(
      _paper2['default'],
      { style: wrapperStyle, zDepth: zDepth, className: className },
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { style: horizontalAnimation },
          _react2['default'].createElement(
            'div',
            { style: verticalAnimation },
            this.props.children
          )
        )
      )
    );
  },

  requestClose: function requestClose() {
    if (this.props.onRequestClose) this.props.onRequestClose();
  },

  componentClickAway: function componentClickAway(e) {
    if (e.defaultPrevented) {
      return;
    }
    this._hideInternal();
  },

  _resizeAutoPosition: function _resizeAutoPosition() {
    this.setPlacement();
  },

  _showInternal: function _showInternal(anchorEl) {
    this.anchorEl = anchorEl || this.props.anchorEl;
    this.setState({ open: true });
    var popOverShowEvent = new CustomEvent('popOverOnShow', { detail: this });
    document.dispatchEvent(popOverShowEvent);
  },

  _hideInternal: function _hideInternal() {
    var _this = this;

    if (!this.state.open) {
      return;
    }
    this.setState({
      open: false
    }, function () {
      _this._animateClose();
      var popOverHideEvent = new CustomEvent('popOverOnHide');
      document.dispatchEvent(popOverHideEvent);
    });
  },

  _animateClose: function _animateClose() {
    if (!this.refs.layer.getLayer()) {
      return;
    }
    var el = this.refs.layer.getLayer().children[0];
    this._animate(el, false);
  },

  _animateOpen: function _animateOpen(el) {
    this._animate(el, true);
  },

  _animate: function _animate(el) {
    var _this2 = this;

    var value = '0';
    var inner = el.children[0];
    var innerInner = inner.children[0];
    var innerInnerInner = innerInner.children[0];
    var rootStyle = inner.style;
    var innerStyle = innerInner.style;

    if (this.state.open) {
      value = '1';
    } else {
      _utilsCssEvent2['default'].onTransitionEnd(inner, function () {
        if (!_this2.state.open) _this2.requestClose();
      });
    }

    _stylesAutoPrefix2['default'].set(el.style, 'transform', 'scale(' + value + ',' + value + ')');
    _stylesAutoPrefix2['default'].set(innerInner.style, 'transform', 'scaleX(' + value + ')');
    _stylesAutoPrefix2['default'].set(innerInnerInner.style, 'transform', 'scaleY(' + value + ')');
    _stylesAutoPrefix2['default'].set(rootStyle, 'opacity', value);
    _stylesAutoPrefix2['default'].set(innerStyle, 'opacity', value);
    _stylesAutoPrefix2['default'].set(innerInnerInner, 'opacity', value);
    _stylesAutoPrefix2['default'].set(el.style, 'opacity', value);
  },

  getAnchorPosition: function getAnchorPosition(el) {
    if (!el) el = _reactDom2['default'].findDOMNode(this);

    var rect = el.getBoundingClientRect();
    var a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight
    };

    a.right = a.left + a.width;
    a.bottom = a.top + a.height;
    a.middle = a.left + a.width / 2;
    a.center = a.top + a.height / 2;
    return a;
  },

  getTargetPosition: function getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth
    };
  },

  setPlacement: function setPlacement(el) {
    if (!this.state.open) return;

    var anchorEl = this.props.anchorEl || this.anchorEl;

    if (!this.refs.layer.getLayer()) return;

    var targetEl = this.refs.layer.getLayer().children[0];
    if (!targetEl) {
      return {};
    }

    var _props2 = this.props;
    var targetOrigin = _props2.targetOrigin;
    var anchorOrigin = _props2.anchorOrigin;

    var anchor = this.getAnchorPosition(anchorEl);
    var target = this.getTargetPosition(targetEl);

    var targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal]
    };

    if (this.props.autoCloseWhenOffScreen) this.autoCloseWhenOffScreen(anchor);

    if (this.props.canAutoPosition) {
      target = this.getTargetPosition(targetEl); // update as height may have changed
      targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
    }

    targetEl.style.top = targetPosition.top + 'px';
    targetEl.style.left = targetPosition.left + 'px';
    this._animateOpen(targetEl);
  },

  autoCloseWhenOffScreen: function autoCloseWhenOffScreen(anchorPosition) {
    if (!this.props.autoCloseWhenOffScreen) return;
    if (anchorPosition.top < 0 || anchorPosition.top > window.innerHeight || anchorPosition.left < 0 || anchorPosition.left > window.innerWith) this._hideInternal();
  },

  applyAutoPositionIfNeeded: function applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
    if (targetPosition.top + target.bottom > window.innerHeight) {
      var positions = ["top", "center", "bottom"].filter(function (position) {
        return position !== targetOrigin.vertical;
      });

      var newTop = anchor[anchorOrigin.vertical] - target[positions[0]];
      if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);else {
        newTop = anchor[anchorOrigin.vertical] - target[positions[1]];
        if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);
      }
    }
    if (targetPosition.left + target.right > window.innerWidth) {
      var positions = ["left", "middle", "right"].filter(function (position) {
        return position !== targetOrigin.horizontal;
      });

      var newLeft = anchor[anchorOrigin.horizontal] - target[positions[0]];
      if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);else {
        newLeft = anchor[anchorOrigin.horizontal] - target[positions[1]];
        if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);
      }
    }
    return targetPosition;
  }

});

exports['default'] = Popover;
module.exports = exports['default'];