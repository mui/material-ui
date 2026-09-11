'use client';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import menuItemClasses from './menuItemClasses';

interface MenuItemBaseOwnerState {
  dense: boolean;
  divider: boolean;
  disableGutters: boolean;
}

interface MenuItemBaseProps {
  ownerState?: MenuItemBaseOwnerState | undefined;
}

// ButtonBase supplies the element resets. Keep the shared variants after them.
// The slot assigns the components CSS layer without a shared theme key.
const MenuItemBase = styled(ButtonBase, {
  slot: 'Root',
  shouldForwardProp: slotShouldForwardProp,
})<MenuItemBaseProps>(
  memoTheme(({ theme }) => {
    const themeRing = Boolean(theme.focusVisible);
    return {
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
      [`&.${menuItemClasses.selected}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
      // Inset the ring: a scrolling Menu/MenuList clips an outset ring.
      ...(themeRing && applyInsetFocusVisible(1)),
      [`&.${menuItemClasses.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
      },
      [`& + .${dividerClasses.root}`]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      [`& + .${dividerClasses.inset}`]: {
        marginLeft: 52,
      },
      [`& .${listItemTextClasses.root}`]: {
        marginTop: 0,
        marginBottom: 0,
      },
      [`& .${listItemTextClasses.inset}`]: {
        paddingLeft: 36,
      },
      [`& .${listItemIconClasses.root}`]: {
        minWidth: 36,
      },
      variants: [
        {
          props: ({ ownerState }: MenuItemBaseProps) => !ownerState?.disableGutters,
          style: {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
        {
          props: ({ ownerState }: MenuItemBaseProps) => Boolean(ownerState?.divider),
          style: {
            borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
            backgroundClip: 'padding-box',
          },
        },
        {
          props: ({ ownerState }: MenuItemBaseProps) => !ownerState?.dense,
          style: {
            [theme.breakpoints.up('sm')]: {
              minHeight: 'auto',
            },
          },
        },
        {
          props: ({ ownerState }: MenuItemBaseProps) => Boolean(ownerState?.dense),
          style: {
            minHeight: 32, // https://m2.material.io/components/menus#specs > Dense
            paddingTop: 4,
            paddingBottom: 4,
            ...theme.typography.body2,
            [`& .${listItemIconClasses.root} svg`]: {
              fontSize: '1.25rem',
            },
          },
        },
      ],
    };
  }),
);

export default MenuItemBase;
