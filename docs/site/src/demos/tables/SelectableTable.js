import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = createStyleSheet('SelectableTable', () => {
  return {
    paper: {
      width: '100%',
      marginTop: 30,
    },
  };
});

let dataId = 0;

function createData(name, calories, fat, carbs, protein) {
  dataId++;
  return {id: dataId, name, calories, fat, carbs, protein};
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class SelectableTable extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    selected: [],
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      return this.setState({selected: data.map((n) => n.id)});
    }
    return this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
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

    this.setState({selected: newSelected});
  };

  isSelected = (id) => {
    return this.state.selected.indexOf(id) !== -1;
  }


  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Paper zDepth={2} className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell checkbox={true}>
                <Checkbox onChange={this.handleSelectAllClick} />
              </TableCell>
              <TableCell padding={false}>Dessert (100g serving)</TableCell>
              <TableCell numeric={true}>Calories</TableCell>
              <TableCell numeric={true}>Fat (g)</TableCell>
              <TableCell numeric={true}>Carbs (g)</TableCell>
              <TableCell numeric={true}>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n) => {
              const selected = this.isSelected(n.id);
              return (
                <TableRow
                  hover={true}
                  onClick={(event) => this.handleClick(event, n.id)}
                  key={n.id}
                  selected={selected}
                >
                  <TableCell checkbox={true}>
                    <Checkbox checked={selected} />
                  </TableCell>
                  <TableCell padding={false}>{n.name}</TableCell>
                  <TableCell numeric={true}>{n.calories}</TableCell>
                  <TableCell numeric={true}>{n.fat}</TableCell>
                  <TableCell numeric={true}>{n.carbs}</TableCell>
                  <TableCell numeric={true}>{n.protein}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

