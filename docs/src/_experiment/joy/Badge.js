/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/joy/styles';

const BadgeRoot = styled('span')(({ theme, ownerState }) => [
  {
    padding: '0 0.25rem',
    ...theme.typography.tableLabel,
  },
  theme.variants.light[ownerState.color],
]);

export default function Badge({ color = 'primary', ...props }) {
  const ownerState = {
    color,
    ...props,
  };
  return <BadgeRoot ownerState={ownerState} {...props} />;
}
