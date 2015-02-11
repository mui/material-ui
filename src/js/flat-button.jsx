var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Theme = require('./styles/theme.js').get();

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

  getDefaultProps: function() {
    return {
      
    };
  },

  render: function() {

    var {
        label,
        primary,
        secondary,
        ...other
      } = this.props;

    var classes = this.getClasses('mui-flat-button', {
      'mui-is-primary': primary,
      'mui-is-secondary': !primary && secondary
    });
    var children;

    if (label) children = <span className="mui-flat-button-label">{label}</span>;
    else children = this.props.children;

    var focusRippleColor = primary ?
      Theme.accent1Color : secondary ?
      Theme.primary1Color : Theme.textColor;

    var touchRippleColor = focusRippleColor;

    return (
      <EnhancedButton {...other}
        className={classes}
        focusRippleColor={focusRippleColor}
        touchRippleColor={touchRippleColor}>
        <span className="mui-flat-button-label">{label}</span>
      </EnhancedButton>
    );
  }

});

module.exports = FlatButton;