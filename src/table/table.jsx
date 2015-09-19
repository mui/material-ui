let React = require('react');
let StylePropable = require('../mixins/style-propable');


let Table = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    allRowsSelected: React.PropTypes.bool,
    fixedFooter: React.PropTypes.bool,
    fixedHeader: React.PropTypes.bool,
    height: React.PropTypes.string,
    multiSelectable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onRowSelection: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    style: React.PropTypes.object,
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
      allRowsSelected: this.props.allRowsSelected,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.table;
  },

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        padding: '0 ' + this.context.muiTheme.spacing.desktopGutter + 'px',
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        tableLayout: 'fixed',
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

  render() {
    let {
      children,
      className,
      fixedFooter,
      fixedHeader,
      style,
      ...other,
    } = this.props;
    let classes = 'mui-table';
    if (className) classes += ' ' + className;
    let styles = this.getStyles();

    let tHead, tFoot, tBody;
    for (let child of children) {
      if (!React.isValidElement(child)) continue;

      let displayName = child.type.displayName;
      if (displayName === 'TableBody') {
        tBody = this._createTableBody(child);
      }
      else if (displayName === 'TableHeader') {
        tHead = this._createTableHeader(child);
      }
      else if (displayName === 'TableFooter') {
        tFoot = this._createTableFooter(child);
      }
    }

    // If we could not find a table-header and a table-body, do not attempt to display anything.
    if (!tBody && !tHead) return null;

    let mergedTableStyle = this.mergeAndPrefix(styles.root, style);
    let headerTable, footerTable;
    let inlineHeader, inlineFooter;
    if (fixedHeader) {
      headerTable = (
        <div className="mui-header-table">
          <table className={className} style={mergedTableStyle}>
            {tHead}
          </table>
        </div>
      );
    }
    else {
      inlineHeader = tHead;
    }
    if (tFoot !== undefined) {
      if (fixedFooter) {
        footerTable = (
          <div className="mui-footer-table">
            <table className={className} style={mergedTableStyle}>
              {tFoot}
            </table>
          </div>
        );
      }
      else {
        inlineFooter = tFoot;
      }
    }

    return (
      <div className="mui-table-wrapper" style={styles.tableWrapper}>
        {headerTable}
        <div className="mui-body-table" style={styles.bodyTable}>
          <table className={classes} style={mergedTableStyle}>
            {inlineHeader}
            {inlineFooter}
            {tBody}
          </table>
        </div>
        {footerTable}
      </div>
    );
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
        style: this.mergeAndPrefix({height: this.props.height}, base.props.style),
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
    if (this.state.allRowsSelected) this.setState({ allRowsSelected: false });
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  },

  _onSelectAll() {
    if (this.props.onRowSelection && !this.state.allRowsSelected) this.props.onRowSelection('all');
    this.setState({allRowsSelected: !this.state.allRowsSelected});
  },

});

module.exports = Table;
