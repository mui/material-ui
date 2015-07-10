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
    displaySelectAll: React.PropTypes.bool,
    enableSelectAll: React.PropTypes.bool,
    fixed: React.PropTypes.bool,
    onSelectAll: React.PropTypes.func,
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
    let superHeaderRows = this._createSuperHeaderRows();
    let baseHeaderRow = this._createBaseHeaderRow();

    return (
      <thead className={className} style={this.getStyles().root}>
        {superHeaderRows}
        {baseHeaderRow}
      </thead>
    );
  },

  _createSuperHeaderRows() {
    let numChildren = React.Children.count(this.props.children);
    if (numChildren === 1) return null;

    let superHeaders = [];
    for (let i = 0; i < numChildren - 1; i++) {
      let child = this.props.children[i];

      if (!React.isValidElement(child)) continue;

      superHeaders.push(
        React.cloneElement(child, {className: 'mui-table-super-header-row', rowNumber: i})
      );
    }

    if (superHeaders.length) return superHeaders;
  },

  _createBaseHeaderRow() {
    let child;
    let numChildren = React.Children.count(this.props.children);
    child = (numChildren === 1) ? this.props.children : this.props.children[numChildren - 1];

    let checkboxColumn;
    if (this.props.displaySelectAll) {
      this._getSelectAllCheckboxColumn();
    }

    return React.cloneElement(
      child,
      {
        className: 'mui-table-header-row',
        rowNumber: numChildren
      },
      [checkboxColumn, ...child.props.children]
    );
  },

  _getSelectAllCheckboxColumn() {
    let checkbox =
      <Checkbox
        name='selectallcb'
        value='selected'
        disabled={!this.props.enableSelectAll}
        onCheck={this._onSelectAll} />;
    let style = {
      paddingLeft: 24,
      paddingRight: 24,
    };

    return (
      <TableHeaderColumn
        style={style}
        tooltip='De/Select All'>
        {checkbox}
      </TableHeaderColumn>
    );
  },

  _onSelectAll() {
    if (this.props.onSelectAll) this.props.onSelectAll();
  },

  _onColumnClick(e, columnNumber) {
    if (this.props.onColumnClick) this.props.onColumnClick(e, columnNumber);
  },

});

module.exports = TableHeader;
