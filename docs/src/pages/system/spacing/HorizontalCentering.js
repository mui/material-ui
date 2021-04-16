import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function HorizontalCentering() {
  return (
    <div>
      <Box style={{"left":"50%", "position":"absolute"}} bgcolor="background.paper" p={1}>
        Centered element
      </Box>
    </div>
  );
}
