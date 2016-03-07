import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    tableRow,
  } = state.muiTheme;

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

const TableRow = React.createClass({

  propTypes: {
    /**
     * Children passed to table row.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, row border will be displayed for the row.
     * If false, no border will be drawn.
     */
    displayBorder: React.PropTypes.bool,

    /**
     * Controls whether or not the row reponseds to hover events.
     */
    hoverable: React.PropTypes.bool,

    /**
     * Controls whether or not the row should be rendered as being
     * hovered. This property is evaluated in addition to this.state.hovered
     * and can be used to synchronize the hovered state with some other
     * external events.
     */
    hovered: React.PropTypes.bool,

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
     * Called when row is clicked.
     */
    onRowClick: React.PropTypes.func,

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
     * Number to identify the row. This property is
     * automatically populated when used with the TableBody component.
     */
    rowNumber: React.PropTypes.number,

    /**
     * If true, table rows can be selected. If multiple row
     * selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: React.PropTypes.bool,

    /**
     * Indicates that a particular row is selected.
     * This property can be used to programmatically select rows.
     */
    selected: React.PropTypes.bool,

    /**
     * Indicates whether or not the row is striped.
     */
    striped: React.PropTypes.bool,

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
      displayBorder: true,
      hoverable: false,
      hovered: false,
      selectable: true,
      selected: false,
      striped: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      hovered: false,
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

  _onRowClick(event) {
    if (this.props.selectable && this.props.onRowClick) this.props.onRowClick(event, this.props.rowNumber);
  },

  _onRowHover(event) {
    if (this.props.onRowHover) this.props.onRowHover(event, this.props.rowNumber);
  },

  _onRowHoverExit(event) {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(event, this.props.rowNumber);
  },

  _onCellClick(event, columnIndex) {
    if (this.props.selectable && this.props.onCellClick) {
      this.props.onCellClick(event, this.props.rowNumber, columnIndex);
    }
    event.ctrlKey = true;
    this._onRowClick(event);
  },

  _onCellHover(event, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onCellHover) this.props.onCellHover(event, this.props.rowNumber, columnIndex);
      this._onRowHover(event);
    }
  },

  _onCellHoverExit(event, columnIndex) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onCellHoverExit) this.props.onCellHoverExit(event, this.props.rowNumber, columnIndex);
      this._onRowHoverExit(event);
    }
  },

  render() {
    const {
      className,
      displayBorder,
      hoverable,
      onCellClick,
      onCellHover,
      onCellHoverExit,
      onRowClick,
      onRowHover,
      onRowHoverExit,
      rowNumber,
      selectable,
      selected,
      striped,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const rowColumns = React.Children.map(this.props.children, (child, columnNumber) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {...{
          columnNumber: columnNumber,
          hoverable: this.props.hoverable,
          key: child.props.key || `${this.props.rowNumber}-${columnNumber}`,
          onClick: this._onCellClick,
          onHover: this._onCellHover,
          onHoverExit: this._onCellHoverExit,
          style: Object.assign({}, styles.cell, child.props.style),
        }, ...child.props});
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
  },
});

export default TableRow;
