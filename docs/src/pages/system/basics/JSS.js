import React from 'react';
import createBox from '@material-ui/styles/createBox';
import { compose, spacing, palette } from '@material-ui/system';

const Box = createBox(
  compose(
    spacing,
    palette,
  ),
);

function JSS() {
  return (
    <Box color="white" bg="palevioletred" p="1">
      JSS
    </Box>
  );
}

export default JSS;
