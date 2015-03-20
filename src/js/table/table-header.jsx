var React = require('react');
var Classable = require('../mixins/classable');

var TableHeader = React.createClass({

  mixins: [Classable],

  propTypes: {
    headerItems: React.PropTypes.array.isRequired,
    superHeaderItems: React.PropTypes.array,
    fixed: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      fixed: true
    };
  },

  render: function() {
    var classes = this.getClasses('mui-table-header');

    return (
      <thead className={classes}>
        {this._getSuperHeaderRow()}
        {this._getHeaderRow()}
      </thead>
    );
  },
  
  getSuperHeaderRow: function() {
    return this.refs.superHeader;
  },
  
  getHeaderRow: function() {
    return this.refs.header;
  },
  
  _getSuperHeaderRow: function() {
    if (this.props.superHeaderItems !== undefined) {
      return (
        <tr className="mui-table-super-header-row" ref="superHeader">
          {this._getColumnHeaders(this.props.superHeaderItems, 'sh')}
        </tr>
      );
    }
  },
  
  _getHeaderRow: function() {
    return (
      <tr className="mui-table-header-row" ref="header">
        {this._getColumnHeaders(this.props.headerItems, 'h')}
      </tr>
    );
  },
  
  _getColumnHeaders: function(headerData, keyPrefix) {
    var headers = [];
    
    for (var index = 0; index < headerData.length; index++) {
      var {
        displayName,
        ...props
      } = headerData[index];
      var key = keyPrefix + index
      
      headers.push(
        <th key={key} className="mui-table-header-column" {...props}>
          {displayName}
        </th>
      );
    }
    
    return headers;
  }

});

module.exports = TableHeader;
