import * as React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import FormLabel from '@mui/material/FormLabel';

function ListHeader({ sx = [], children }) {
  return (
    <ListItem
      sx={[
        {
          width: 'auto',
          textDecoration: 'underline',
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FormLabel sx={{ color: 'inherit' }}>{children}</FormLabel>
    </ListItem>
  );
}

ListHeader.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
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
