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
      backgroundColor: this.context.theme.palette.canvasColor
    };

    React.Children.forEach(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'AppBar' : 
          currentChild.props.style = {
            position: 'fixed', 
            height: this.context.theme.component.appBar.height
          };
          break;
      }
    }, this);

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = AppCanvas;
