import React from 'react';
import StylePropable from './mixins/style-propable';
import muiThemeable from './muiThemeable';

let AppCanvas = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
  },

  render() {
    let styles = {
      height: '100%',
      backgroundColor: this.props._muiTheme.baseTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased',
      direction: 'ltr',
    };

    let newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) { // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(currentChild.props.style, {
              position: 'fixed',
            }),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div style={this.prepareStyles(styles)}>
        {newChildren}
      </div>
    );
  },

});

AppCanvas = muiThemeable(AppCanvas);

export default AppCanvas;
