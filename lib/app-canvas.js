'use strict';

var React = require('react');
var StylePropable = require('./mixins/style-propable');

var AppCanvas = React.createClass({
  displayName: 'AppCanvas',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function render() {
    var _this = this;

    var styles = {
      height: '100%',
      backgroundColor: this.context.muiTheme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased'
    };

    var newChildren = React.Children.map(this.props.children, function (currentChild) {
      if (!currentChild) {
        // If undefined, skip it
        return null;
      }

      switch (currentChild.type.displayName) {
        case 'AppBar':
          return React.cloneElement(currentChild, {
            style: _this.mergeStyles({
              position: 'fixed'
            }, currentChild.props.style)
          });
        default:
          return currentChild;
      }
    }, this);

    return React.createElement(
      'div',
      { style: styles },
      newChildren
    );
  }

});

module.exports = AppCanvas;