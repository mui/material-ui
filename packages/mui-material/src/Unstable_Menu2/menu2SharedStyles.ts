import { CSSInterpolation, CSSObject } from '@mui/system';
import memoTheme from '../utils/memoTheme';
import { Theme } from '../styles';
import { menuListStyles, menuPaperStyles } from '../Menu/menuStyles';
import { getMenuItemRootStyles } from '../MenuItem/menuItemStyles';

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

export const menu2PopupListStyles: CSSInterpolation = menuListStyles;

export const menu2IndicatorStyles = memoTheme(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 36,
  color: (theme.vars || theme).palette.action.active,
  '& [data-mui-menu2-indicator-icon]': {
    display: 'inline-block',
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem',
    fill: 'currentColor',
  },
  '& [data-mui-menu2-checkbox-checkmark]': {
    fill: (theme.vars || theme).palette.background.paper,
  },
  '&[data-unchecked] [data-mui-menu2-indicator-mark]': {
    visibility: 'hidden',
  },
}));
