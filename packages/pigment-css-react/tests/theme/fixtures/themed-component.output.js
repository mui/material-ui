import { styled as _styled3 } from '@pigment-css/react';
import _theme3 from '@pigment-css/react/theme';
import { styled as _styled2 } from '@pigment-css/react';
import _theme2 from '@pigment-css/react/theme';
import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import * as React from 'react';
const StatRoot = /*#__PURE__*/ _styled('div', {
  name: 'MuiStat',
  // The component name
  slot: 'root', // The slot name
})({
  classes: ['si9gu6v', 'si9gu6v-1'],
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      className: 'si9gu6v-2',
    },
    {
      props: {
        variant: 'outlined',
      },
      className: 'si9gu6v-3',
    },
  ],
});
const StatValue = /*#__PURE__*/ _styled2('div', {
  name: 'MuiStat',
  slot: 'value',
})({
  classes: ['sbfbm5t', 'sbfbm5t-1'],
});
const StatUnit = /*#__PURE__*/ _styled3('div', {
  name: 'MuiStat',
  slot: 'unit',
})({
  classes: ['s1xscf0o', 's1xscf0o-1'],
});
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
