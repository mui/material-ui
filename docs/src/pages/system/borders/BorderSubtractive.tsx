import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  border: 1,
  m: 1,
  borderColor: 'text.primary',
  style: { width: '5rem', height: '5rem' },
};

export default function BorderSubtractive() {
  return (
    <Box display="flex" justifyContent="center">
      <Box {...defaultProps} border={0} />
      <Box {...defaultProps} borderTop={0} />
      <Box {...defaultProps} borderRight={0} />
      <Box {...defaultProps} borderBottom={0} />
      <Box {...defaultProps} borderLeft={0} />
    </Box>
  );
}
