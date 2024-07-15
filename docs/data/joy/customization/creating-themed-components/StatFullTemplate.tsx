import * as React from 'react';
import Stack from '@mui/joy/Stack';
import { styled, useThemeProps } from '@mui/joy/styles';

export interface StatProps {
  value: number | string;
  unit: string;
  variant?: 'outlined';
}

interface StatOwnerState extends StatProps {
  // …key value pairs for the internal state that you want to style the slot
  // but don't want to expose to the users
}

const StatRoot = styled('div', {
  name: 'JoyStat',
  slot: 'root',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.vars.palette.background.surface,
  borderRadius: theme.vars.radius.sm,
  boxShadow: theme.vars.shadow.md,
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      style: {
        border: `2px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      },
    },
  ],
}));

const StatValue = styled('div', {
  name: 'JoyStat',
  slot: 'value',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography.h2,
}));

const StatUnit = styled('div', {
  name: 'JoyStat',
  slot: 'unit',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography['body-sm'],
  color: theme.vars.palette.text.tertiary,
}));

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  function Stat(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'JoyStat' });
    const { value, unit, variant, ...other } = props;

    const ownerState = { ...props, variant };

    return (
      <StatRoot ref={ref} ownerState={ownerState} {...other}>
        <StatValue ownerState={ownerState}>{value}</StatValue>
        <StatUnit ownerState={ownerState}>{unit}</StatUnit>
      </StatRoot>
    );
  },
);

export default function StatFullTemplate() {
  return (
    <Stack direction="row" spacing={2}>
      <Stat value="1.9M" unit="Favorites" />
      <Stat value="5.1M" unit="Views" variant="outlined" />
    </Stack>
  );
}
