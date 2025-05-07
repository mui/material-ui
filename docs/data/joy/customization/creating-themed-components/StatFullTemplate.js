import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/joy/Stack';
import { styled, useThemeProps } from '@mui/joy/styles';

const StatRoot = styled('div', {
  name: 'JoyStat',
  slot: 'root',
})(({ theme }) => ({
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
})(({ theme }) => ({
  ...theme.typography.h2,
}));

const StatUnit = styled('div', {
  name: 'JoyStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography['body-sm'],
  color: theme.vars.palette.text.tertiary,
}));

const Stat = React.forwardRef(function Stat(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'JoyStat' });
  const { value, unit, variant, ...other } = props;

  const ownerState = { ...props, variant };

  return (
    <StatRoot ref={ref} ownerState={ownerState} {...other}>
      <StatValue ownerState={ownerState}>{value}</StatValue>
      <StatUnit ownerState={ownerState}>{unit}</StatUnit>
    </StatRoot>
  );
});

Stat.propTypes = {
  unit: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  variant: PropTypes.oneOf(['outlined']),
};

export default function StatFullTemplate() {
  return (
    <Stack direction="row" spacing={2}>
      <Stat value="1.9M" unit="Favorites" />
      <Stat value="5.1M" unit="Views" variant="outlined" />
    </Stack>
  );
}
