var React = require('react'),
  CssEvent = require('./utils/css-event.js'),
  Dom = require('./utils/dom.js'),
  Classable = require('./mixins/classable.js');

var Ripple = React.createClass({

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('mui-ripple');

    return (
      <div className={classes} />
    );
  },

  animate: function(e, callback) {
    var el = this.getDOMNode(),
      offset = Dom.offset(el.parentNode),
      pageX = e.pageX == undefined ? e.nativeEvent.x : e.pageX,
      pageY = e.pageY == undefined ? e.nativeEvent.y : e.pageY,
      x = pageX - offset.left,
      y = pageY - offset.top;

    this._animateRipple(el, x, y, callback);
  },

  animateFromCenter: function(callback) {
    var el = this.getDOMNode(),
      x = el.parentNode.offsetWidth / 2,
      y = el.parentNode.offsetHeight / 2;

    this._animateRipple(el, x, y, callback);
  },

  _animateRipple: function(el, x, y, callback) {
    el.style.transition = 'none';
    el.style.top = y + 'px';
    el.style.left = x + 'px';

    Dom.addClass(el, 'mui-is-visible');

    CssEvent.onAnimationEnd(el, function() {
      Dom.removeClass(el, 'mui-is-visible');
      if (callback) callback();
    });
  }

});

module.exports = Ripple;