import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function TextAlignment() {
  return (
    <Typography component="div">
      <Box textAlign="justify" m={1}>
        Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum.
        Donec sed odio operae, eu vulputate felis rhoncus.
      </Box>
      <Box textAlign="left" m={1}>
        Left aligned text.
      </Box>
      <Box textAlign="center" m={1}>
        Center aligned text.
      </Box>
      <Box textAlign="right" m={1}>
        Right aligned text.
      </Box>
    </Typography>
  );
}
