let React = require('react');
let StylePropable = require('./mixins/style-propable');

let AppCanvas = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  render() {
    let styles = {
      height: '100%',
      backgroundColor: this.context.muiTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased',
    };

    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) { // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles({
              position: 'fixed',
            }, currentChild.props.style),
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
  },

});

module.exports = AppCanvas;
