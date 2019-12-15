import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';
import { makeStyles } from '@material-ui/core/styles';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  phone: chance.phone(),
  address: chance.address(),
  country: chance.country(),
  rating: chance.integer({ min: 1, max: 5 }),
}));

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'rating', label: 'Rating' },
  { field: 'address', label: 'Address' },
  { field: 'phone', label: 'Phone' },
  { field: 'country', label: 'Country' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& > *': {
      width: '100%',
      maxHeight: 200,
    },
  },
});

export default function LoadingGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DataGrid loading rowsData={[]} columns={columns} />
      <DataGrid loading rowsData={data} columns={columns} />
    </div>
  );
}
