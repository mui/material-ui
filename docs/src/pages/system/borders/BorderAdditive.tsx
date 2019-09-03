import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '5rem', height: '5rem' },
  borderColor: 'text.primary',
};

export default function BorderAdditive() {
  return (
    <Box display="flex" justifyContent="center">
      <Box border={1} {...defaultProps} />
      <Box borderTop={1} {...defaultProps} />
      <Box borderRight={1} {...defaultProps} />
      <Box borderBottom={1} {...defaultProps} />
      <Box borderLeft={1} {...defaultProps} />
    </Box>
  );
}
