var React = require('react');

var AppCanvas = React.createClass({
  
  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    predefinedLayout: React.PropTypes.number
  },

  render: function() {

    var styles = {
      height: '100%',
      backgroundColor: this.context.muiTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased'
    };

    var stylesAppBar = {
      position: 'fixed', 
      height: this.context.muiTheme.component.appBar.height
    };

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      if (!currentChild) { // If undefined, skip it
        return;
      }

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
