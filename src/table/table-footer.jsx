var React = require('react');
var Classable = require('../mixins/classable');

var TableFooter = React.createClass({

  mixins: [Classable],

  propTypes: {
    footerItems: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    var classes = this.getClasses('mui-table-footer');

    return (
      <tfoot className={classes}>
        {this._getFooterRow()}
      </tfoot>
    );
  },
  
  _getFooterRow: function() {
    return (
      <tr className="mui-table-footer-row">
        {this._getColumnHeaders(this.props.footerItems, 'f')}
      </tr>
    );
  },
  
  _getColumnHeaders: function(footerData, keyPrefix) {
    var footers = [];
    
    for (var index = 0; index < footerData.length; index++) {
      var {
        displayName,
        ...props
      } = footerData[index];
      var key = keyPrefix + index
      
      footers.push(
        <td key={key} className="mui-table-footer-column" {...props}>
          {displayName}
        </td>
      );
    }
    
    return footers;
  }

});

module.exports = TableFooter;
