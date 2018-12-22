import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function HorizontalCentering() {
  return (
    <div>
      <Box mx="auto" bgcolor="background.paper" p={1}>
        Centered element
      </Box>
    </div>
  );
}

export default HorizontalCentering;
