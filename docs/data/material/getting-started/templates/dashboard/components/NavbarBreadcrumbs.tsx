import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    color: '#D4D4DA',
    paddingRight: theme.spacing(1),
  },
  '& .MuiTypography-root': {
    color: theme.palette.grey[700],
  },
}));

export default function NavbarBreadcrumbs() {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      sx={{ display: { xs: 'none', md: 'flex' } }}
    >
      <div />
      <Typography fontWeight={500}>Project 1 (Production)</Typography>
    </StyledBreadcrumbs>
  );
}
