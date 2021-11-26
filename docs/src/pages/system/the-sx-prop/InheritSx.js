import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';

const MenuHeader = ({ sx = [], children }) => (
  <MenuItem
    sx={[
      {
        pointerEvents: 'none',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <FormLabel>{children}</FormLabel>
  </MenuItem>
);

MenuHeader.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function InheritSx() {
  return (
    <MenuHeader
      sx={(theme) => ({
        color: 'primary.main',
        ...theme.typography.overline,
      })}
    >
      Header
    </MenuHeader>
  );
}
