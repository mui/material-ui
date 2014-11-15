/**
 * @jsx React.DOM
 */

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
      x = e.pageX - offset.left,
      y = e.pageY - offset.top;

    el.style.transition = 'none';
    el.style.top = y + 'px';
    el.style.left = x + 'px';

    Dom.addClass(el, 'mui-show');

    CssEvent.onAnimationEnd(el, function() {
      Dom.removeClass(el, 'mui-show');
      if (callback) callback();
    });
  }

});

module.exports = Ripple;
