var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var TableRowColumn = require('./table-row-column');

var TableRow = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    rowNumber: React.PropTypes.number.isRequired,
    columns: React.PropTypes.array.isRequired,
    onRowClick: React.PropTypes.func,
    onCellClick: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    selected: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    hoverable: React.PropTypes.bool,
    displayBorder: React.PropTypes.bool,
    displayRowCheckbox: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      selected: false,
      selectable: true,
      hoverable: false,
      displayBorder: true,
      displayRowCheckbox: true
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  getTheme: function() {
    return this.context.muiTheme.component.tableRow;
  },

  getStyles: function() {
    var theme = this.getTheme();
    var cellBgColor = 'inherit';
    if (this.state.hovered) {
      cellBgColor = theme.hoverColor;
    }
    else if (this.props.selected) {
      cellBgColor = theme.selectedColor;
    }
    else if (this.props.striped) {
      cellBgColor = theme.stripeColor;
    }

    var styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
      },
      cell: {
        backgroundColor: cellBgColor,
        color: this.getTheme().textColor
      }
    };

    if (!this.props.displayBorder) {
      styles.root.borderBottom = '';
    }

    return styles;
  },

  render: function() {
    var className = 'mui-table-row';
    var columns = this.props.columns;
    if (this.props.displayRowCheckbox) {
      columns.splice(0, 0, this._getRowCheckbox());
    }

    return (
      <tr className={className} onClick={this._onRowClick} style={this.getStyles().root}>
        {this._getColumns(columns)}
      </tr>
    );
  },

  _getColumns: function(columns) {
    var rowColumns = [];
    var styles = this.getStyles();

    for (var index = 0; index < this.props.columns.length; index++) {
      var key = this.props.rowNumber + '-' + index;
      var {
        content
      } = columns[index];

      var columnComponent = (
        <TableRowColumn
          key={key}
          columnNumber={index}
          style={styles.cell}
          hoverable={this.props.hoverable}
          onClick={this._onCellClick}
          onHover={this._onCellHover}
          onHoverExit={this._onCellHoverExit}>
          {content}
        </TableRowColumn>
      );

      rowColumns.push(columnComponent);
    }

    return rowColumns;
  },

  _getRowCheckbox: function() {
    var key = this.props.rowNumber + '-cb';
    var checkbox =
      <Checkbox
        ref='rowSelectCB'
        name={key}
        value='selected'
        disabled={!this.props.selectable}
        defaultChecked={this.props.selected}
        onCheck={this._onCheck} />;

    return {
      content: checkbox
    };
  },

  _onRowClick: function(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },

  _onRowHover: function(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },

  _onRowHoverExit: function(e) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(e, this.props.rowNumber);
  },

  _onCellClick: function(e, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    if (this.refs.rowSelectCB !== undefined) this.refs.rowSelectCB.setChecked(!this.refs.rowSelectCB.isChecked());
    this._onRowClick(e);
  },

  _onCellHover: function(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onCellHover) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
      this._onRowHover(e);
    }
  },

  _onCellHoverExit: function(e) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(e, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(e);
    }
  },

  _onCheck: function(e) {
    e.ctrlKey = true;
    this._onCellClick(e, 0);
  },

});

module.exports = TableRow;
