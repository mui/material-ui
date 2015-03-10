var React = require('react'),
  Classable = require('./mixins/classable');

var Paper = React.createClass({

  mixins: [Classable],

  propTypes: {
    circle: React.PropTypes.bool,
    innerClassName: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
  },

  getDefaultProps: function() {
    return {
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  render: function() {
    var {
      className,
      circle,
      innerClassName,
      rounded,
      zDepth,
      ...other } = this.props,
      classes = this.getClasses(
        'mui-paper ' +
        'mui-z-depth-' + this.props.zDepth, { 
        'mui-rounded': this.props.rounded,
        'mui-circle': this.props.circle
      }),
      insideClasses = 
        this.props.innerClassName + ' ' +
        'mui-paper-container ' +
        'mui-z-depth-bottom';

    return (
      <div {...other} className={classes}>
        <div ref="innerContainer" className={insideClasses} style={this.props.innerStyle || {}}>
          {this.props.children}
        </div>
      </div>
    );
  },

  getInnerContainer: function() {
    return this.refs.innerContainer;
  }

});

module.exports = Paper;
