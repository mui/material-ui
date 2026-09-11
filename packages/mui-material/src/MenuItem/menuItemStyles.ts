import { CSSInterpolation } from '@mui/system';
import { Theme } from '../styles';
import { MenuItemProps } from './MenuItem';
import menuItemClasses from './menuItemClasses';

export function menuItemOverridesResolver(
  props: { ownerState: Pick<MenuItemProps, 'dense' | 'divider' | 'disableGutters'> },
  styles: Record<string, CSSInterpolation>,
): CSSInterpolation {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
}

// Each family supplies its own public state class. Keep selected hover after
// selected highlight so their precedence stays the same as the classic item.
export function getMenuItemHighlightStyles(
  theme: Theme,
  highlightedClass: string,
): CSSInterpolation {
  return {
    ...(!theme.focusVisible && {
      [`&.${menuItemClasses.selected}.${highlightedClass}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
        ),
      },
    }),
    [`&.${menuItemClasses.selected}:hover`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${
          (theme.vars || theme).palette.action.hoverOpacity
        }`,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
    },
    ...(!theme.focusVisible && {
      [`&.${highlightedClass}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
  };
}
