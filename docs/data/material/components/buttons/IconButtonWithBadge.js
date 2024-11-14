import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartBadge = styled(Badge)`
  .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconButtonWithBadge() {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      <IconButton loading>
        <Badge badgeContent={4} color="primary">
          <SaveIcon />
        </Badge>
      </IconButton>
      <IconButton loading={loading} onClick={() => setLoading(true)}>
        <ShoppingCartIcon fontSize="small" />
        <CartBadge badgeContent={2} color="primary" overlap="circular" />
      </IconButton>
    </Stack>
  );
}
