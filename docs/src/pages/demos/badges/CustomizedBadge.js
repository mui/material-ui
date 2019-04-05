import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}));

function CustomizedBadge() {
  const classes = useStyles();

  return (
    <IconButton aria-label="Cart">
      <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CustomizedBadge;
