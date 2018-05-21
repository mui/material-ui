import React from 'react';
import Box from '@material-ui/core/Box';

const styles = {
  box: {
    border: `1px dashed #000`,
  },
};

function SimpleBoxes() {
  return (
    <div>
      <Box margin={10} style={styles.box} inline={true}>
        Box (Inline)
      </Box>
      <Box margin={10} inline={false} hAlign="start" style={styles.box}>
        Box (Start)
      </Box>
      <Box margin={10} inline={false} hAlign="center" style={styles.box}>
        Box (Center)
      </Box>
      <Box margin={10} inline={false} hAlign="end" style={styles.box}>
        Box (End)
      </Box>
    </div>
  );
};

export default SimpleBoxes;
