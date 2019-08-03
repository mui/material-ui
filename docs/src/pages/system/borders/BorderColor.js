import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};

function BorderColor() {
  return (
    <Grid container justify="center">
      <Box borderColor="primary.main" {...defaultProps} />
      <Box borderColor="secondary.main" {...defaultProps} />
      <Box borderColor="error.main" {...defaultProps} />
      <Box borderColor="grey.500" {...defaultProps} />
      <Box borderColor="text.primary" {...defaultProps} />
    </Grid>
  );
}

export default BorderColor;
