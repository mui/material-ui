/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Adornment from '@mui/joy/Adornment';

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

const ListItemButtonRoot = styled('button')(({ theme, ownerState }) => [
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
    '&:focus-visible': theme.focus.default,
    '& + button': {
      marginTop: '0.5rem',
    },
  },
  !ownerState.variant && theme.variants.textHover.neutral,
  ownerState.variant && theme.variants[ownerState.variant][ownerState.color],
  ownerState.variant && theme.variants[`${ownerState.variant}Hover`][ownerState.color],
]);

// const ListItemIcon = styled('div')(({ theme }) => ({
//   marginRight: '0.75rem',
//   lineHeight: 1,
//   display: 'inline-flex',
//   '& > svg': {
//     fontSize: theme.vars.fontSize.md,
//   },
// }));

export const ListItem = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const ListItemButton = ({
  children,
  startIcon = null,
  endIcon = null,
  variant = '',
  color = 'neutral',
  ...props
}) => {
  const ownerState = { ...props, variant, color, startIcon };
  return (
    <ListItemButtonRoot ownerState={ownerState} {...props}>
      {startIcon && <Adornment>{startIcon}</Adornment>}
      {children}
      {endIcon && (
        <Adornment end sx={{ '--Adornment-gap': 'auto' }}>
          {endIcon}
        </Adornment>
      )}
    </ListItemButtonRoot>
  );
};
