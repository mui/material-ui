import * as React from 'react';
import { styled } from '@mui/joy/styles';

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

export default function StatComponent() {
  return (
    <StatRoot>
      <StatValue>19,267</StatValue>
      <StatUnit>Active users / month</StatUnit>
    </StatRoot>
  );
}
