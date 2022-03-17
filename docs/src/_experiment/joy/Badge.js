/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';

const BadgeRoot = styled('span')(({ theme, ownerState }) => [
  {
    padding: ownerState.variant === 'contained' ? '2px 8px' : '0 0.25rem',
    borderRadius: ownerState.variant === 'contained' ? '20px' : '2px',
    ...theme.typography.tableLabel,
  },
  theme.variants[ownerState.variant]?.[ownerState.color],
  {
    '[data-mui-color-scheme="light"] &': {
      ...(ownerState.variant === 'light' &&
        ownerState.color === 'neutral' && {
          backgroundColor: theme.vars.palette.neutral[150],
        }),
      ...(ownerState.variant === 'light' &&
        ownerState.color === 'primary' && {
          backgroundColor: theme.vars.palette.primary[200],
        }),
    },
  },
]);

export default function Badge({ color = 'primary', variant = 'light', ...props }) {
  const ownerState = {
    color,
    variant,
    ...props,
  };
  return <BadgeRoot ownerState={ownerState} {...props} />;
}
