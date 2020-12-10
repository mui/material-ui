import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function BoxClone() {
  return (
    <Box sx={{ border: '1px dashed grey' }}>
      {(props: { className: string }) => (
        <Typography {...props}>Typography</Typography>
      )}
    </Box>
  );
}
