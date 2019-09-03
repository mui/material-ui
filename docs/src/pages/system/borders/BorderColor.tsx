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
      <Box borderColor="primary.main" {...defaultProps} />
      <Box borderColor="secondary.main" {...defaultProps} />
      <Box borderColor="error.main" {...defaultProps} />
      <Box borderColor="grey.500" {...defaultProps} />
      <Box borderColor="text.primary" {...defaultProps} />
    </Box>
  );
}
