var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var TableHeaderColumn = require('./table-header-column');

var TableHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    superHeaderColumns: React.PropTypes.array,
    onSelectAll: React.PropTypes.func,
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    fixed: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      displaySelectAll: true,
      enableSelectAll: true,
      fixed: true
    };
  },

  getTheme: function() {
    return this.context.muiTheme.component.tableHeader;
  },

  getStyles: function() {
    var styles = {
      root:  {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
      },
      selectAll: {
        padding: 20
      }
    };

    return styles;
  },

  render: function() {
    var className = 'mui-table-header';

    return (
      <thead className={className} style={this.getStyles().root}>
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
    if (this.props.superHeaderColumns !== undefined) {
      return (
        <tr className='mui-table-super-header-row' ref='superHeader'>
          {this._getColumnHeaders(this.props.superHeaderColumns, 'sh')}
        </tr>
      );
    }
  },

  _getHeaderRow: function() {
    var columns = this.props.columns;
    if (this.props.displaySelectAll) {
      columns.splice(0, 0, this._getSelectAllCheckbox());
    }

    return (
      <tr className='mui-table-header-row' ref='header'>
        {this._getHeaderColumns(columns, 'h')}
      </tr>
    );
  },

  _getHeaderColumns: function(headerData, keyPrefix) {
    var styles = this.getStyles();
    var headers = [];

    for (var index = 0; index < headerData.length; index++) {
      var {
        content,
        tooltip,
        style,
        ...props
      } = headerData[index];
      var key = keyPrefix + index;

      headers.push(
        <TableHeaderColumn key={key} style={style} tooltip={tooltip} columnNumber={index} {...props}>
          {content}
        </TableHeaderColumn>
      );
    }

    return headers;
  },

  _getSelectAllCheckbox: function() {
    var checkbox =
      <Checkbox
        ref='rowSelectCB'
        name='selectallcb'
        value='selected'
        disabled={!this.props.enableSelectAll}
        onCheck={this._onSelectAll} />;

    return {
      content: checkbox
    };
  },

  _onSelectAll: function() {
    if (this.props.onSelectAll) this.props.onSelectAll();
  },

  _onColumnClick: function(e, columnNumber) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, columnNumber);
  }

});

module.exports = TableHeader;
