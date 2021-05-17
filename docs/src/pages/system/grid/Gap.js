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

export default function Gap() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(2, 0.5fr)',
        }}
      >
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
      </Box>
    </div>
  );
}
