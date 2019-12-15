import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  phone: chance.phone(),
  address: chance.address(),
  country: chance.country(),
  rating: chance.integer({ min: 1, max: 5 }),
}));

export default function ColumnSizing() {
  return (
    <DataGrid
      style={{ maxHeight: 300, width: '100%' }}
      columns={[
        { field: 'name', label: 'Name' },
        { field: 'rating', label: 'Rating' },
        { field: 'address', label: 'Address' },
        { field: 'phone', label: 'Phone' },
        { field: 'country', label: 'Country' },
      ]}
      rowsData={data}
      defaultColumnOptions={{ resizable: true }}
    />
  );
}
