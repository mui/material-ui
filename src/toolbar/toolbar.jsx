var React = require('react');
var StylePropable = require('../mixins/style-propable');

var Toolbar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
  },

  /** Styles */
  _main: function() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: '0px ' + this.context.theme.spacing.desktopGutter + 'px',
    });
  },

  getTheme: function (argument) {
    return this.context.theme.component.toolbar;
  },

  render: function() {

    var firstChild = this.props.children[0];
    var lastChild = this.props.children[this.props.children.length - 1];
    if (firstChild.type.displayName === 'ToolbarGroup') firstChild.props.firstChild = true;
    if (lastChild.type.displayName === 'ToolbarGroup') lastChild.props.lastChild = true;

    return (
      <div className={this.props.className} style={this._main()}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
