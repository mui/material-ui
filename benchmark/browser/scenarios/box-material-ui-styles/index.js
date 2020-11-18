import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function BoxMaterialUIStyles() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Box
          width={200}
          height={200}
          borderWidth="3px"
          borderColor="white"
          backgroundColor={{ sm: 'primary.main' }}
          borderStyle={{ sm: 'dashed' }}
        >
          test case
        </Box>
      ))}
    </React.Fragment>
  );
}
