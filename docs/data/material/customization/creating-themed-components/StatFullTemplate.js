import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { styled, useThemeProps } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
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
  name: 'MuiStat',
  slot: 'value',
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Stat = React.forwardRef(function Stat(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStat' });
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
