import style from './style';
import compose from './compose';

export const displayRaw = style({
  prop: 'display',
});

export const displayPrint = style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value,
    },
  }),
});

export const overflow = style({
  prop: 'overflow',
});

export const textOverflow = style({
  prop: 'textOverflow',
});

export const whiteSpace = style({
  prop: 'whiteSpace',
});

export default compose(
  displayRaw,
  displayPrint,
  overflow,
  textOverflow,
  whiteSpace,
);
