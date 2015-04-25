var React = require('react');
var StylePropable = require('../mixins/style-propable');

var Toolbar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  getStyles: function() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: this.props.noGutter ? 0 : '0px ' + this.context.theme.spacing.desktopGutter + 'px'
    }, this.props.style);
  },

  render: function() {
    return (
      <div className={this.props.className} style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
