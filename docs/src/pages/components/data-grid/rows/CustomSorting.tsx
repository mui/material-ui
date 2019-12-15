import React from 'react';
import Chance from 'chance';
import DataGrid from '@material-ui/lab/DataGrid';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  birthday: chance.birthday({ string: true }),
}));

function convertToIso(date) {
  const [monthNumber, dayNumber, yearNumber] = date.split('/');
  return `${yearNumber}-${monthNumber}-${dayNumber}`;
}

function sortingComparator(rowA, rowB, sort) {
  const a = convertToIso(rowA.birthday);
  const b = convertToIso(rowB.birthday);

  if (a < b) {
    return -1 * (sort === 'asc' ? 1 : -1);
  }

  if (a > b) {
    return 1 * (sort === 'asc' ? 1 : -1);
  }

  return 0;
}

export default function CustomSorting() {
  return (
    <DataGrid
      style={{ maxHeight: 300, width: '100%' }}
      columns={[
        { field: 'name', label: 'Name' },
        { field: 'birthday', label: 'Birthday', sortingComparator },
      ]}
      rowsData={data}
      defaultColumnOptions={{ sortable: true }}
    />
  );
}
