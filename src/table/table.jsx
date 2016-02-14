import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
    table,
  } = state.muiTheme;

  return {
    root: {
      backgroundColor: table.backgroundColor,
      padding: `0 ${baseTheme.spacing.desktopGutter}px`,
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      tableLayout: 'fixed',
      fontFamily: baseTheme.fontFamily,
    },
    bodyTable: {
      height: (props.fixedHeader || props.fixedFooter) ? props.height : 'auto',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    tableWrapper: {
      height: (props.fixedHeader || props.fixedFooter) ? 'auto' : props.height,
      overflow: 'auto',
    },
  };
}

const Table = React.createClass({

  propTypes: {
    /**
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: React.PropTypes.bool,

    /**
     * Override the inline-styles of the body's table element.
     */
    bodyStyle: React.PropTypes.object,

    /**
     * Children passed to table.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, the footer will appear fixed below the table.
     * The default value is true.
     */
    fixedFooter: React.PropTypes.bool,

    /**
     * If true, the header will appear fixed above the table.
     * The default value is true.
     */
    fixedHeader: React.PropTypes.bool,

    /**
     * Override the inline-styles of the footer's table element.
     */
    footerStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the header's table element.
     */
    headerStyle: React.PropTypes.object,

    /**
     * The height of the table.
     */
    height: React.PropTypes.string,

    /**
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: React.PropTypes.bool,

    /**
     * Called when a row cell is clicked.
     * rowNumber is the row number and columnId is
     * the column number or the column key.
     */
    onCellClick: React.PropTypes.func,

    /**
     * Called when a table cell is hovered.
     * rowNumber is the row number of the hovered row
     * and columnId is the column number or the column key of the cell.
     */
    onCellHover: React.PropTypes.func,

    /**
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: React.PropTypes.func,

    /**
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: React.PropTypes.func,

    /**
     * Called when a table row is no longer hovered.
     * rowNumber is the row number of the row that is no longer hovered.
     */
    onRowHoverExit: React.PropTypes.func,

    /**
     * Called when a row is selected.
     * selectedRows is an array of all row selections.
     * IF all rows have been selected, the string "all"
     * will be returned instead to indicate that all rows have been selected.
     */
    onRowSelection: React.PropTypes.func,

    /**
     * If true, table rows can be selected.
     * If multiple row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override the inline-styles of the table's wrapper element.
     */
    wrapperStyle: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      allRowsSelected: false,
      fixedFooter: true,
      fixedHeader: true,
      height: 'inherit',
      multiSelectable: false,
      selectable: true,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      allRowsSelected: this.props.allRowsSelected,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  isScrollbarVisible() {
    const tableDivHeight = this.refs.tableDiv.clientHeight;
    const tableBodyHeight = this.refs.tableBody.clientHeight;

    return tableBodyHeight > tableDivHeight;
  },

  _createTableHeader(base) {
    return React.cloneElement(
      base,
      {
        enableSelectAll: base.props.enableSelectAll && this.props.selectable && this.props.multiSelectable,
        onSelectAll: this._onSelectAll,
        selectAllSelected: this.state.allRowsSelected,
      }
    );
  },

  _createTableBody(base) {
    return React.cloneElement(
      base,
      {
        allRowsSelected: this.state.allRowsSelected,
        multiSelectable: this.props.multiSelectable,
        onCellClick: this._onCellClick,
        onCellHover: this._onCellHover,
        onCellHoverExit: this._onCellHoverExit,
        onRowHover: this._onRowHover,
        onRowHoverExit: this._onRowHoverExit,
        onRowSelection: this._onRowSelection,
        selectable: this.props.selectable,
        style: Object.assign({height: this.props.height}, base.props.style),
      }
    );
  },

  _createTableFooter(base) {
    return base;
  },

  _onCellClick(rowNumber, columnNumber, event) {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber, event);
  },

  _onCellHover(rowNumber, columnNumber, event) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber, event);
  },

  _onCellHoverExit(rowNumber, columnNumber, event) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, columnNumber, event);
  },

  _onRowHover(rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _onRowHoverExit(rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _onRowSelection(selectedRows) {
    if (this.state.allRowsSelected) this.setState({allRowsSelected: false});
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  },

  _onSelectAll() {
    if (this.props.onRowSelection) {
      if (!this.state.allRowsSelected) {
        this.props.onRowSelection('all');
      } else {
        this.props.onRowSelection('none');
      }
    }

    this.setState({allRowsSelected: !this.state.allRowsSelected});
  },

  render() {
    const {
      children,
      className,
      fixedFooter,
      fixedHeader,
      style,
      wrapperStyle,
      headerStyle,
      bodyStyle,
      footerStyle,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    let tHead;
    let tFoot;
    let tBody;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      const displayName = child.type.displayName;
      if (displayName === 'TableBody') {
        tBody = this._createTableBody(child);
      } else if (displayName === 'TableHeader') {
        tHead = this._createTableHeader(child);
      } else if (displayName === 'TableFooter') {
        tFoot = this._createTableFooter(child);
      }
    });

    // If we could not find a table-header and a table-body, do not attempt to display anything.
    if (!tBody && !tHead) return null;

    const mergedTableStyle = Object.assign(styles.root, style);
    let headerTable;
    let footerTable;
    let inlineHeader;
    let inlineFooter;

    if (fixedHeader) {
      headerTable = (
        <div style={prepareStyles(Object.assign({}, headerStyle))}>
          <table className={className} style={mergedTableStyle}>
            {tHead}
          </table>
        </div>
      );
    } else {
      inlineHeader = tHead;
    }

    if (tFoot !== undefined) {
      if (fixedFooter) {
        footerTable = (
          <div style={prepareStyles(Object.assign({}, footerStyle))}>
            <table className={className} style={prepareStyles(mergedTableStyle)}>
              {tFoot}
            </table>
          </div>
        );
      } else {
        inlineFooter = tFoot;
      }
    }

    return (
      <div style={prepareStyles(Object.assign(styles.tableWrapper, wrapperStyle))}>
        {headerTable}
        <div style={prepareStyles(Object.assign(styles.bodyTable, bodyStyle))} ref="tableDiv">
          <table className={className} style={mergedTableStyle} ref="tableBody">
            {inlineHeader}
            {inlineFooter}
            {tBody}
          </table>
        </div>
        {footerTable}
      </div>
    );
  },
});

export default Table;
