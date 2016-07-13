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

const styleSheet = createStyleSheet('BasicTable', () => {
  return {
    paper: {
      width: '100%',
      marginTop: 30,
    },
  };
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id++;
  return {id, name, calories, fat, carbs, protein};
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class BasicTable extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Paper zDepth={2} className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric={true}>Calories</TableCell>
              <TableCell numeric={true}>Fat (g)</TableCell>
              <TableCell numeric={true}>Carbs (g)</TableCell>
              <TableCell numeric={true}>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n) => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
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

