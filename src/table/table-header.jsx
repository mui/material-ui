let React = require('react');
let Checkbox = require('../checkbox');
let StylePropable = require('../mixins/style-propable');
let TableHeaderColumn = require('./table-header-column');


let TableHeader = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    superHeaderColumns: React.PropTypes.array,
    onSelectAll: React.PropTypes.func,
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    fixed: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      displaySelectAll: true,
      enableSelectAll: true,
      fixed: true,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableHeader;
  },

  getStyles() {
    let styles = {
      root:  {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
      },
    };

    return styles;
  },

  render() {
    let className = 'mui-table-header';

    return (
      <thead className={className} style={this.getStyles().root}>
        {this._getSuperHeaderRow()}
        {this._getHeaderRow()}
      </thead>
    );
  },

  getSuperHeaderRow() {
    return this.refs.superHeader;
  },

  getHeaderRow() {
    return this.refs.header;
  },

  _getSuperHeaderRow() {
    if (this.props.superHeaderColumns !== undefined) {
      return (
        <tr className='mui-table-super-header-row' ref='superHeader'>
          {this._getColumnHeaders(this.props.superHeaderColumns, 'sh')}
        </tr>
      );
    }
  },

  _getHeaderRow() {
    let columns = this.props.columns.slice();
    if (this.props.displaySelectAll) {
      columns.splice(0, 0, this._getSelectAllCheckbox());
    }

    return (
      <tr className='mui-table-header-row' ref='header'>
        {this._getHeaderColumns(columns, 'h')}
      </tr>
    );
  },

  _getHeaderColumns(headerData, keyPrefix) {
    let headers = [];

    for (let index = 0; index < headerData.length; index++) {
      let {
        content,
        tooltip,
        style,
        ...props,
      } = headerData[index];
      let key = keyPrefix + index;

      headers.push(
        <TableHeaderColumn key={key} style={style} tooltip={tooltip} columnNumber={index} {...props}>
          {content}
        </TableHeaderColumn>
      );
    }

    return headers;
  },

  _getSelectAllCheckbox() {
    let checkbox =
      <Checkbox
        name='selectallcb'
        value='selected'
        disabled={!this.props.enableSelectAll}
        onCheck={this._onSelectAll} />;

    return {
      content: checkbox,
      style: {
        width: 72,
        paddingLeft: 24,
        paddingRight: 24,
      },
    };
  },

  _onSelectAll() {
    if (this.props.onSelectAll) this.props.onSelectAll();
  },

  _onColumnClick(e, columnNumber) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, columnNumber);
  },

});

module.exports = TableHeader;
