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

  animate: function(e) {
    var $ripple = $(this.getDOMNode()),
      $offset = $ripple.parent().offset(),
      x = e.pageX - $offset.left,
      y = e.pageY - $offset.top;

    $ripple.css({
      transition: 'none',
      top: y,
      left: x
    });
    
    $ripple.addClass('mui-show');
    CssEvent.onAnimationEnd($ripple, function() {
      $ripple.removeClass('mui-show');
    });
  }

});

module.exports = Ripple;
