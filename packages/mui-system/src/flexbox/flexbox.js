import style from '../style';
import compose from '../compose';

export const flexBasis = style({
  prop: 'flexBasis',
});

export const flexDirection = style({
  prop: 'flexDirection',
});

export const flexWrap = style({
  prop: 'flexWrap',
});

export const justifyContent = style({
  prop: 'justifyContent',
});

export const alignItems = style({
  prop: 'alignItems',
});

export const alignContent = style({
  prop: 'alignContent',
});

export const order = style({
  prop: 'order',
});

export const flex = style({
  prop: 'flex',
});

export const flexGrow = style({
  prop: 'flexGrow',
});

export const flexShrink = style({
  prop: 'flexShrink',
});

export const alignSelf = style({
  prop: 'alignSelf',
});

export const justifyItems = style({
  prop: 'justifyItems',
});

export const justifySelf = style({
  prop: 'justifySelf',
});

const flexbox = compose(
  flexBasis,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
  justifyItems,
  justifySelf,
);

export default flexbox;
