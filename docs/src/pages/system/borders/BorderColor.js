import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};

export default function BorderColor() {
  return (
    <Box display="flex" justifyContent="center">
      <Box {...defaultProps} borderColor="primary.main" />
      <Box {...defaultProps} borderColor="secondary.main" />
      <Box {...defaultProps} borderColor="error.main" />
      <Box {...defaultProps} borderColor="grey.500" />
      <Box {...defaultProps} borderColor="text.primary" />
      <Box {...defaultProps} border="2 dotted secondary.main" />
      <Box {...defaultProps} border="2 solid secondary.main" borderRight="2 dotted primary.main" />
    </Box>
  );
}
