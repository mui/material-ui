import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function ListboxMinWidth() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'flex' }}>
        <Select defaultListboxOpen placeholder="None">
          <Option value="short">Short option</Option>
          <Option value="long">A very long option</Option>
        </Select>
      </Box>
    </CssVarsProvider>
  );
}
