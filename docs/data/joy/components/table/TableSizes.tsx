import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Table, { TableProps } from '@mui/joy/Table';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableSizes() {
  const [size, setSize] = React.useState<TableProps['size']>('md');
  return (
    <div>
      <FormControl orientation="horizontal" sx={{ mb: 2, ml: 1 }}>
        <FormLabel>Size:</FormLabel>
        <RadioGroup
          orientation="horizontal"
          value={size}
          onChange={(event) => setSize(event.target.value as typeof size)}
        >
          <Radio label="sm" value="sm" />
          <Radio label="md" value="md" />
          <Radio label="lg" value="lg" />
        </RadioGroup>
      </FormControl>
      <Table aria-label="table sizes" size={size}>
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
              <td>{row.name}</td>
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
