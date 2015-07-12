let React = require('react');
let Checkbox = require('../checkbox');
let StylePropable = require('../mixins/style-propable');
let TableRowColumn = require('./table-row-column');


let TableRow = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
    displayRowCheckbox: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      selected: false,
      selectable: true,
      striped: false,
      hoverable: false,
      displayBorder: true,
      displayRowCheckbox: true,
    };
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.tableRow;
  },

  getStyles() {
    let theme = this.getTheme();
    let cellBgColor = 'inherit';
    if (this.state.hovered) {
      cellBgColor = theme.hoverColor;
    }
    else if (this.props.selected) {
      cellBgColor = theme.selectedColor;
    }
    else if (this.props.striped) {
      cellBgColor = theme.stripeColor;
    }

    let styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor,
      },
      cell: {
        backgroundColor: cellBgColor,
        color: this.getTheme().textColor,
      },
    };

    if (!this.props.displayBorder) {
      styles.root.borderBottom = '';
    }

    return styles;
  },

  render() {
    let className = 'mui-table-row';
    let columns = this.props.columns.slice();
    if (this.props.displayRowCheckbox) {
      columns.splice(0, 0, this._getRowCheckbox());
    }

    return (
      <tr className={className} style={this.getStyles().root}>
        {this._getColumns(columns)}
      </tr>
    );
  },

  _getColumns(columns) {
    let rowColumns = [];
    let styles = this.getStyles();

    for (let index = 0; index < columns.length; index++) {
      let key = this.props.rowNumber + '-' + index;
      let {
        content,
        style,
      } = columns[index];
      if (content === undefined) content = columns[index];

      let columnComponent = (
        <TableRowColumn
          key={key}
          columnNumber={index}
          style={this.mergeStyles(styles.cell, style)}
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

  _getRowCheckbox() {
    let key = this.props.rowNumber + '-cb';
    let checkbox =
      <Checkbox
        ref='rowSelectCB'
        name={key}
        value='selected'
        disabled={!this.props.selectable}
        defaultChecked={this.props.selected} />;

    return {
      content: checkbox,
      style: {
        width: 72,
        paddingLeft: 24,
        paddingRight: 24,
      },
    };
  },

  _onRowClick(e) {
    if (this.props.onRowClick) this.props.onRowClick(e, this.props.rowNumber);
  },

  _onRowHover(e) {
    if (this.props.onRowHover) this.props.onRowHover(e, this.props.rowNumber);
  },

  _onRowHoverExit(e) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(e, this.props.rowNumber);
  },

  _onCellClick(e, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) this.props.onCellClick(e, this.props.rowNumber, columnIndex);
    if (this.refs.rowSelectCB !== undefined) {
      this.refs.rowSelectCB.setChecked(!this.refs.rowSelectCB.isChecked());
      e.ctrlKey = true;
    }
    this._onRowClick(e);
  },

  _onCellHover(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onCellHover) this.props.onCellHover(e, this.props.rowNumber, columnIndex);
      this._onRowHover(e);
    }
  },

  _onCellHoverExit(e, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(e, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(e);
    }
  },

});

module.exports = TableRow;
