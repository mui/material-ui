import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';

const chance = new Chance();

const data = Array.from(new Array(200)).map(() => ({
  Country: chance.country(),
  Area: chance.integer({ min: 10e3, max: 10e6 }),
  GDP_Total: chance.integer({ min: 10e3, max: 10e6 }),
  Population_Urban: chance.floating({ min: 0, max: 1 }),
  Population_Total: chance.integer({ min: 10e3, max: 10e6 }),
  GDP_Agriculture: chance.floating({ min: 0, max: 1 }),
  GDP_Industry: chance.floating({ min: 0, max: 1 }),
  GDP_Services: chance.floating({ min: 0, max: 1 }),
}));

export default function ColumnGroups() {
  return (
    <DataGrid
      style={{ maxHeight: 300, width: '100%' }}
      columns={[
        { field: 'Country', label: 'Country' },
        { field: 'Area', label: 'Area, sq. km.' },
        { field: 'Population_Total', label: 'Population Total' },
        { field: 'Population_Urban', label: 'Population Urban' },
        { field: 'GDP_Total', label: 'GDP Total' },
        { field: 'GDP_Agriculture', label: 'GDP Agriculture' },
        { field: 'GDP_Industry', label: 'GDP Industry' },
        { field: 'GDP_Services', label: 'GDP Services' },
      ]}
      rowsData={data}
    />
  );
}
