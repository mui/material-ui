var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');

var Toolbar = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string
  },

  /** Styles */
  _main: function() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
      backgroundColor: CustomVariables.toolbarBackgroundColor,
      height: CustomVariables.toolbarHeight,
      width: '100%',
      padding: '0px ' + CustomVariables.spacing.desktopGutter + 'px'
    });
  },

  render: function() {
    return (
      <div className={this.props.className} style={this._main()}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Toolbar;
