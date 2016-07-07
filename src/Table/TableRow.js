import React, {Component, PropTypes} from 'react';

function getStyles(props, context, state) {
  const {tableRow} = context.muiTheme;

  let cellBgColor = 'inherit';
  if (props.hovered || state.hovered) {
    cellBgColor = tableRow.hoverColor;
  } else if (props.selected) {
    cellBgColor = tableRow.selectedColor;
  } else if (props.striped) {
    cellBgColor = tableRow.stripeColor;
  }

  return {
    root: {
      borderBottom: props.displayBorder && `1px solid ${tableRow.borderColor}`,
      color: tableRow.textColor,
      height: tableRow.height,
    },
    cell: {
      backgroundColor: cellBgColor,
    },
  };
}

class TableRow extends Component {
  static propTypes = {
    /**
     * Children passed to table row.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, row border will be displayed for the row.
     * If false, no border will be drawn.
     */
    displayBorder: PropTypes.bool,
    /**
     * Controls whether or not the row reponseds to hover events.
     */
    hoverable: PropTypes.bool,
    /**
     * Controls whether or not the row should be rendered as being
     * hovered. This property is evaluated in addition to this.state.hovered
     * and can be used to synchronize the hovered state with some other
     * external events.
     */
    hovered: PropTypes.bool,
    /**
     * @ignore
     * Called when a row cell is clicked.
     * rowNumber is the row number and columnId is
     * the column number or the column key.
     */
    onCellClick: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is hovered.
     * rowNumber is the row number of the hovered row
     * and columnId is the column number or the column key of the cell.
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
     * Called when row is clicked.
     */
    onRowClick: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is no longer hovered.
     * rowNumber is the row number of the row that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * Number to identify the row. This property is
     * automatically populated when used with the TableBody component.
     */
    rowNumber: PropTypes.number,
    /**
     * If true, table rows can be selected. If multiple row
     * selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    /**
     * Indicates that a particular row is selected.
     * This property can be used to programmatically select rows.
     */
    selected: PropTypes.bool,
    /**
     * Indicates whether or not the row is striped.
     */
    striped: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    displayBorder: true,
    hoverable: false,
    hovered: false,
    selectable: true,
    selected: false,
    striped: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  onRowClick(event) {
    if (this.props.selectable && this.props.onRowClick) this.props.onRowClick(event, this.props.rowNumber);
  }

  onRowHover(event) {
    if (this.props.onRowHover) this.props.onRowHover(event, this.props.rowNumber);
  }

  onRowHoverExit(event) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(event, this.props.rowNumber);
  }

  onCellClick = (event, columnIndex) => {
    if (this.props.selectable && this.props.onCellClick) {
      this.props.onCellClick(event, this.props.rowNumber, columnIndex);
    }
    event.ctrlKey = true;
    this.onRowClick(event);
  };

  onCellHover = (event, columnIndex) => {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onCellHover) this.props.onCellHover(event, this.props.rowNumber, columnIndex);
      this.onRowHover(event);
    }
  };

  onCellHoverExit = (event, columnIndex) => {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(event, this.props.rowNumber, columnIndex);
      this.onRowHoverExit(event);
    }
  };

  render() {
    const {
      className,
      displayBorder, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      hovered, // eslint-disable-line no-unused-vars
      onCellClick, // eslint-disable-line no-unused-vars
      onCellHover, // eslint-disable-line no-unused-vars
      onCellHoverExit, // eslint-disable-line no-unused-vars
      onRowClick, // eslint-disable-line no-unused-vars
      onRowHover, // eslint-disable-line no-unused-vars
      onRowHoverExit, // eslint-disable-line no-unused-vars
      rowNumber, // eslint-disable-line no-unused-vars
      selectable, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      striped, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const rowColumns = React.Children.map(this.props.children, (child, columnNumber) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          columnNumber: columnNumber,
          hoverable: this.props.hoverable,
          key: `${this.props.rowNumber}-${columnNumber}`,
          onClick: this.onCellClick,
          onHover: this.onCellHover,
          onHoverExit: this.onCellHoverExit,
          style: Object.assign({}, styles.cell, child.props.style),
        });
      }
    });

    return (
      <tr
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...other}
      >
        {rowColumns}
      </tr>
    );
  }
}

export default TableRow;
