'use client';
import type { CSSInterpolation } from '@mui/system';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';
import type { Menu2ItemBaseOwnerState } from '../Unstable_Menu2/menu2ItemShared';
import type { Menu2ItemOwnerState } from '../Unstable_Menu2Item/Menu2Item';

type Menu2ItemStyleOwnerState = Pick<
  Menu2ItemBaseOwnerState,
  'divider' | 'disableGutters' | 'inset'
>;

export function menu2ItemOverridesResolver(
  props: { ownerState: Menu2ItemStyleOwnerState },
  styles: Record<string, CSSInterpolation>,
): CSSInterpolation {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
    ownerState.inset && styles.inset,
  ];
}

// ButtonBase supplies the element resets. The slot assigns the components CSS
// layer without a theme key, so the submenu trigger can add its open tint first.
/**
 * @ignore - internal component.
 */
export const Menu2ItemBaseRoot = styled(ButtonBase, {
  slot: 'root',
  shouldForwardProp: slotShouldForwardProp,
})<{ ownerState?: Menu2ItemStyleOwnerState | undefined }>(
  memoTheme(({ theme }) => ({
    ...theme.typography.body1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    // Inset the ring: a scrolling popup clips an outset ring.
    ...(theme.focusVisible && {
      [`&.${buttonBaseClasses.focusVisible}`]: theme.applyFocusVisible('inset'),
    }),
    [`&.${buttonBaseClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    variants: [
      {
        props: ({ ownerState }: { ownerState?: Menu2ItemStyleOwnerState | undefined }) =>
          !ownerState?.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }: { ownerState?: Menu2ItemStyleOwnerState | undefined }) =>
          Boolean(ownerState?.divider),
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
        },
      },
    ],
  })),
  // Keyboard focus without a focus ring shows a background instead.
  memoTheme(({ theme }) => ({
    ...(!theme.focusVisible && {
      [`&.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
  })),
);

/**
 * @ignore - internal component.
 */
const Menu2ItemBase = styled(Menu2ItemBaseRoot, {
  name: 'MuiMenu2Item',
  slot: 'root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2ItemOwnerState }>({});

export default Menu2ItemBase;
