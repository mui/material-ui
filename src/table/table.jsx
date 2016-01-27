import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.table;
  },

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.state.muiTheme.rawTheme.spacing.desktopGutter + 'px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed',
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      },
      bodyTable: {
        height: (this.props.fixedHeader || this.props.fixedFooter) ? this.props.height : 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
      tableWrapper: {
        height: (this.props.fixedHeader || this.props.fixedFooter) ? 'auto' : this.props.height,
        overflow: 'auto',
      },
    };

    return styles;
  },

  isScrollbarVisible() {
    const tableDivHeight = ReactDOM.findDOMNode(this.refs.tableDiv).clientHeight;
    const tableBodyHeight = ReactDOM.findDOMNode(this.refs.tableBody).clientHeight;

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
        style: this.mergeStyles({height: this.props.height}, base.props.style),
      }
    );
  },

  _createTableFooter(base) {
    return base;
  },

  _onCellClick(rowNumber, columnNumber) {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber);
  },

  _onCellHover(rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber);
  },

  _onCellHoverExit(rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, columnNumber);
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
    let {
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
    let styles = this.getStyles();

    let tHead;
    let tFoot;
    let tBody;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      let displayName = child.type.displayName;
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

    let mergedTableStyle = this.mergeStyles(styles.root, style);
    let headerTable;
    let footerTable;
    let inlineHeader;
    let inlineFooter;

    if (fixedHeader) {
      headerTable = (
        <div style={this.prepareStyles(headerStyle)}>
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
          <div style={this.prepareStyles(footerStyle)}>
            <table className={className} style={this.prepareStyles(mergedTableStyle)}>
              {tFoot}
            </table>
          </div>
        );
      } else {
        inlineFooter = tFoot;
      }
    }

    return (
      <div style={this.prepareStyles(styles.tableWrapper, wrapperStyle)}>
        {headerTable}
        <div style={this.prepareStyles(styles.bodyTable, bodyStyle)} ref="tableDiv">
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
