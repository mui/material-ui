import React from 'react';
import Checkbox from '../Checkbox';
import TableRowColumn from './TableRowColumn';
import ClickAwayListener from '../internal/ClickAwayListener';
import getMuiTheme from '../styles/getMuiTheme';

const TableBody = React.createClass({

  propTypes: {
    /**
     * @ignore
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: React.PropTypes.bool,

    /**
     * Children passed to table body.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Controls whether or not to deselect all selected
     * rows after clicking outside the table.
     */
    deselectOnClickaway: React.PropTypes.bool,

    /**
     * Controls the display of the row checkbox. The default value is true.
     */
    displayRowCheckbox: React.PropTypes.bool,

    /**
     * @ignore
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: React.PropTypes.bool,

    /**
     * @ignore
     * Callback function for when a cell is clicked.
     */
    onCellClick: React.PropTypes.func,

    /**
     * @ignore
     * Called when a table cell is hovered. rowNumber
     * is the row number of the hovered row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHover: React.PropTypes.func,

    /**
     * @ignore
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: React.PropTypes.func,

    /**
     * @ignore
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: React.PropTypes.func,

    /**
     * @ignore
     * Called when a table row is no longer
     * hovered. rowNumber is the row number of the row
     * that is no longer hovered.
     */
    onRowHoverExit: React.PropTypes.func,

    /**
     * @ignore
     * Called when a row is selected. selectedRows is an
     * array of all row selections. IF all rows have been selected,
     * the string "all" will be returned instead to indicate that
     * all rows have been selected.
     */
    onRowSelection: React.PropTypes.func,

    /**
     * Controls whether or not the rows are pre-scanned to determine
     * initial state. If your table has a large number of rows and
     * you are experiencing a delay in rendering, turn off this property.
     */
    preScanRows: React.PropTypes.bool,

    /**
     * @ignore
     * If true, table rows can be selected. If multiple
     * row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: React.PropTypes.bool,

    /**
     * If true, table rows will be highlighted when
     * the cursor is hovering over the row. The default
     * value is false.
     */
    showRowHover: React.PropTypes.bool,

    /**
     * If true, every other table row starting
     * with the first row will be striped. The default value is false.
     */
    stripedRows: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
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
      muiTheme: this.context.muiTheme || getMuiTheme(),
      selectedRows: this._calculatePreselectedRows(this.props),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newState = {
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    };

    if (this.props.allRowsSelected && !nextProps.allRowsSelected) {
      newState.selectedRows = this.state.selectedRows.length > 0 ?
        [this.state.selectedRows[this.state.selectedRows.length - 1]] : [];
    } else {
      newState.selectedRows = this._calculatePreselectedRows(nextProps);
    }

    this.setState(newState);
  },

  componentClickAway() {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length) {
      this.setState({selectedRows: []});
      if (this.props.onRowSelection) this.props.onRowSelection([]);
    }
  },

  _createRows() {
    const numChildren = React.Children.count(this.props.children);
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
        const props = {
          displayRowCheckbox: this.props.displayRowCheckbox,
          hoverable: this.props.showRowHover,
          selected: this._isRowSelected(rowNumber),
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
          rowNumber: rowNumber++,
        };
        const checkboxColumn = this._createRowCheckboxColumn(props);

        if (rowNumber === numChildren) {
          props.displayBorder = false;
        }

        const children = [checkboxColumn];
        React.Children.forEach(child.props.children, (child) => {
          children.push(child);
        });

        return React.cloneElement(child, {...props, ...handlers}, children);
      }
    });
  },

  _createRowCheckboxColumn(rowProps) {
    if (!this.props.displayRowCheckbox) return null;

    const key = `${rowProps.rowNumber}-cb`;
    const checkbox = (
      <Checkbox
        ref="rowSelectCB"
        name={key}
        value="selected"
        disabled={!this.props.selectable}
        checked={rowProps.selected}
      />
    );

    return (
      <TableRowColumn
        key={key}
        columnNumber={0}
        style={{width: 24}}
      >
        {checkbox}
      </TableRowColumn>
    );
  },

  _calculatePreselectedRows(props) {
    // Determine what rows are 'pre-selected'.
    const preSelectedRows = [];

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
      const selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this._isValueInRange(rowNumber, selection)) return true;
      } else {
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

  _onRowClick(event, rowNumber) {
    event.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      window.getSelection().removeAllRanges();
      this._processRowSelection(event, rowNumber);
    }
  },

  _processRowSelection(event, rowNumber) {
    let selectedRows = this.state.selectedRows;

    if (event.shiftKey && this.props.multiSelectable && selectedRows.length) {
      const lastIndex = selectedRows.length - 1;
      const lastSelection = selectedRows[lastIndex];

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      } else {
        selectedRows.splice(lastIndex, 1, {start: lastSelection, end: rowNumber});
      }
    } else if (((event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)) && this.props.multiSelectable) {
      const idx = selectedRows.indexOf(rowNumber);
      if (idx < 0) {
        let foundRange = false;
        for (let i = 0; i < selectedRows.length; i++) {
          const range = selectedRows[i];
          if (typeof range !== 'object') continue;

          if (this._isValueInRange(rowNumber, range)) {
            foundRange = true;
            const values = this._splitRange(range, rowNumber);
            selectedRows.splice(i, 1, ...values);
          }
        }

        if (!foundRange) selectedRows.push(rowNumber);
      } else {
        selectedRows.splice(idx, 1);
      }
    } else {
      if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
        selectedRows = [];
      } else {
        selectedRows = [rowNumber];
      }
    }

    this.setState({selectedRows: selectedRows});
    if (this.props.onRowSelection) this.props.onRowSelection(this._flattenRanges(selectedRows));
  },

  _splitRange(range, splitPoint) {
    const splitValues = [];
    const startOffset = range.start - splitPoint;
    const endOffset = range.end - splitPoint;

    // Process start half
    splitValues.push(...this._genRangeOfValues(splitPoint, startOffset));

    // Process end half
    splitValues.push(...this._genRangeOfValues(splitPoint, endOffset));

    return splitValues;
  },

  _genRangeOfValues(start, offset) {
    const values = [];
    const dir = (offset > 0) ? -1 : 1; // This forces offset to approach 0 from either direction.
    while (offset !== 0) {
      values.push(start + offset);
      offset += dir;
    }

    return values;
  },

  _flattenRanges(selectedRows) {
    const rows = [];
    for (const selection of selectedRows) {
      if (typeof selection === 'object') {
        const values = this._genRangeOfValues(selection.end, selection.start - selection.end);
        rows.push(selection.end, ...values);
      } else {
        rows.push(selection);
      }
    }

    return rows.sort();
  },

  _onCellClick(event, rowNumber, columnNumber) {
    event.stopPropagation();
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, this._getColumnId(columnNumber), event);
  },

  _onCellHover(event, rowNumber, columnNumber) {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, this._getColumnId(columnNumber), event);
    this._onRowHover(event, rowNumber);
  },

  _onCellHoverExit(event, rowNumber, columnNumber) {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, this._getColumnId(columnNumber), event);
    this._onRowHoverExit(event, rowNumber);
  },

  _onRowHover(event, rowNumber) {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  },

  _onRowHoverExit(event, rowNumber) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  },

  _getColumnId(columnNumber) {
    let columnId = columnNumber;
    if (this.props.displayRowCheckbox) columnId--;

    return columnId;
  },

  render() {
    const {
      className,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const rows = this._createRows();

    return (
      <ClickAwayListener onClickAway={this.componentClickAway}>
        <tbody className={className} style={prepareStyles(Object.assign({}, style))}>
          {rows}
        </tbody>
      </ClickAwayListener>
    );
  },

});

export default TableBody;
