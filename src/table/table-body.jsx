const React = require('react');
const Checkbox = require('../checkbox');
const TableRowColumn = require('./table-row-column');
const ClickAwayable = require('../mixins/click-awayable');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');


const TableBody = React.createClass({

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    allRowsSelected: React.PropTypes.bool,
    deselectOnClickaway: React.PropTypes.bool,
    displayRowCheckbox: React.PropTypes.bool,
    multiSelectable: React.PropTypes.bool,
    onCellClick: React.PropTypes.func,
    onCellHover: React.PropTypes.func,
    onCellHoverExit: React.PropTypes.func,
    onRowHover: React.PropTypes.func,
    onRowHoverExit: React.PropTypes.func,
    onRowSelection: React.PropTypes.func,
    preScanRows: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    showRowHover: React.PropTypes.bool,
    stripedRows: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      allRowsSelected: false,
      deselectOnClickaway: true,
      displayRowCheckbox: true,
      multiSelectable: false,
      preScanRows: true,
      selectable: true,
      style: {},
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      selectedRows: this._calculatePreselectedRows(this.props),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    let newState = {};

    if (this.props.allRowsSelected && !nextProps.allRowsSelected) {
      let lastSelectedRow = this.state.selectedRows.length ? this.state.selectedRows[this.state.selectedRows.length - 1] : undefined;

      newState.selectedRows = [lastSelectedRow];
    } else {
      newState.selectedRows = this._calculatePreselectedRows(nextProps);
    }

    this.setState(newState);
  },

  componentClickAway() {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length) {
      this.setState({ selectedRows: [] });
      if (this.props.onRowSelection) this.props.onRowSelection([]);
    }
  },

  render() {
    let {
      className,
      style,
      ...other,
    } = this.props;
    let classes = 'mui-table-body';
    if (className) classes += ' ' + className;

    let rows = this._createRows();

    return (
      <tbody className={classes} style={this.prepareStyles(style)}>
        {rows}
      </tbody>
    );
  },

  _createRows() {
    let numChildren = React.Children.count(this.props.children);
    let rowNumber = 0;
    const handlers = {
      onCellClick: this._onCellClick,
      onCellHover: this._onCellHover,
      onCellHoverExit: this._onCellHoverExit,
      onRowHover: this._onRowHover,
      onRowHoverExit: this._onRowHoverExit,
      onRowClick: this._onRowClick,
    };

    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        let props = {
          displayRowCheckbox: this.props.displayRowCheckbox,
          hoverable: this.props.showRowHover,
          selected: this._isRowSelected(rowNumber),
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
          rowNumber: rowNumber++,
        };
        let checkboxColumn = this._createRowCheckboxColumn(props);

        if (rowNumber === numChildren) {
          props.displayBorder = false;
        }

        let children = [checkboxColumn];
        React.Children.forEach(child.props.children, (child) => {
          children.push(child);
        });

        return React.cloneElement(child, {...props, ...handlers}, children);
      }
    });
  },

  _createRowCheckboxColumn(rowProps) {
    if (!this.props.displayRowCheckbox) return null;

    let key = rowProps.rowNumber + '-cb';
    let checkbox =
      <Checkbox
        ref="rowSelectCB"
        name={key}
        value="selected"
        disabled={!this.props.selectable}
        checked={rowProps.selected} />;

    return (
      <TableRowColumn
        key={key}
        columnNumber={0}
        style={{width: 24}}>
        {checkbox}
      </TableRowColumn>
    );
  },

  _calculatePreselectedRows (props) {
    // Determine what rows are 'pre-selected'.
    let preSelectedRows = [];

    if (props.selectable && props.preScanRows) {
      let index = 0;
      React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.props.selected && (preSelectedRows.length === 0 || props.multiSelectable)) {
            preSelectedRows.push(index);
          }

          index++;
        }
      });
    }

    return preSelectedRows;
  },

  _isRowSelected(rowNumber) {
    if (this.props.allRowsSelected) {
      return true;
    }

    for (let i = 0; i < this.state.selectedRows.length; i++) {
      let selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this._isValueInRange(rowNumber, selection)) return true;
      }
      else {
        if (selection === rowNumber) return true;
      }
    }

    return false;
  },

  _isValueInRange(value, range) {
    if (!range) return false;

    if ((range.start <= value && value <= range.end) || (range.end <= value && value <= range.start)) {
      return true;
    }

    return false;
  },

  _onRowClick(e, rowNumber) {
    e.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      window.getSelection().removeAllRanges();
      this._processRowSelection(e, rowNumber);
    }
  },

  _processRowSelection(e, rowNumber) {
    let selectedRows = this.state.selectedRows;

    if (e.shiftKey && this.props.multiSelectable && selectedRows.length) {
      let lastIndex = selectedRows.length - 1;
      let lastSelection = selectedRows[lastIndex];

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      }
      else {
        selectedRows.splice(lastIndex, 1, {start: lastSelection, end: rowNumber});
      }
    }
    else if (((e.ctrlKey && !e.metaKey) || (e.metaKey && !e.ctrlKey)) && this.props.multiSelectable) {
      let idx = selectedRows.indexOf(rowNumber);
      if (idx < 0) {
        let foundRange = false;
        for (let i = 0; i < selectedRows.length; i++) {
          let range = selectedRows[i];
          if (typeof range !== 'object') continue;

          if (this._isValueInRange(rowNumber, range)) {
            foundRange = true;
            let values = this._splitRange(range, rowNumber);
            selectedRows.splice(i, 1, ...values);
          }
        }

        if (!foundRange) selectedRows.push(rowNumber);
      }
      else {
        selectedRows.splice(idx, 1);
      }
    }
    else {
      if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
        selectedRows = [];
      }
      else {
        selectedRows = [rowNumber];
      }
    }

    this.setState({ selectedRows: selectedRows });
    if (this.props.onRowSelection) this.props.onRowSelection(this._flattenRanges(selectedRows));
  },

  _splitRange(range, splitPoint) {
    let splitValues = [];
    let startOffset = range.start - splitPoint;
    let endOffset = range.end - splitPoint;

    // Process start half
    splitValues.push(...this._genRangeOfValues(splitPoint, startOffset));

    // Process end half
    splitValues.push(...this._genRangeOfValues(splitPoint, endOffset));

    return splitValues;
  },

  _genRangeOfValues(start, offset) {
    let values = [];
    let dir = (offset > 0) ? -1 : 1; // This forces offset to approach 0 from either direction.
    while (offset !== 0) {
      values.push(start + offset);
      offset += dir;
    }

    return values;
  },

  _flattenRanges(selectedRows) {
    let rows = [];
    for (let selection of selectedRows) {
      if (typeof selection === 'object') {
        let values = this._genRangeOfValues(selection.end, selection.start - selection.end);
        rows.push(selection.end, ...values);
      }
      else {
        rows.push(selection);
      }
    }

    return rows.sort();
  },

  _onCellClick(e, rowNumber, columnNumber) {
    e.stopPropagation();
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, this._getColumnId(columnNumber));
  },

  _onCellHover(e, rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, this._getColumnId(columnNumber));
    this._onRowHover(e, rowNumber);
  },

  _onCellHoverExit(e, rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, this._getColumnId(columnNumber));
    this._onRowHoverExit(e, rowNumber);
  },

  _onRowHover(e, rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _onRowHoverExit(e, rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _getColumnId(columnNumber) {
    let columnId = columnNumber;
    if (this.props.displayRowCheckbox) columnId--;

    return columnId;
  },

});

module.exports = TableBody;
