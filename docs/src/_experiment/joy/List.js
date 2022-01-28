/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';

export const List = styled('ul')(() => ({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  padding: '0.75rem',
  margin: 0,
}));

export const ListSubheader = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  marginBottom: '0.5rem',
  padding: '0.25rem 0.75rem',
  ...theme.typography.tableLabel,
  color: theme.vars.palette.text.secondary,
}));

const ListItemButtonRoot = styled('button')(({ theme }) => [
  {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: 'none',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    ...theme.typography.body,
    color: theme.vars.palette.text.secondary,
    '&:focus': theme.focus.default,
    '& + &': {
      marginTop: '0.5rem',
    },
  },
  theme.variants.textHover.neutral,
]);

const ListItemIcon = styled('div')(({ theme }) => ({
  marginRight: '0.75rem',
  lineHeight: 1,
  display: 'inline-flex',
  '& > svg': {
    fontSize: theme.vars.fontSize.md,
  },
}));

export const ListItemButton = ({ children, startIcon, ...props }) => {
  return (
    <ListItemButtonRoot {...props}>
      {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}
      {children}
    </ListItemButtonRoot>
  );
};
