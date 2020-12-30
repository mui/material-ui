import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const GridItem = (props) => {
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

GridItem.propTypes = {
  sx: PropTypes.object,
};

export default function GridAutoFlow() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(5, 0.2fr)',
          gridTemplateRows: 'repeat(2, 50px)',
          gap: '8px',
        }}
      >
        <GridItem sx={{ gridColumn: '1', gridRow: '1 / 3', border: 1 }}>1</GridItem>
        <GridItem sx={{ border: 1 }}>2</GridItem>
        <GridItem sx={{ border: 1 }}>3</GridItem>
        <GridItem sx={{ border: 1 }}>4</GridItem>
        <GridItem sx={{ gridColumn: '5', gridRow: '1 / 3', border: 1 }}>5</GridItem>
      </Box>
    </div>
  );
}
