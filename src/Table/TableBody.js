import React, {Component, PropTypes} from 'react';
import Checkbox from '../Checkbox';
import TableRowColumn from './TableRowColumn';
import ClickAwayListener from '../internal/ClickAwayListener';

class TableBody extends Component {
  static muiName = 'TableBody';

  static propTypes = {
    /**
     * @ignore
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: PropTypes.bool,
    /**
     * Children passed to table body.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Controls whether or not to deselect all selected
     * rows after clicking outside the table.
     */
    deselectOnClickaway: PropTypes.bool,
    /**
     * Controls the display of the row checkbox. The default value is true.
     */
    displayRowCheckbox: PropTypes.bool,
    /**
     * @ignore
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: PropTypes.bool,
    /**
     * @ignore
     * Callback function for when a cell is clicked.
     */
    onCellClick: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is hovered. rowNumber
     * is the row number of the hovered row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is no longer
     * hovered. rowNumber is the row number of the row
     * that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a row is selected. selectedRows is an
     * array of all row selections. IF all rows have been selected,
     * the string "all" will be returned instead to indicate that
     * all rows have been selected.
     */
    onRowSelection: PropTypes.func,
    /**
     * Controls whether or not the rows are pre-scanned to determine
     * initial state. If your table has a large number of rows and
     * you are experiencing a delay in rendering, turn off this property.
     */
    preScanRows: PropTypes.bool,
    /**
     * @ignore
     * If true, table rows can be selected. If multiple
     * row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    /**
     * If true, table rows will be highlighted when
     * the cursor is hovering over the row. The default
     * value is false.
     */
    showRowHover: PropTypes.bool,
    /**
     * If true, every other table row starting
     * with the first row will be striped. The default value is false.
     */
    stripedRows: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    allRowsSelected: false,
    deselectOnClickaway: true,
    displayRowCheckbox: true,
    multiSelectable: false,
    preScanRows: true,
    selectable: true,
    style: {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    selectedRows: [],
  };

  componentWillMount() {
    this.setState({selectedRows: this.calculatePreselectedRows(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allRowsSelected && !nextProps.allRowsSelected) {
      this.setState({
        selectedRows: this.state.selectedRows.length > 0 ?
          [this.state.selectedRows[this.state.selectedRows.length - 1]] : [],
      });
      // TODO: should else be conditional, not run any time props other than allRowsSelected change?
    } else {
      this.setState({
        selectedRows: this.calculatePreselectedRows(nextProps),
      });
    }
  }

  handleClickAway = () => {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length) {
      this.setState({
        selectedRows: [],
      });
      if (this.props.onRowSelection) {
        this.props.onRowSelection([]);
      }
    }
  };

  createRows() {
    const numChildren = React.Children.count(this.props.children);
    let rowNumber = 0;
    const handlers = {
      onCellClick: this.onCellClick,
      onCellHover: this.onCellHover,
      onCellHoverExit: this.onCellHoverExit,
      onRowHover: this.onRowHover,
      onRowHoverExit: this.onRowHoverExit,
      onRowClick: this.onRowClick,
    };

    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        const props = {
          hoverable: this.props.showRowHover,
          selected: this.isRowSelected(rowNumber),
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
          rowNumber: rowNumber++,
        };

        if (rowNumber === numChildren) {
          props.displayBorder = false;
        }

        const children = [
          this.createRowCheckboxColumn(props),
        ];

        React.Children.forEach(child.props.children, (child) => {
          children.push(child);
        });

        return React.cloneElement(child, {...props, ...handlers}, children);
      }
    });
  }

  createRowCheckboxColumn(rowProps) {
    if (!this.props.displayRowCheckbox) {
      return null;
    }

    const key = `${rowProps.rowNumber}-cb`;
    const disabled = !this.props.selectable;
    const checkbox = (
      <Checkbox
        ref="rowSelectCB"
        name={key}
        value="selected"
        disabled={disabled}
        checked={rowProps.selected}
      />
    );

    return (
      <TableRowColumn
        key={key}
        columnNumber={0}
        style={{
          width: 24,
          cursor: disabled ? 'not-allowed' : 'inherit',
        }}
      >
        {checkbox}
      </TableRowColumn>
    );
  }

  calculatePreselectedRows(props) {
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
  }

  isRowSelected(rowNumber) {
    if (this.props.allRowsSelected) {
      return true;
    }

    for (let i = 0; i < this.state.selectedRows.length; i++) {
      const selection = this.state.selectedRows[i];

      if (typeof selection === 'object') {
        if (this.isValueInRange(rowNumber, selection)) return true;
      } else {
        if (selection === rowNumber) return true;
      }
    }

    return false;
  }

  isValueInRange(value, range) {
    if (!range) return false;

    if ((range.start <= value && value <= range.end) || (range.end <= value && value <= range.start)) {
      return true;
    }

    return false;
  }

  onRowClick = (event, rowNumber) => {
    event.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      window.getSelection().removeAllRanges();
      this.processRowSelection(event, rowNumber);
    }
  };

  processRowSelection(event, rowNumber) {
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

          if (this.isValueInRange(rowNumber, range)) {
            foundRange = true;
            const values = this.splitRange(range, rowNumber);
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
    if (this.props.onRowSelection) this.props.onRowSelection(this.flattenRanges(selectedRows));
  }

  splitRange(range, splitPoint) {
    const splitValues = [];
    const startOffset = range.start - splitPoint;
    const endOffset = range.end - splitPoint;

    // Process start half
    splitValues.push(...this.genRangeOfValues(splitPoint, startOffset));

    // Process end half
    splitValues.push(...this.genRangeOfValues(splitPoint, endOffset));

    return splitValues;
  }

  genRangeOfValues(start, offset) {
    const values = [];
    const dir = (offset > 0) ? -1 : 1; // This forces offset to approach 0 from either direction.
    while (offset !== 0) {
      values.push(start + offset);
      offset += dir;
    }

    return values;
  }

  flattenRanges(selectedRows) {
    const rows = [];
    for (const selection of selectedRows) {
      if (typeof selection === 'object') {
        const values = this.genRangeOfValues(selection.end, selection.start - selection.end);
        rows.push(selection.end, ...values);
      } else {
        rows.push(selection);
      }
    }

    return rows.sort();
  }

  onCellClick = (event, rowNumber, columnNumber) => {
    event.stopPropagation();
    if (this.props.onCellClick) {
      this.props.onCellClick(rowNumber, this.getColumnId(columnNumber), event);
    }
  };

  onCellHover = (event, rowNumber, columnNumber) => {
    if (this.props.onCellHover) {
      this.props.onCellHover(rowNumber, this.getColumnId(columnNumber), event);
    }
    this.onRowHover(event, rowNumber);
  };

  onCellHoverExit = (event, rowNumber, columnNumber) => {
    if (this.props.onCellHoverExit) {
      this.props.onCellHoverExit(rowNumber, this.getColumnId(columnNumber), event);
    }
    this.onRowHoverExit(event, rowNumber);
  };

  onRowHover = (event, rowNumber) => {
    if (this.props.onRowHover) {
      this.props.onRowHover(rowNumber);
    }
  };

  onRowHoverExit = (event, rowNumber) => {
    if (this.props.onRowHoverExit) {
      this.props.onRowHoverExit(rowNumber);
    }
  };

  getColumnId(columnNumber) {
    let columnId = columnNumber;
    if (this.props.displayRowCheckbox) {
      columnId--;
    }

    return columnId;
  }

  render() {
    const {
      className,
      style,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <tbody className={className} style={prepareStyles(Object.assign({}, style))}>
          {this.createRows()}
        </tbody>
      </ClickAwayListener>
    );
  }
}

export default TableBody;
