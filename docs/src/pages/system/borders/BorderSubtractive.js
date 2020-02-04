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
      <Box border={0} {...defaultProps} />
      <Box borderTop={0} {...defaultProps} />
      <Box borderRight={0} {...defaultProps} />
      <Box borderBottom={0} {...defaultProps} />
      <Box borderLeft={0} {...defaultProps} />
    </Box>
  );
}
