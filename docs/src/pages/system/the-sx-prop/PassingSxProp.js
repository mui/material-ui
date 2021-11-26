import * as React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';

const ListHeader = ({ sx = [], children }) => (
  <ListItem
    sx={[
      {
        width: 'auto',
        textDecoration: 'underline',
      },
      // `SxProps` type can be an array, spread `sx` directly will give you type error.
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
  </ListItem>
);

ListHeader.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function PassingSxProp() {
  return (
    <ListHeader
      sx={(theme) => ({
        color: 'info.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </ListHeader>
  );
}
