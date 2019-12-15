import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
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
        {
          label: 'Population',
          children: [{ field: 'Population_Total' }, { field: 'Population_Urban' }],
        },
        {
          label: 'Nominal GDP',
          children: [
            { field: 'GDP_Total' },
            {
              label: 'By Sector',
              children: [
                { field: 'GDP_Agriculture' },
                { field: 'GDP_Industry' },
                { field: 'GDP_Services' },
              ],
            },
          ],
        },
      ]}
      rowsData={data}
    />
  );
}
