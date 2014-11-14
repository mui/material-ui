/**
 * @jsx React.DOM
 */

var $ = require('jquery'),
  React = require('react'),
  CssEvent = require('./utils/css-event.js'),
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
      $ripple = $(el),
      $offset = $ripple.parent().offset(),
      x = e.pageX - $offset.left,
      y = e.pageY - $offset.top;

    $ripple.css({
      transition: 'none',
      top: y,
      left: x
    });

    $ripple.addClass('mui-show');

    CssEvent.onAnimationEnd(el, function() {
      $ripple.removeClass('mui-show');
      if (callback) callback();
    });
  }

});

module.exports = Ripple;
