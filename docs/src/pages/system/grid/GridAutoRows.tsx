import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

const GridItem = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        ...sx,
      }}
      {...other}
    />
  );
};

export default function GridAutoColumns() {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <Box
        sx={{
          display: 'grid',
          p: 1,
          gridAutoRows: '40px',
          gap: '8px',
        }}
      >
        <GridItem sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1 / 3</GridItem>
        <GridItem sx={{ gridColumn: '1', gridRow: '4 / 5' }}>4 / 5</GridItem>
      </Box>
    </div>
  );
}
