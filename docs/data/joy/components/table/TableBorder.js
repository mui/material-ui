import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableBorder() {
  const [borderAxis, setBorderAxis] = React.useState('xBetween');
  return (
    <div>
      <FormControl orientation="horizontal" sx={{ mb: 2, ml: 1 }}>
        <FormLabel>Border axis:</FormLabel>
        <Select
          size="sm"
          value={borderAxis}
          onChange={(event, newValue) => setBorderAxis(newValue)}
        >
          {['xBetween', 'x', 'yBetween', 'y', 'bothBetween', 'both', 'none'].map(
            (axis) => (
              <Option key={axis} value={axis}>
                {axis}
              </Option>
            ),
          )}
        </Select>
      </FormControl>
      <Table borderAxis={borderAxis}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Dessert (100g serving)</th>
            <th>Calories</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">{row.name}</th>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
              <td>{row.carbs}</td>
              <td>{row.protein}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
