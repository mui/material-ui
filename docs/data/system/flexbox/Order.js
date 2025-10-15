import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          p: 1,
          m: 1,
          bgcolor: 'grey.100',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Order() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Item sx={{ order: 2 }}>Item 1</Item>
        <Item sx={{ order: 3 }}>Item 2</Item>
        <Item sx={{ order: 1 }}>Item 3</Item>
      </Box>
    </div>
  );
}
