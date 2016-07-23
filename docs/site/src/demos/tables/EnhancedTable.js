// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import keycode from 'keycode';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

const styleSheet = createStyleSheet('EnhancedTable', () => {
  return {
    paper: {
      width: '100%',
      marginTop: 30,
    },
  };
});

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter++;
  return { id: counter, name, calories, fat, carbs, protein };
}

class EnhancedTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
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
          <TableCell padding={false}>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={order}
              onClick={this.createSortHandler('name')}
            >
              Dessert (100g serving)
            </TableSortLabel>
          </TableCell>
          <TableCell numeric>
            <TableSortLabel
              active={orderBy === 'calories'}
              direction={order}
              onClick={this.createSortHandler('calories')}
            >
              Calories
            </TableSortLabel>
          </TableCell>
          <TableCell numeric>
            <TableSortLabel
              active={orderBy === 'fat'}
              direction={order}
              onClick={this.createSortHandler('fat')}
            >
              Fat (g)
            </TableSortLabel>
          </TableCell>
          <TableCell numeric>
            <TableSortLabel
              active={orderBy === 'carbs'}
              direction={order}
              onClick={this.createSortHandler('carbs')}
            >
              Carbs (g)
            </TableSortLabel>
          </TableCell>
          <TableCell numeric>
            <TableSortLabel
              active={orderBy === 'protein'}
              direction={order}
              onClick={this.createSortHandler('protein')}
            >
              Protein (g)
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyleSheet = createStyleSheet('EnhancedTableToolbar', (theme) => {
  return {
    root: { paddingRight: 12 },
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

class EnhancedTableToolbar extends Component {
  static propTypes = {
    numSelected: PropTypes.number,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const { numSelected } = this.props;
    const classes = this.context.styleManager.render(toolbarStyleSheet);
    let classNames = classes.root;

    if (numSelected > 0) {
      classNames += ` ${classes.highlight}`;
    }

    return (
      <Toolbar className={classNames}>
        <div className={classes.title}>
          {numSelected > 0 ?
            <Text type="subheading">{numSelected} selected</Text> :
            <Text type="title">Nutrition</Text>
          }
        </div>
        <div className={classes.spacer}></div>
        <div className={classes.actions}>
          {numSelected > 0 ?
            <IconButton>delete</IconButton> :
            <IconButton>filter_list</IconButton>
          }
        </div>
      </Toolbar>
    );
  }
}

export default class EnhancedTable extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
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
      )
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
        selected.slice(selectedIndex + 1)
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
      <Paper zDepth={2} className={classes.paper}>
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
                  <TableCell padding={false}>{n.name}</TableCell>
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
