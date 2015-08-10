'use strict';

var React = require('react');
var Checkbox = require('../checkbox');
var StylePropable = require('../mixins/style-propable');
var TableRowColumn = require('./table-row-column');

var TableRow = React.createClass({
  displayName: 'TableRow',

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

  getDefaultProps: function getDefaultProps() {
    return {
      selected: false,
      selectable: true,
      striped: false,
      hoverable: false,
      displayBorder: true,
      displayRowCheckbox: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.tableRow;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var cellBgColor = 'inherit';
    if (this.state.hovered) {
      cellBgColor = theme.hoverColor;
    } else if (this.props.selected) {
      cellBgColor = theme.selectedColor;
    } else if (this.props.striped) {
      cellBgColor = theme.stripeColor;
    }

    var styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor
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

  render: function render() {
    var className = 'mui-table-row';
    var columns = this.props.columns.slice();
    if (this.props.displayRowCheckbox) {
      columns.splice(0, 0, this._getRowCheckbox());
    }

    return React.createElement(
      'tr',
      { className: className, style: this.getStyles().root },
      this._getColumns(columns)
    );
  },

  _getColumns: function _getColumns(columns) {
    var rowColumns = [];
    var styles = this.getStyles();

    for (var index = 0; index < columns.length; index++) {
      var key = this.props.rowNumber + '-' + index;
      var _columns$index = columns[index];
      var content = _columns$index.content;
      var style = _columns$index.style;

      if (content === undefined) content = columns[index];

      var columnComponent = React.createElement(
        TableRowColumn,
        {
          key: key,
          columnNumber: index,
          style: this.mergeStyles(styles.cell, style),
          hoverable: this.props.hoverable,
          onClick: this._onCellClick,
          onHover: this._onCellHover,
          onHoverExit: this._onCellHoverExit },
        content
      );

      rowColumns.push(columnComponent);
    }

    return rowColumns;
  },

  _getRowCheckbox: function _getRowCheckbox() {
    var key = this.props.rowNumber + '-cb';
    var checkbox = React.createElement(Checkbox, {
      ref: 'rowSelectCB',
      name: key,
      value: 'selected',
      disabled: !this.props.selectable,
      defaultChecked: this.props.selected });

    return {
      content: checkbox,
      style: {
        width: 72,
        paddingLeft: 24,
        paddingRight: 24
      }
    };
  },

  _onRowClick: function _onRowClick(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },

  _onRowHover: function _onRowHover(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },

  _onRowHoverExit: function _onRowHoverExit(e) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(e, this.props.rowNumber);
  },

  _onCellClick: function _onCellClick(e, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    if (this.refs.rowSelectCB !== undefined) {
      this.refs.rowSelectCB.setChecked(!this.refs.rowSelectCB.isChecked());
      e.ctrlKey = true;
    }
    this._onRowClick(e);
  },

  _onCellHover: function _onCellHover(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onCellHover) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
      this._onRowHover(e);
    }
  },

  _onCellHoverExit: function _onCellHoverExit(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(e, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(e);
    }
  }

});

module.exports = TableRow;