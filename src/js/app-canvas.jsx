var React = require('react');
var Classable = require('./mixins/classable');
var CustomVariables = require('./styles/variables/custom-variables');

var AppCanvas = React.createClass({

  mixins: [Classable],

  propTypes: {
    predefinedLayout: React.PropTypes.number
  },

  render: function() {
    var classes = this.getClasses({
      'mui-app-canvas': true,
      'mui-predefined-layout-1': this.props.predefinedLayout === 1
    });

    React.Children.forEach(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'AppBar' : 
          currentChild.props.style = {
            position: 'fixed', 
            height: CustomVariables.appBarHeight
          };
          break;
      }
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = AppCanvas;
