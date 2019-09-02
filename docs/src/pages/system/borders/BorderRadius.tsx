import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};

export default function BorderRadius() {
  return (
    <Box display="flex" justifyContent="center">
      <Box borderRadius="50%" {...defaultProps} />
      <Box borderRadius="borderRadius" {...defaultProps} />
      <Box borderRadius={16} {...defaultProps} />
    </Box>
  );
}
