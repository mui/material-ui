import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function Search() {
  return (
    <Stack spacing={1.5} direction="row">
      <FormControl sx={{ flex: 1 }}>
        <Input
          placeholder="Search"
          startDecorator={<i data-feather="search" />}
          aria-label="Search"
        />
      </FormControl>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button variant="outlined" color="neutral">
          Clear
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button variant="solid" color="primary">
          Search
        </Button>
      </Box>
    </Stack>
  );
}
