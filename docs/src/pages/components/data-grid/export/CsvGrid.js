import React from 'react';
import Chance from 'chance';
import DataGrid, { saveAs } from '@material-ui/lab/DataGrid';
import Button from '@material-ui/core/Button';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  phone: chance.phone(),
  address: chance.address(),
  country: chance.country(),
  rating: chance.integer({ min: 1, max: 5 }),
}));

export default function CsvGrid() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() => {
          const blob = new Blob(['a,b'], { type: 'text/csv' });
          saveAs({ blob, extension: 'csv' });
        }}
        color="primary"
        variant="outlined"
      >
        Export CSV
      </Button>
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
        defaultColumnOptions={{ sortable: true, resizable: true }}
      />
    </div>
  );
}
