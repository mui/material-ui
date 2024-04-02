import { styled as _styled3 } from '@pigment-css/react';
import _theme3 from '@pigment-css/react/theme';
import { styled as _styled2 } from '@pigment-css/react';
import _theme2 from '@pigment-css/react/theme';
import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import * as React from 'react';
const StatRoot = /*#__PURE__*/ _styled('div', {
  name: 'PigmentStat',
  // The component name
  slot: 'root', // The slot name
})({
  classes: ['si9gu6v'],
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      className: 'si9gu6v-1',
    },
  ],
});
const StatValue = /*#__PURE__*/ _styled2('div', {
  name: 'PigmentStat',
  slot: 'value',
})({
  classes: ['sbfbm5t'],
});
const StatUnit = /*#__PURE__*/ _styled3('div', {
  name: 'PigmentStat',
  slot: 'unit',
})({
  classes: ['s1xscf0o'],
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
