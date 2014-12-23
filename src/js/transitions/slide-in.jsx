var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Classable = require('../mixins/classable');

var SlideIn = React.createClass({

  mixins: [Classable],

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps: function() {
    return {
      direction: 'left'
    };
  },

  render: function() {
    var {
      className,
      direction,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-transition-slide-in', {
      'mui-is-left': this.props.direction === 'left',
      'mui-is-right': this.props.direction === 'right'
    });

    //Add a custom className to every child
    React.Children.forEach(this.props.children, function(child) {
      child.props.className = child.props.className ?
        child.props.className + ' mui-transition-slide-in-child':
        'mui-transition-slide-in-child';
    });

    return (
      <ReactCSSTransitionGroup {...other}
        className={classes}
        transitionName="mui-transition-slide-in"
        component="div">
        {this.props.children}
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = SlideIn;