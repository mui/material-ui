import { CSSInterpolation, CSSObject } from '@mui/system';
import memoTheme from '../utils/memoTheme';
import { Theme } from '../styles';
import { menuListStyles, menuPaperStyles } from '../Menu/menuStyles';
import { getMenuItemRootStyles } from '../MenuItem/menuItemStyles';
import { menu2SubmenuTriggerClasses } from './menu2Classes';

export interface SharedMenu2ItemClasses {
  highlighted: string;
  disabled: string;
  dense: string;
  divider: string;
  gutters: string;
  selected: string;
}

export function getMenu2ItemStyles(
  theme: Theme,
  classes: SharedMenu2ItemClasses,
): CSSInterpolation {
  return {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    border: 0,
    margin: 0,
    borderRadius: 0,
    color: 'inherit',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    outline: 0,
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    ...getMenuItemRootStyles(theme, classes, {
      focusVisibleClass: classes.highlighted,
      disabledPointerEvents: true,
    }),
  };
}

export const menu2PopupPaperStyles: CSSInterpolation = {
  // The classic module types its exports as CSSInterpolation via JSDoc; the
  // value is a plain style object, narrowed here so it can be spread.
  ...(menuPaperStyles as CSSObject),
  // In the classic Menu the Paper sits in a full-viewport Modal, so its
  // `maxHeight: calc(100% - 96px)` means "viewport minus 96px". Inside the
  // content-sized Base UI popup that percentage resolves against the popup
  // itself (browser-dependent), clipping the end of the menu. Use the
  // collision-aware space provided by the positioner instead.
  maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
  overflowY: 'auto',
};

export const menu2PopupListStyles = menuListStyles;

// The classic Modal root carries `zIndex.modal`. Base UI sets no z-index, so
// the positioner, the positioned element, carries it here.
export const menu2PopupPositionerStyles = memoTheme(({ theme }) => ({
  zIndex: (theme.vars || theme).zIndex.modal,
}));

export function menu2SubmenuTriggerStyles(theme: Theme) {
  // The highlight outranks the open tint. The open selector excludes both states
  // that paint the highlight, so the rules never match the same element and the
  // insertion order cannot decide the winner. Under `theme.focusVisible` the
  // highlight paints no background, so the tint stays.
  const notHighlighted = theme.focusVisible
    ? ''
    : `:not(.${menu2SubmenuTriggerClasses.highlighted}):not(:hover)`;

  return {
    // The trigger owns its state styling, independently of its parent list.
    // An open trigger keeps a tint, because open is a state and not a focus cue.
    // `action.hover` is the lightest of the three, so an open parent stays visible
    // without competing with the item the reader is on.
    [`&.${menu2SubmenuTriggerClasses.open}${notHighlighted}, &.${menu2SubmenuTriggerClasses.closing}${notHighlighted}`]:
      {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    // The theme ring replaces the highlight, the way it does for a plain item.
    // `:hover` is here too: Base UI highlights a submenu trigger only once its
    // submenu opens, so during the open delay the trigger would otherwise show
    // the weaker hover tint while its neighbours show the full highlight.
    ...(!theme.focusVisible && {
      [`&.${menu2SubmenuTriggerClasses.root}:hover, &.${menu2SubmenuTriggerClasses.highlighted}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
    // A selected trigger that is open blends its own tint with the open tint.
    [`&.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.open}${notHighlighted}, &.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.closing}${notHighlighted}`]:
      {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.hoverOpacity
          }`,
        ),
      },
    ...(!theme.focusVisible && {
      [`&.${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.highlighted}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.focusOpacity
          }`,
        ),
      },
    }),
  };
}

/**
 * Grow animates the popup itself, where Base UI observes animation completion.
 * The positioner supplies the origin so the surface grows from its anchor.
 */
export const menu2PopupTransitionStyles = { transformOrigin: 'var(--transform-origin)' };

// The indicators render the same icons as Checkbox and Radio, so they take the
// same colors: `text.secondary` until checked, then `primary.main`.
export const menu2IndicatorStyles = memoTheme(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 36,
  color: (theme.vars || theme).palette.text.secondary,
  '&[data-checked]': {
    color: (theme.vars || theme).palette.primary.main,
  },
}));
