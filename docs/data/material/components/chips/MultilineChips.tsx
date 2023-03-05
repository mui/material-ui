import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const longText = 'This is a chip that has multiple lines';

const chipStyles = { height: 'auto' };

const labelStyles = {
  whiteSpace: 'normal',
  display: 'block',
};

export default function MultilineChips() {
  return (
    <Box width={100}>
      <Chip sx={chipStyles} label={<span style={labelStyles}>{longText}</span>} />
    </Box>
  );
}
