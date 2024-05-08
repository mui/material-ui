import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { SitemarkIcon } from '../internals/components/CustomIcons';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    color: theme.palette.action.disabled,
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiBreadcrumbs-ol': {
    alignItems: 'normal',
  },
}));

export default function NavbarBreadcrumbs() {
  return (
    <StyledBreadcrumbs aria-label="breadcrumb">
      <SitemarkIcon />
      <Typography>Project 1 (Production)</Typography>
    </StyledBreadcrumbs>
  );
}
