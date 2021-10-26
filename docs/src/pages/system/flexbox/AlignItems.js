import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default function AlignItems() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 116,
        }}
      >
        <Item
          sx={{
            height: 64,
          }}
        >
          Item 1
        </Item>
        <Item
          sx={{
            height: 84,
          }}
        >
          Item 2
        </Item>
        <Item>Item 3</Item>
      </Box>
    </div>
  );
}
