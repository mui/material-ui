let React = require('react');

let AppCanvas = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function() {

    let styles = {
      height: '100%',
      backgroundColor: this.context.muiTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased'
    };

    let newChildren = React.Children.map(this.props.children, function(currentChild) {
      if (!currentChild) { // If undefined, skip it
        return;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: {
              position: 'fixed',
            }
          });
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
