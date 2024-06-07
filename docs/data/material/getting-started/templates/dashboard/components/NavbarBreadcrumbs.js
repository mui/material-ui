import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '& .MuiBreadcrumbs-separator': {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  '& .MuiBreadcrumbs-ol': {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" fontWeight={600} sx={{ color: 'text.primary' }}>
        Home
      </Typography>
    </StyledBreadcrumbs>
  );
}
