import * as React from 'react';
import { styled } from '@mui/material/styles';

const StatRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.vars.palette.background.surface,
  borderRadius: theme.vars.radius.sm,
  boxShadow: theme.vars.shadow.md,
}));

const StatValue = styled('div')(({ theme }) => ({
  ...theme.typography.h2,
}));

const StatUnit = styled('div')(({ theme }) => ({
  ...theme.typography['body-sm'],
  color: theme.vars.palette.text.tertiary,
}));

const Label = styled('div')(({ theme }) => ({
  ...theme.typography['body-sm'],
  borderRadius: '2px',
  padding: theme.spacing(0, 1),
  position: 'absolute',
  color: '#fff',
  fontSize: '0.75rem',
  fontWeight: 500,
  backgroundColor: '#ff5252',
}));

export default function StatSlots() {
  return (
    <StatRoot
      sx={{ outline: '1px solid #ff5252', outlineOffset: 4, position: 'relative' }}
    >
      <StatValue sx={{ outline: '1px solid #ff5252', position: 'relative' }}>
        19,267
        <Label sx={{ right: 0, top: 4, transform: 'translateX(100%)' }}>value</Label>
      </StatValue>
      <StatUnit sx={{ outline: '1px solid #ff5252', position: 'relative' }}>
        Active users / month
        <Label sx={{ right: 0, top: 2, transform: 'translateX(100%)' }}>unit</Label>
      </StatUnit>
      <Label sx={{ left: -4, top: 4, transform: 'translateX(-100%)' }}>root</Label>
    </StatRoot>
  );
}
