import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button, { ButtonProps } from '@mui/material/Button';

interface StyledMenuButtonProps extends ButtonProps {
  showBadge?: boolean;
}

const StyledMenuButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  letterSpacing: 0,
  minWidth: '32px',
  height: '32px',
  padding: '4px',
  border: `1.2px solid ${theme.palette.grey[200]}`,
  color: theme.palette.grey[600],
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  '&:hover': {
    backgroundColor: `rgba(217, 236, 255, 0.4)`,
    borderColor: theme.palette.grey[200],
  },
}));

export default function MenuButton({
  showBadge = false,
  ...props
}: StyledMenuButtonProps) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ '& .MuiBadge-badge': { right: 2, top: 2 } }}
    >
      <StyledMenuButton variant="outlined" {...props} />
    </Badge>
  );
}
