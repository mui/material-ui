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
  open?: string | undefined;
}

export function getMenu2ItemStyles(
  theme: Theme,
  classes: SharedMenu2ItemClasses,
): CSSInterpolation {
  const selectedFocusBackgroundColor = theme.alpha(
    (theme.vars || theme).palette.primary.main,
    `${(theme.vars || theme).palette.action.selectedOpacity} + ${
      (theme.vars || theme).palette.action.focusOpacity
    }`,
  );

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
      // Base UI highlights on hover with this class, and a `:focus-visible`
      // ring never matches a hover, so the item keeps painting a background.
      themeFocusRing: false,
    }),
    ...(classes.open && {
      [`&.${classes.open}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
      [`&.${classes.selected}.${classes.open}`]: {
        backgroundColor: selectedFocusBackgroundColor,
      },
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

export const menu2PopupListStyles = memoTheme(({ theme }) => ({
  ...(menuListStyles as CSSObject),
  // A submenu trigger is whatever element the caller passes, so its open state
  // is styled from the list that contains it, not from a component we render.
  // The highlighted state matches a plain item, and an open trigger keeps it.
  // `:hover` is here too: Base UI highlights a submenu trigger only once its
  // submenu opens, so during the open delay the trigger would otherwise show
  // the weaker hover tint while its neighbours show the full highlight.
  [`& .${menu2SubmenuTriggerClasses.root}:hover, & .${menu2SubmenuTriggerClasses.highlighted}, & .${menu2SubmenuTriggerClasses.open}`]:
    {
      backgroundColor: (theme.vars || theme).palette.action.focus,
    },
  [`& .${menu2SubmenuTriggerClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
  },
  [`& .${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.highlighted}, & .${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.open}`]:
    {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${
          (theme.vars || theme).palette.action.focusOpacity
        }`,
      ),
    },
}));

/**
 * Default open/close animation for the menu surface, matching the classic
 * `Grow` transition the legacy Menu uses (same scale ramp, same theme
 * durations, and the transform running at two thirds of the opacity duration).
 *
 * It has to live on the popup element: Base UI waits for animations on the
 * popup itself before unmounting, so a transition on any descendant would be
 * cut off on exit. `--transform-origin` is set by the positioner, so the menu
 * grows out of the edge it is anchored to.
 */
export const menu2PopupTransitionStyles = memoTheme(({ theme }) => ({
  transformOrigin: 'var(--transform-origin)',
  transition: [
    theme.transitions.create('opacity', {
      duration: theme.transitions.duration.enteringScreen,
    }),
    theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen * 0.666,
    }),
  ].join(','),
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.75, 0.5625)',
  },
  '&[data-ending-style]': {
    transition: [
      theme.transitions.create('opacity', {
        duration: theme.transitions.duration.leavingScreen,
      }),
      theme.transitions.create('transform', {
        duration: theme.transitions.duration.leavingScreen * 0.666,
      }),
    ].join(','),
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&, &[data-ending-style]': {
      transition: 'none',
    },
  },
}));

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
