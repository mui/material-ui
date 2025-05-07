import * as React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
  createData('5', 356, 16.0, 49, 3.9),
  createData('6', 159, 6.0, 24, 4.0),
  createData('7', 237, 9.0, 37, 4.3),
  createData('8', 262, 16.0, 24, 6.0),
  createData('9', 305, 3.7, 67, 4.3),
  createData('10', 356, 16.0, 49, 3.9),
];

function sum(column) {
  return rows.reduce((acc, row) => acc + row[column], 0);
}

export default function TableStickyHeader() {
  return (
    <div>
      <Typography level="body-sm" sx={{ textAlign: 'center', mb: 2 }}>
        The table body is scrollable.
      </Typography>
      <Sheet sx={{ height: 300, overflow: 'auto' }}>
        <Table
          aria-label="table with sticky header"
          stickyHeader
          stickyFooter
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th>Row</th>
              <th>Calories</th>
              <th>Fat&nbsp;(g)</th>
              <th>Carbs&nbsp;(g)</th>
              <th>Protein&nbsp;(g)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.calories}</td>
                <td>{row.fat}</td>
                <td>{row.carbs}</td>
                <td>{row.protein}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td>{sum('calories').toFixed(2)}</td>
              <td>{sum('fat').toFixed(2)}</td>
              <td>{sum('carbs').toFixed(2)}</td>
              <td>{sum('protein').toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                {sum('calories') + sum('fat') + sum('carbs') + sum('protein')} Kcal
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </div>
  );
}
