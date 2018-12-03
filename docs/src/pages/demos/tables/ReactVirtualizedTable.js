// Adapted from https://codesandbox.io/s/32wk7226pm

import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const muiVirtualizedTableStyles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
  table: {
    fontFamily: 'sans-serif',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getChildContext() {
    return {
      table: {
        body: true,
      },
    };
  }

  getRowClassName = ({ index }) => {
    const {
      classes: { tableRow, tableRowHover, flexContainer },
      rowClassName,
      onRowClick,
    } = this.props;
    return classNames({
      [tableRow]: true,
      [flexContainer]: true,
      [rowClassName]: true,
      [tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, {
          [classes.flexContainer]: true,
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        numeric={(columnIndex != null && columns[columnIndex].numeric) || false}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };
    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        numeric={columns[columnIndex].numeric || false}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className = null, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }
              const columnProps = { cellRenderer: renderer, ...other };
              return (
                <Column
                  key={other.dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  {...columnProps}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.shape({
    flexContainer: PropTypes.string,
    noClick: PropTypes.string,
    tableCell: PropTypes.string,
    tableRow: PropTypes.string,
    tableRowHover: PropTypes.string,
  }).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  onRowClick: undefined,
  rowClassName: null,
  rowHeight: 56,
  sort: undefined,
};

MuiVirtualizedTable.childContextTypes = {
  table: PropTypes.object,
};

const WrappedVirtualizedTable = withStyles(muiVirtualizedTableStyles)(MuiVirtualizedTable);

const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

let id = 0;
function createData(dessert, calories, fat, carbs, protein) {
  id += 1;
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rows.push(createData(...randomSelection));
}

class ReactVirtualizedTable extends React.Component {
  rowGetter = ({ index }) => rows[index];

  render() {
    return (
      <Paper style={{ height: 400, width: '100%' }}>
        <WrappedVirtualizedTable
          rowCount={rows.length}
          rowGetter={this.rowGetter}
          columns={[
            {
              width: 200,
              flexGrow: 1.0,
              label: 'Dessert',
              dataKey: 'dessert',
            },
            {
              width: 120,
              label: 'Calories (g)',
              dataKey: 'calories',
              numeric: true,
            },
            {
              width: 120,
              label: 'Fat (g)',
              dataKey: 'fat',
              numeric: true,
            },
            {
              width: 120,
              label: 'Carbs (g)',
              dataKey: 'carbs',
              numeric: true,
            },
            {
              width: 120,
              label: 'Protein (g)',
              dataKey: 'protein',
              numeric: true,
            },
          ]}
        />
      </Paper>
    );
  }
}

export default ReactVirtualizedTable;
