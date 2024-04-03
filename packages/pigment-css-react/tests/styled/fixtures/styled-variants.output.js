import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
const Button = /*#__PURE__*/ _styled('button')({
  classes: ['b1prasel'],
  variants: [
    {
      props: {
        color: 'primary',
      },
      className: 'b1prasel-1',
    },
    {
      props: ({ ownerState }) => ownerState.color === 'secondary',
      className: 'b1prasel-2',
    },
  ],
});
