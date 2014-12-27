var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Classable = require('../mixins/classable');
var RippleCircle = require('./circle.jsx');

var TouchRipple = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    rippleClassName: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }] 
    };
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-touch-ripple');
    var ripples = this.state.ripples.map(function(ripple) {
      return (
        <RippleCircle
          innerClassName={this.props.rippleClassName}
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending} />
      );
    }.bind(this));

    return (
      <div className={classes}>
        {ripples}
      </div>
    );
  },

  start: function() {
    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length-1].key + 1;
    
    //Start the next unstarted ripple
    for (var i = 0; i < ripples.length; i++) {
      if (!ripples[i].started) {
        ripples[i].started = true;
        break;
      }
    };

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    //Re-render
    this.setState({
      ripples: ripples
    });
  },

  end: function() {
    var ripples = this.state.ripples;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      if (!ripples[i].ending) {
        ripples[i].ending = true;
        break;
      }
    };

    //Re-render
    this.setState({
      ripples: ripples
    });

    //Wait 1 second and remove the ripple from DOM
    setTimeout(function() {
      ripples.shift();
      this.setState({
        ripples: ripples
      });
    }.bind(this), 1000);
  }

});

module.exports = TouchRipple;