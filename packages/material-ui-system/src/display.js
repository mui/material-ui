import style from './style';

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
