import * as React from 'react';
import { styled } from '@pigment-css/react';

const StatRoot = styled('div', {
  name: 'PigmentStat', // The component name
  slot: 'root', // The slot name
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0.75rem 1rem',
  backgroundColor: theme.colors.primary.background,
  borderRadius: theme.radius.xs,
  boxShadow: theme.shadow.sm,
  letterSpacing: '-0.025em',
  fontWeight: 600,
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        border: `2px solid #e9e9e9`,
      },
    },
  ],
}));

const StatValue = styled('div', {
  name: 'PigmentStat',
  slot: 'value',
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'PigmentStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.colors.neutral.foreground,
}));

const Stat = React.forwardRef(function Stat(props, ref) {
  const { value, unit, ...other } = props;

  return (
    <StatRoot ref={ref} {...other}>
      <StatValue>{value}</StatValue>
      <StatUnit>{unit}</StatUnit>
    </StatRoot>
  );
});

export default Stat;
