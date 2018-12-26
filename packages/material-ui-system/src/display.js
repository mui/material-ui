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

export default compose(
  displayRaw,
  displayPrint,
);
