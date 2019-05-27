import React from 'react';
import Box from '@material-ui/core/Box';

function responsiveTest() {
  <Box p={[2, 3, 4]} />;
  <Box p={{ xs: 2, sm: 3, md: 4 }} />;
  // undesired
  <Box p={{ xs: 2, sm: { you: "are dealing with 'any' here" }, md: 4 }} />;
}
