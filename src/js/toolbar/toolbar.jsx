var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');

var Toolbar = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
  },

  /** Styles */
  _main: function() {
    return this.mergeAndPrefix({
      backgroundColor: CustomVariables.toolbarBackgroundColor,
      height: CustomVariables.toolbarHeight,
      width: '100%',
      padding: '0px ' + CustomVariables.spacing.desktopGutter + 'px',
    });
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
