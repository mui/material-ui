'use client';
import { CSSObject } from '@mui/system';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import Paper from '../Paper';
import List from '../List';
import { menuListStyles, menuPaperStyles } from '../Menu/menuStyles';

// A slot puts shared styles in the components CSS layer. No name is set:
// the popup wrappers supply their own theme keys and override resolvers.
export const Menu2PositionerBase = styled('div', { slot: 'Positioner' })(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.modal,
  })),
);

export const Menu2PaperBase = styled(Paper, { slot: 'Paper' })({
  outline: 0,
  ...(menuPaperStyles as CSSObject),
  // The popup has no full-screen Modal. Limit its height to the viewport
  // and the space available at the anchor, not to its parent's height.
  maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
  overflowY: 'auto',
  // Grow uses the origin that Base UI sets on the positioner.
  transformOrigin: 'var(--transform-origin)',
});

export const Menu2ListBase = styled(List, { slot: 'List' })(menuListStyles);
