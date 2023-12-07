import * as React from 'react';

import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
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

export default function TableVariants() {
  const [variant, setVariant] = React.useState('plain');
  const [color, setColor] = React.useState('neutral');
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 2,
          ml: 1,
        }}
      >
        <FormControl orientation="horizontal">
          <FormLabel>Variant:</FormLabel>
          <RadioGroup
            orientation="horizontal"
            value={variant}
            onChange={(event) => setVariant(event.target.value)}
          >
            <Radio label="plain" value="plain" />
            <Radio label="outlined" value="outlined" />
            <Radio label="soft" value="soft" />
            <Radio label="solid" value="solid" />
          </RadioGroup>
        </FormControl>
        <FormControl orientation="horizontal">
          <FormLabel>Color: </FormLabel>
          <Select
            size="sm"
            value={color}
            onChange={(event, newValue) => setColor(newValue)}
          >
            {['neutral', 'primary', 'danger', 'success', 'warning'].map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Table aria-label="table variants" variant={variant} color={color}>
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
