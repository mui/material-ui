import React from 'react';
import DataTable from '@material-ui/lab/DataTable';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [];
for (let i = 0; i < 20; i += 1) {
  rows.push(createData(0 + i*5, 'Frozen yoghurt', 159, 6.0, 24, 5.0));
  rows.push(createData(1 + i*5, 'Ice cream sandwich', 237, 9.0, 37, 4.3));
  rows.push(createData(2 + i*5, 'Eclair', 262, 16.0, 24, 6.0));
  rows.push(createData(3 + i*5, 'Cupcake', 305, 3.7, 67, 4.3));
  rows.push(createData(4 + i*5, 'Gingerbread', 356, 16.0, 49, 3.9));
}

const columns = [
  {
    label: 'Id',
    width: '200px',
  },
  {
    label: 'Dessert (100g serving)',
  },
  {
    label: 'Calories',
    width: '200px',
  },
  {
    label: 'Fat (g)',
    width: '200px',
  },
  {
    label: 'Carbs (g)',
    width: '200px',
  },
  {
    label: 'Protein (g)',
    width: '200px',
  },
]

export default function DataTableBasic() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <DataTable
        columns={columns}
        rows={rows}
        dense
        stickyHeader
        height='300px'
        pagination
      />
    </Paper>
  );
}
