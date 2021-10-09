import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import AppHeader from 'docs/src/layouts/AppHeader';
import Select from '@mui/material/Select';

export default function SwitchMd() {
  const [length, setLength] = React.useState(10);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader />
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Select native value={length} onChange={(event) => setLength(Number(event.target.value))}>
          <option value={10}>10</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </Select>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          p: 2,
        }}
      >
        {[...Array(length)].map((_, index) => (
          <Switch key={index} />
        ))}
      </Box>
    </React.Fragment>
  );
}
