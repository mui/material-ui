import React from 'react';
import { styled } from '@material-ui/styles';
import { compose, spacing, palette } from '@material-ui/system';

const Box = styled('div')(
  compose(
    spacing,
    palette,
  ),
);

function JSS() {
  return (
    <Box color="white" bgcolor="palevioletred" p={1}>
      JSS
    </Box>
  );
}

export default JSS;
