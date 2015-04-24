var React = require('react');

var AppCanvas = React.createClass({
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    predefinedLayout: React.PropTypes.number
  },

  render: function() {

    var styles = {
      height: '100%',
      backgroundColor: this.context.theme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased'
    };

    var stylesAppBar = {
      position: 'fixed', 
      height: this.context.theme.component.appBar.height
    };

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'AppBar' : 
          return React.cloneElement(currentChild, {style: stylesAppBar});
        default:
          return currentChild;
      }
    }, this);

    return (
      <div style={styles}>
        {newChildren}
      </div>
    );
  }

});

module.exports = AppCanvas;
