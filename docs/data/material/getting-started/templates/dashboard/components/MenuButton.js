import * as React from 'react';
import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

function MenuButton({ showBadge = false, ariaLabel, ...props }) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{
        '& .MuiBadge-badge': { right: 2, top: 2 },
      }}
    >
      <IconButton size="small" aria-label={ariaLabel} {...props} />
    </Badge>
  );
}

MenuButton.propTypes = {
  ariaLabel: PropTypes.string,
  showBadge: PropTypes.bool,
};

export default MenuButton;
