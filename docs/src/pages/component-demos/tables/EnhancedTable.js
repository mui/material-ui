// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

const styleSheet = createStyleSheet('EnhancedTable', () => ({
  paper: {
    width: '100%',
    marginTop: 30,
    overflowX: 'auto',
  },
}));

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  createSortHandler = (property) => {
    return (event) => this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox onChange={this.props.onSelectAllClick} />
          </TableCell>

          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyleSheet = createStyleSheet('EnhancedTableToolbar', (theme) => {
  return {
    root: { paddingRight: 2 },
    highlight: (
      theme.palette.type === 'light' ? {
        color: theme.palette.accent[800],
        backgroundColor: theme.palette.accent[50],
      } : {
        color: theme.palette.accent[50],
        backgroundColor: theme.palette.accent[800],
      }
    ),
    spacer: { flex: '1 1 100%' },
    actions: { color: theme.palette.text.secondary },
    title: { flex: '0 0 auto' },
  };
});

function EnhancedTableToolbar(props, context) {
  const { numSelected } = props;
  const classes = context.styleManager.render(toolbarStyleSheet);
  let classNames = classes.root;

  if (numSelected > 0) {
    classNames += ` ${classes.highlight}`;
  }

  return (
    <Toolbar className={classNames}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Nutrition</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton>
            <FilterListIcon />
          </IconButton>
        )}
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default class EnhancedTable extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ],
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = this.state.data.sort(
      (a, b) => (
        order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]
      ),
    );

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      return this.setState({ selected: this.state.data.map((n) => n.id) });
    }
    return this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id) => {
    return this.state.selected.indexOf(id) !== -1;
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { data, order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {data.map((n) => {
              const isSelected = this.isSelected(n.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => this.handleClick(event, n.id)}
                  onKeyDown={(event) => this.handleKeyDown(event, n.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>{n.name}</TableCell>
                  <TableCell numeric>{n.calories}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                  <TableCell numeric>{n.carbs}</TableCell>
                  <TableCell numeric>{n.protein}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
