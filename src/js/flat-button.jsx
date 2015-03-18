var React = require('react');
var Classable = require('./mixins/classable');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  render: function() {
    var {
        label,
        primary,
        secondary,
        ...other
      } = this.props;
    var classes = this.getClasses('mui-flat-button', {
      'mui-is-primary': !this.props.disabled && primary,
      'mui-is-secondary': !this.props.disabled && !primary && secondary
    });
    var children;

    if (label) children = <span className="mui-flat-button-label">{label}</span>;
    else children = this.props.children;

    return (
      <EnhancedButton {...other}
        className={classes}>
        {children}
      </EnhancedButton>
    );
  }

});

module.exports = FlatButton;