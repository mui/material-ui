import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    baseTheme,
    table,
  } = context.muiTheme;

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

class Table extends Component {
  static propTypes = {
    /**
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: PropTypes.bool,
    /**
     * Override the inline-styles of the body's table element.
     */
    bodyStyle: PropTypes.object,
    /**
     * Children passed to table.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the footer will appear fixed below the table.
     * The default value is true.
     */
    fixedFooter: PropTypes.bool,
    /**
     * If true, the header will appear fixed above the table.
     * The default value is true.
     */
    fixedHeader: PropTypes.bool,
    /**
     * Override the inline-styles of the footer's table element.
     */
    footerStyle: PropTypes.object,
    /**
     * Override the inline-styles of the header's table element.
     */
    headerStyle: PropTypes.object,
    /**
     * The height of the table.
     */
    height: PropTypes.string,
    /**
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: PropTypes.bool,
    /**
     * Called when a row cell is clicked.
     * rowNumber is the row number and columnId is
     * the column number or the column key.
     */
    onCellClick: PropTypes.func,
    /**
     * Called when a table cell is hovered.
     * rowNumber is the row number of the hovered row
     * and columnId is the column number or the column key of the cell.
     */
    onCellHover: PropTypes.func,
    /**
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: PropTypes.func,
    /**
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * Called when a table row is no longer hovered.
     * rowNumber is the row number of the row that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * Called when a row is selected.
     * selectedRows is an array of all row selections.
     * IF all rows have been selected, the string "all"
     * will be returned instead to indicate that all rows have been selected.
     */
    onRowSelection: PropTypes.func,
    /**
     * If true, table rows can be selected.
     * If multiple row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of the table's wrapper element.
     */
    wrapperStyle: PropTypes.object,
  };

  static defaultProps = {
    allRowsSelected: false,
    fixedFooter: true,
    fixedHeader: true,
    height: 'inherit',
    multiSelectable: false,
    selectable: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    allRowsSelected: false,
  };

  componentWillMount() {
    if (this.props.allRowsSelected) {
      this.setState({allRowsSelected: true});
    }
  }

  isScrollbarVisible() {
    const tableDivHeight = this.refs.tableDiv.clientHeight;
    const tableBodyHeight = this.refs.tableBody.clientHeight;

    return tableBodyHeight > tableDivHeight;
  }

  createTableHeader(base) {
    return React.cloneElement(
      base,
      {
        enableSelectAll: base.props.enableSelectAll && this.props.selectable && this.props.multiSelectable,
        onSelectAll: this.onSelectAll,
        selectAllSelected: this.state.allRowsSelected,
      }
    );
  }

  createTableBody(base) {
    return React.cloneElement(
      base,
      {
        allRowsSelected: this.state.allRowsSelected,
        multiSelectable: this.props.multiSelectable,
        onCellClick: this.onCellClick,
        onCellHover: this.onCellHover,
        onCellHoverExit: this.onCellHoverExit,
        onRowHover: this.onRowHover,
        onRowHoverExit: this.onRowHoverExit,
        onRowSelection: this.onRowSelection,
        selectable: this.props.selectable,
        style: Object.assign({height: this.props.height}, base.props.style),
      }
    );
  }

  createTableFooter(base) {
    return base;
  }

  onCellClick = (rowNumber, columnNumber, event) => {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber, event);
  };

  onCellHover = (rowNumber, columnNumber, event) => {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber, event);
  };

  onCellHoverExit = (rowNumber, columnNumber, event) => {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, columnNumber, event);
  };

  onRowHover = (rowNumber) => {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  };

  onRowHoverExit = (rowNumber) => {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  };

  onRowSelection = (selectedRows) => {
    if (this.state.allRowsSelected) this.setState({allRowsSelected: false});
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  };

  onSelectAll = () => {
    if (this.props.onRowSelection) {
      if (!this.state.allRowsSelected) {
        this.props.onRowSelection('all');
      } else {
        this.props.onRowSelection('none');
      }
    }

    this.setState({allRowsSelected: !this.state.allRowsSelected});
  };

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
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let tHead;
    let tFoot;
    let tBody;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      const {muiName} = child.type;
      if (muiName === 'TableBody') {
        tBody = this.createTableBody(child);
      } else if (muiName === 'TableHeader') {
        tHead = this.createTableHeader(child);
      } else if (muiName === 'TableFooter') {
        tFoot = this.createTableFooter(child);
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
  }
}

export default Table;
