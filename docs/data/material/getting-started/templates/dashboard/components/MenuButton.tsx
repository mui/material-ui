import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface StyledMenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
  ariaLabel?: string;
}

export default function MenuButton({
  showBadge = false,
  ariaLabel,
  ...props
}: StyledMenuButtonProps) {
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
