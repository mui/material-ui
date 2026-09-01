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

export const menu2PopupListStyles = memoTheme(({ theme }) => {
  // The highlight outranks the open tint. The open selector excludes both states
  // that paint the highlight, so the rules never match the same element and the
  // insertion order cannot decide the winner. Under `theme.focusVisible` the
  // highlight paints no background, so the tint stays.
  const notHighlighted = theme.focusVisible
    ? ''
    : `:not(.${menu2SubmenuTriggerClasses.highlighted}):not(:hover)`;

  return {
    ...(menuListStyles as CSSObject),
    // A submenu trigger is whatever element the caller passes, so its open state
    // is styled from the list that contains it, not from a component we render.
    // An open trigger keeps a tint, because open is a state and not a focus cue.
    // `action.hover` is the lightest of the three, so an open parent stays visible
    // without competing with the item the reader is on.
    [`& .${menu2SubmenuTriggerClasses.open}${notHighlighted}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    // The theme ring replaces the highlight, the way it does for a plain item.
    // `:hover` is here too: Base UI highlights a submenu trigger only once its
    // submenu opens, so during the open delay the trigger would otherwise show
    // the weaker hover tint while its neighbours show the full highlight.
    ...(!theme.focusVisible && {
      [`& .${menu2SubmenuTriggerClasses.root}:hover, & .${menu2SubmenuTriggerClasses.highlighted}`]:
        {
          backgroundColor: (theme.vars || theme).palette.action.focus,
        },
    }),
    [`& .${menu2SubmenuTriggerClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    // A selected trigger that is open blends its own tint with the open tint.
    [`& .${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.open}${notHighlighted}`]:
      {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.hoverOpacity
          }`,
        ),
      },
    ...(!theme.focusVisible && {
      [`& .${menu2SubmenuTriggerClasses.selected}.${menu2SubmenuTriggerClasses.highlighted}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.focusOpacity
          }`,
        ),
      },
    }),
  };
});

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
